# Code Wiki · my-blog（DevPortal）

> 本文档库是 `my-blog` 仓库的结构化代码百科：覆盖整体架构、模块职责、关键类与函数、依赖关系与运行方式。
> 生成时间：2026-10-17（如代码变更请同步更新对应章节）。

## 项目一句话

**双引擎个人技术门户**：以 VitePress 为前端渲染引擎、以独立 Node.js (Express) 服务为后端 API，通过「多仓库内容拼装」把 7 个独立内容仓库聚合为一个站点，经 GitHub Actions 自动构建并部署到阿里云服务器（Nginx + PM2）。

## 技术栈速览

| 层次 | 技术 |
|---|---|
| 站点引擎 | VitePress 1.6（Vue 3、Vite 5）、vitepress-sidebar |
| 自定义主题 | 15 个 Vue 组件 + 全局样式体系（`docs/.vitepress/theme/`） |
| 后端 API | Node.js + Express 4、nodemailer、multer、express-rate-limit |
| 构建/部署 | GitHub Actions（多仓库 checkout 拼装 → 构建 → SCP/SSH 部署） |
| 运行环境 | 阿里云 ECS（Nginx 静态托管 + 反代，PM2 守护 Node 进程），域名 `gyx-a.cn` |
| 内容 | Markdown（VitePress 渲染），多仓库以软链接/CI checkout 挂载 |

## Code Wiki 索引

| 文档 | 内容 | 适合谁看 |
|---|---|---|
| [01-architecture.md](./01-architecture.md) | 整体架构：双引擎设计、三层结构、构建期/运行时数据流 | 想快速建立全局认知 |
| [02-frontend.md](./02-frontend.md) | 前端模块：`config.mjs` 装配逻辑、主题入口、15 个组件职责与关键函数 | 改 UI / 改侧边栏 / 改首页 |
| [03-backend.md](./03-backend.md) | 后端模块：`server.js` 中间件栈、API 端点、关键处理逻辑与环境变量 | 改留言/邮件接口 |
| [04-content-modules.md](./04-content-modules.md) | 内容体系：目录职责、多仓库软链映射、页面模式与 frontmatter 契约 | 写文章 / 加专栏 / 加项目 |
| [05-dependencies.md](./05-dependencies.md) | 依赖关系：两套 npm 工程、模块间依赖图、外部服务依赖 | 升级依赖 / 排查构建 |
| [06-run-and-deploy.md](./06-run-and-deploy.md) | 运行方式：本地开发、构建、后端联调、CI/CD 流水线、线上拓扑 | 新人上手 / 上线发版 |

## 仓库文件树（关键文件）

```
my-blog/
├── .github/
│   └── workflows/deploy.yml        # CI/CD：多仓库拼装 → 构建 → 部署阿里云（六阶段）
├── docs/                           # VitePress 源目录（前端引擎核心）
│   ├── .vitepress/
│   │   ├── config.mjs              # 站点配置 + 侧边栏跨目录拼装引擎
│   │   ├── theme/
│   │   │   ├── index.js            # 主题入口：Layout 插槽注入 + 全局组件注册
│   │   │   ├── style.css           # 全局样式体系（CSS 变量 / 首页 / 文档页 / 侧边栏）
│   │   │   └── components/         # 15 个自定义 Vue 组件（详见 02 章）
│   │   ├── cache/                  # （gitignore）Vite 开发缓存
│   │   └── dist/                   # （gitignore）构建产物
│   ├── hub/                        # 4 个「知识中枢」落地页（ai-agent / cloud-devops / workflow / algorithm）
│   ├── projects/                   # 8 个项目作品详情页 + *.assets/ 配图
│   ├── public/                     # 静态资源（简历 PDF、照片、背景图）
│   ├── index.md                    # 首页（layout:false，SPA 式六屏）
│   ├── about.md                    # 关于我
│   └── <软链接 ×7>                 # 外部内容仓库挂载点（见 04 章映射表）
├── server/                         # 独立 Node.js 后端（留言邮件 API）
│   ├── server.js                   # Express 单文件服务
│   ├── package.json                # 后端依赖与启动脚本
│   ├── nginx.conf                  # （gitignore）Nginx 参考配置
│   └── .env                        # （gitignore）SMTP 凭据，绝不入库
├── package.json                    # 前端构建工程（docs:dev / docs:build / docs:preview）
└── codewiki/                       # 本 Code Wiki
```

注：`docs/ai-journey`、`docs/tech-note`、`docs/leetcode`、`docs/env-setup`、`docs/reading`、`docs/build-journal`、`docs/my-resume` 为指向本地其它 Git 仓库的软链接（Windows Junction / Git symlink），本地开发需自行创建；CI 中由 `deploy.yml` checkout 对应仓库替代。

## 新人 5 分钟上手

1. 读 [01-architecture.md](./01-architecture.md) 建立全局架构认知；
2. 按 [06-run-and-deploy.md](./06-run-and-deploy.md) 把站点在本地跑起来（`npm run docs:dev`）；
3. 根据要改的东西对号入座：页面/组件 → 02 章；文章/专栏 → 04 章；留言接口 → 03 章。
