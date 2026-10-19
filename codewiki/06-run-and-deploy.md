# 06 · 运行方式与部署

## 6.1 前置条件

| 项 | 要求 |
|---|---|
| Node.js | ≥ 18 |
| 本地内容仓库 | 克隆到与 `docs/` 软链一致的路径（当前环境为 `E:\Web_git\` 下同名目录） |
| 后端凭据 | `server/.env`（含 SMTP 授权码），仅本地/服务器手工配置 |

## 6.2 本地开发

### ① 补齐软链接（新机器必做）

当前环境的目标路径与软链名一致（`E:\Web_git\<仓库名>`）。Windows 下用管理员权限创建 Junction：

```powershell
# 在 docs/ 目录下执行（目录名必须与 config.mjs 的扫描路径一致）
New-Item -ItemType Junction -Path docs\tech-note  -Target E:\Web_git\tech-note
New-Item -ItemType Junction -Path docs\ai-journey -Target E:\Web_git\AI-Application-Learning-Journey
New-Item -ItemType Junction -Path docs\leetcode   -Target E:\Web_git\leetcode-solutions
New-Item -ItemType Junction -Path docs\env-setup  -Target E:\Web_git\env-setup
New-Item -ItemType Junction -Path docs\reading    -Target E:\Web_git\Reading-and-Comprehension
New-Item -ItemType Junction -Path docs\my-resume      -Target E:\Web_git\Individual-Resume\my-resume
New-Item -ItemType Junction -Path docs\build-journal  -Target E:\Web_git\Individual-Resume\build-journal
```

验证：`docs\tech-note\Published` 等目录可浏览；启动 dev 后侧边栏各分组有文章计数而非 `SOON`。

### ② 启动前端

```powershell
npm install
npm run docs:dev        # http://localhost:5173
npm run docs:build      # 产物：docs/.vitepress/dist
npm run docs:preview    # 预览构建产物
```

### ③ 启动后端（可选，联调留言功能）

```powershell
cd server
npm install
npm start               # 或 npm run dev（nodemon）
```

`server/.env` 需要：`PORT`（可省，默认 3000）、`SMTP_USER`、`SMTP_PASS`、`TO_EMAIL`。

> **本地联调注意**：`vitepress dev` 不代理 `/api/*`，而 `ContactFooter` 用相对路径 `fetch('/api/contact')`，本地会打到 dev server 上 404。联调办法：用 Nginx/whistle 之类把 `/api` 反代到 `127.0.0.1:3000`，或临时把组件里的请求地址改为 `http://localhost:3000/api/...`（注意 CORS 白名单已含 `http://localhost:5173`）。

## 6.3 生产部署拓扑

```
浏览器 ──► Nginx :80（server_name 118.31.40.119 / gyx-a.cn）
             ├─ /        → root /www/my-blog（VitePress 静态产物，try_files 兜底 index.html）
             └─ /api/    → proxy_pass http://127.0.0.1:3000/api/（Express，PM2: my-blog-api）
```

服务器目录：

| 路径 | 内容 | 来源 |
|---|---|---|
| `/www/my-blog` | 前端构建产物 | CI `docs/.vitepress/dist/*` SCP 上传 |
| `/www/my-blog-api` | 后端源码 + `node_modules` + `.env` | CI `server/*` 上传 + SSH `npm install`；`.env` 手工维护 |

Nginx 要点（参考 `server/nginx.conf`，该文件 gitignore，以服务器实配为准）：

- `client_max_body_size 50m`——放开附件上传限制（与 multer 50MB 字段限制对齐）；
- `include /etc/nginx/mime.types`——修复 JS 被以 `text/html` 下发的 MIME 问题；
- `/api/` 反代带 `Upgrade/Connection` 头（预留 WebSocket）；
- 部署脚本会 `chown -R www-data` 防 403。

## 6.4 CI/CD 流水线（`.github/workflows/deploy.yml`）

**触发**：push 到 `main`/`master` 且变更命中 `docs/**`、`server/**`、`package*.json`、流水线文件；或网页手动 `workflow_dispatch`。

**六阶段**（详见 [01 章](./01-architecture.md)）：

1. checkout 主引擎仓库；
2. checkout 5 个内容仓库 → `docs/tech-note`、`docs/ai-journey`、`docs/leetcode`、`docs/env-setup`、`docs/reading`；
3. checkout 简历仓库 → 拼装 `docs/public/resume/`（原生 HTML 简历）、`docs/my-resume/`（对齐导航 `/my-resume/resume-zh`）与 `docs/resume-project/`（兼容旧 URL）、`docs/build-journal/`，删临时目录；
4. Node 18 + `npm install`；
5. `npm run docs:build`；
6. SSH 清空 `/www/my-blog` → SCP 前端产物 → SCP `server/*` 到 `/www/my-blog-api` → `npm install` + `chown www-data` → PM2 `restart`/`start server.js --name my-blog-api` → `pm2 save`。

**所需 Secrets**：`SERVER_IP`、`SERVER_USERNAME`、`SERVER_KEY`（SSH 私钥）、`SERVER_PASSPHRASE`。

**发版流程**：改内容/代码 → push 到 main → Actions 自动跑完即上线；后端 `.env` 不随 CI 走，改凭据需登录服务器手动更新后 `pm2 restart my-blog-api`。

## 6.5 日常运维速查

| 操作 | 命令/位置 |
|---|---|
| 查看后端状态 | 服务器 `pm2 status` / 浏览器 `GET /api/health` |
| 查看后端日志 | `pm2 logs my-blog-api`（静默发信失败只在这里） |
| 手动重发流水线 | GitHub 仓库 → Actions → `Cloud Assembly & Deploy to Aliyun` → Run workflow |
| 新增文章 | 在对应内容仓库加 md 并 push（侧边栏自动出现）；注意 frontmatter `title` |
| 新增项目作品 | `docs/projects/xxx.md` + `xxx.assets/` 配图 + `theme/projects.mjs` 追加一条（slug 同名） |
| 新增知识模块 | `config.mjs` 加 `xxxSidebar` 与路由映射 + `KnowledgeSwitcher.vue` 加胶囊 + `deploy.yml` 加 checkout |

## 6.6 常见问题排查

| 现象 | 原因 | 解法 |
|---|---|---|
| 侧边栏各分组显示 `SOON` / 空 | 软链未创建或断链 | 按 6.2 ① 重建 Junction |
| 构建产物缺整个专栏 | CI 中某内容仓库 checkout 失败/仓库名错 | 核对 `deploy.yml` 阶段二的 `repository` 与 `path` |
| 侧边栏点击 404 | 链接前缀被吞 | 检查 `fixSidebarLinks` 是否覆盖新增扫描路径 |
| 页面样式/资源 404、MIME 报错 | Nginx 未 `include mime.types` 或产物未清旧 | 按 6.3 检查 Nginx；流水线已含清旧逻辑 |
| 上传附件 413 | 超出 Nginx `client_max_body_size` 或 multer 10MB/3 个限制 | 压缩文件；调大 Nginx 限制需同步服务器实配 |
| 留言"成功"但没收到邮件 | SMTP 授权码失效/发信被拒（静默失败） | `pm2 logs my-blog-api` 查报错，更新 `server/.env` 后重启 |
| 跨域被拦截 | 请求 Origin 不在白名单 | 更新 `server.js#L11-L22` 的 `allowedOrigins` 并重新部署后端 |
