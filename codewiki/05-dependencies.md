# 05 · 依赖关系

本仓库包含**两套独立的 npm 工程**，互不共享 `node_modules`，分别安装、分别部署。

## 5.1 前端工程（根 `package.json`）

| 类型 | 包 | 版本 | 职责 | 是否核心 |
|---|---|---|---|---|
| devDependencies | `vitepress` | ^1.6.4 | 站点引擎（含 Vue 3、Vite 5、shiki 等传递依赖） | ✅ |
| devDependencies | `vitepress-sidebar` | ^1.36.1 | 自动扫描 md 目录生成侧边栏树（被 `config.mjs` 深度定制） | ✅ |
| dependencies | `vue` | ^3.5.35 | 组件运行时（通常由 vitepress 自带，此处显式声明） | ✅（组件开发） |
| dependencies | `vite` / `esbuild` / `rollup` / `shiki` / `minisearch` / `mark.js` 等 | — | 实为 vitepress 的**传递依赖被提升后误入 dependencies** | ⚠️ 间接 |
| dependencies | `algoliasearch` / `search-insights` | — | Algolia 搜索 SDK——当前 `search.provider: 'local'`，**未使用** | ❌ 疑似遗留 |
| dependencies | `qsu` / `superjson` / `birpc` 等 | — | 工具库传递依赖，代码中未直接 import | ⚠️ 间接 |

> 维护提示：`dependencies` 段混入了大量传递依赖（`balanced-match`、`ccount`、`zwitch`…），清理时保留 `devDependencies` 两项 + `vue` 即可正常构建；`npm install` 会按 lock 文件还原，不影响运行。

**npm scripts**：

| 命令 | 作用 |
|---|---|
| `npm run docs:dev` | 本地开发服务器（VitePress dev，默认 5173） |
| `npm run docs:build` | 生产构建 → `docs/.vitepress/dist/` |
| `npm run docs:preview` | 本地预览构建产物 |

## 5.2 后端工程（`server/package.json`，name: `my-blog-api`）

| 包 | 版本 | 职责 |
|---|---|---|
| `express` | ^4.18.2 | HTTP 服务框架 |
| `cors` | ^2.8.5 | 跨域白名单中间件 |
| `express-rate-limit` | ^8.5.2 | `/api/contact` 发信限流 |
| `multer` | ^2.2.0 | multipart 附件解析（内存存储） |
| `nodemailer` | ^6.9.7 | SMTP 邮件投递 |
| `dotenv` | ^16.3.1 | 加载 `server/.env` |

**npm scripts**：`npm start`（生产，node）/ `npm run dev`（nodemon 热重载，需自备 nodemon）。

## 5.3 模块间依赖图

```
docs/index.md ──使用──► DynamicNavbar / HeroScreen / StatsBento / StickyTimeline
                        ProjectShowcase / HubGateway / ContactFooter（全局注册于 theme/index.js）

docs/hub/*.md ──使用──► HubLanding（frontmatter 数据契约）
docs/projects/*.md ─局部导入─► ProjectHero
各内容仓库 index.md ──使用──► CategoryList ──读取──► config.mjs 的 theme.sidebar 字典

theme/index.js ──extends──► vitepress/theme（官方默认主题）
                ──注入插槽─► ReadingProgress / KnowledgeSwitcher / DocMeta
                ──加载───► style.css

config.mjs ──调用──► vitepress-sidebar（generateSidebar）
           ──输出──► themeConfig.sidebar（供 CategoryList / HubLanding 反查）

ContactFooter.vue ──fetch──► POST /api/contact ──┐
                    ──fetch──► GET /api/health  ──┴─► server/server.js ──► SMTP 163
```

## 5.4 外部服务与基础设施依赖

| 依赖 | 用途 | 断了会怎样 |
|---|---|---|
| GitHub + Actions | CI/CD 构建部署；多仓库 checkout 拼装 | 无法自动发版 |
| GitHub Secrets（`SERVER_IP`/`SERVER_USERNAME`/`SERVER_KEY`/`SERVER_PASSPHRASE`） | SSH/SCP 部署凭据 | 流水线部署阶段失败 |
| 阿里云 ECS | 线上运行环境（Nginx + PM2） | 站点不可达 |
| SMTP（`smtp.163.com:465`） | 留言邮件投递 | 留言接口仍返回成功但收不到邮件（静默失败，仅服务器日志可见） |
| 域名 `gyx-a.cn` / IP `118.31.40.119` | 访问入口；CORS 白名单成员 | 换域名必须同步改 `server.js#L11-L22` 白名单 |

## 5.5 版本与运行环境要求

| 项 | 要求 |
|---|---|
| Node.js | 18（CI 固定 `node-version: '18'`） |
| 包管理 | npm（两套工程各自 `npm install`，均有 lock 文件） |
| 操作系统注意 | 软链接在 Windows 用 Junction、在类 Unix 用 symlink；`followSymlinks`/`preserveSymlinks` 配置与之配套，改动需两端验证 |
