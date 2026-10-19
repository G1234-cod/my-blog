# 01 · 整体架构

## 1.1 设计理念：内容与代码物理隔离的「双引擎」

本项目是一个 Jamstack 风格的个人技术门户（站点名 DevPortal），核心设计是**把内容和渲染引擎彻底解耦**：

- **数据引擎（内容层）**：7 个独立 Git 仓库存放 Markdown 知识内容（学习笔记、题解、简历、建站日志等），各自独立演进；
- **渲染引擎（前端层）**：本仓库只负责 VitePress 配置 + 自定义主题 + 项目作品页，把各内容仓库「拼装」成统一站点；
- **服务引擎（后端层）**：独立的 Node.js 进程提供留言邮件等 API，与静态站分离部署。

这样单体博客常见的「内容与代码耦合」问题被消除：写文章只碰内容仓库，改样式只碰本仓库，互不干扰（详见 `docs/build-journal` 系列日志中的架构复盘）。

## 1.2 三层结构总览

```
┌────────────────────────── 内容层（多仓库拼装） ──────────────────────────┐
│  tech-note ─ ai-journey ─ leetcode ─ env-setup ─ reading ─ 个人简历仓库  │
│  （软链接挂载到 docs/ 下；CI 中由 actions/checkout 替代）                  │
└──────────────────────────────┬───────────────────────────────────────────┘
                               │  Markdown + frontmatter
┌──────────────────────────────▼───────────────────────────────────────────┐
│                    引擎层（本仓库 · VitePress + 自定义主题）                │
│  config.mjs     ：侧边栏跨目录拼装引擎、导航、搜索、URL 规则               │
│  theme/index.js ：Layout 插槽注入（进度条/切换器/元信息）+ 全局组件注册     │
│  theme/components：首页六屏、hub 落地页、项目 Hero、目录卡片等 15 个组件    │
│  hub/ projects/ ：知识中枢落地页、项目作品详情页                            │
└──────────────────────────────┬───────────────────────────────────────────┘
                               │  npm run docs:build → docs/.vitepress/dist
┌──────────────────────────────▼───────────────────────────────────────────┐
│                      运行时层（阿里云 ECS · Nginx）                        │
│  Nginx :80 ──► /       静态站点（/www/my-blog）                            │
│           └─► /api/ ──► 127.0.0.1:3000（Express，PM2 进程 my-blog-api）    │
│                          └─► SMTP 163 邮箱（留言投递）                     │
└──────────────────────────────────────────────────────────────────────────┘
```

## 1.3 构建期数据流（deploy.yml 六阶段）

推送 `main/master` 且命中 `docs/**`、`server/**`、`package*.json` 或流水线文件时自动触发（亦可手动 `workflow_dispatch`）：

| 阶段 | 动作 | 说明 |
|---|---|---|
| 一 | checkout 本仓库 | 引擎层代码就位 |
| 二 | checkout 5 个内容仓库到 `docs/tech-note`、`docs/ai-journey`、`docs/leetcode`、`docs/env-setup`、`docs/reading` | 替换本地软链接 |
| 三 | checkout 简历仓库到临时目录并拼装 | 简历原生 HTML → `docs/public/resume/`；`my-resume` md → `docs/resume-project/`；建站日志 → `docs/build-journal/` |
| 四 | Node 18 + `npm install` | 缓存 npm |
| 五 | `npm run docs:build` | 产出 `docs/.vitepress/dist` |
| 六 | SSH 清空 `/www/my-blog` → SCP 前端产物 → SCP `server/*` 到 `/www/my-blog-api` → `npm install` + `chown` + PM2 重启 `my-blog-api` | 前后端一起发版 |

关键细节：

- 旧产物先 `rm -rf` 再上传，避免哈希文件残留（幽灵文件）；
- 权限统一 `chown www-data`，防御 Nginx 403；
- PM2 智能启动/重启后 `pm2 save`，保证服务器重启后服务存活。

## 1.4 运行时请求流

| 请求 | 路径 | 处理方 |
|---|---|---|
| 页面/静态资源 | `/`、`/hub/*`、`/projects/*`、`/assets/*` | Nginx 直接返回静态文件；SPA 兜底 `try_files ... /index.html` |
| 留言提交 | `POST /api/contact`（multipart，含附件） | Nginx 反代 → Express `:3000` → 后台静默投递 SMTP |
| 服务器探针 | `GET /api/health` | Express 返回节点版本/内存/运行时长，供首页联系区终端小组件展示 |

## 1.5 关键设计决策与取舍

| 决策 | 做法 | 理由 |
|---|---|---|
| 多仓库拼装 | 本地用软链接（Junction），CI 用 `actions/checkout` 到同一路径 | 内容仓库独立版本管理，引擎仓库保持轻量 |
| 侧边栏生成 | `vitepress-sidebar` 自动生成 + `config.mjs` 手写四模块中枢入口的**混合驱动** | 长尾文章免维护，核心路线人工编排 |
| 首页形态 | `layout:false` + 自定义六屏组件（全屏滚动捕捉） | 完全脱离文档默认布局，做 SPA 式体验 |
| 留言发信 | 接口先立即返回、邮件后台静默发送（`server.js:100` 起不 await） | 毫秒级响应，SMTP 慢/失败不拖垮前端体验 |
| 部署路径 | 前端 `/www/my-blog`、后端 `/www/my-blog-api` 分目录，PM2 守护 | 前后端独立发版、独立进程管理 |
| 敏感文件 | `server/.env`、`server/nginx.conf` 均 gitignore | 凭据不入库，配置随部署环境落地 |

## 1.6 已知注意点

- **软链接即环境契约**：新机器克隆本仓库后 `docs/` 下内容仓库目录为空（部分软链入库、部分被 gitignore），必须按 [06 章](./06-run-and-deploy.md) 步骤补齐，否则构建产物缺内容、侧边栏为空。
- **入库软链是绝对路径**：`docs/build-journal`、`docs/my-resume` 以 symlink 形式入库且指向 `E:/Web_git/Individual-Resume/...`（本机绝对路径），换机器/CI 上是断链，CI 靠阶段三覆盖解决。曾因 `docs/my-resume` 未被覆盖导致导航「05 RESUME」（`/my-resume/resume-zh`）线上 404、简历实际只在 `/resume-project/resume-zh`（2026-10-17 实测确认）；**已修复**：`deploy.yml` 阶段三改为把简历 md 同时产出到 `docs/my-resume/`（对齐导航与本地软链）与 `docs/resume-project/`（兼容旧链接），下次发版生效。
- **`server/nginx.conf` 与线上实配已漂移**：仓库内参考文件写 `root /var/www/html` 且带 `try_files ... /index.html` SPA 兜底，但线上未知路径直接返回 nginx 404（无兜底），且部署目录为 `/www/my-blog`。该文件被 gitignore 仅作留档，排查 Nginx 问题时以服务器实配为准。
- **本地 dev 无后端反代**：`vitepress dev` 不代理 `/api/*`，前端相对路径请求会 404，本地联调留言功能需自行代理或直连 `:3000`（见 [06 章](./06-run-and-deploy.md)）。
