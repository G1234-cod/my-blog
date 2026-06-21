# 全栈架构白皮书与 SOP 规范 (Maximized Edition)

## 一、 核心定位与业务目标

本系统彻底抛弃了“单体静态博客”的落后思路，构建了一个“数据与渲染绝对解耦”的现代化数字孪生体与全栈工程中台。

- **对内（结构化知识图谱）：** 承载你作为软件工程专业前 5% 拔尖学生的硬核探索。从 AI 大模型 API 调用、借助 AnythingLLM 和 Ollama 部署 RAG 本地知识库，到 Java (Servlet/JSP) / Python / C++ 全栈开发与 Nginx 服务器自动部署。将“知其然更知其所以然”的学习哲学，固化为严密的“初始认知-问题解决-个人反思”技能文档库。
- **对外（极客级动态名片）：** 突破传统 PDF 简历的枯燥限制。将你的中级软件设计师认证、国家级软件著作权（在线考试系统、双因子安全社区交互系统）、各类国家级/省级竞赛奖项（ICAN 创新创业大赛二等奖、蓝桥杯/计算机设计大赛铜奖）以及编程猫 100+ 小时教研实习经历，通过现代前端交互组件化渲染，打造最具视觉冲击力的技术敲门砖。

## 二、 核心架构设计 (微服务解耦模式)

系统采用“一主多从”的双引擎架构，打通本地开发、多库协作与云端发布的物理壁垒。

### 2.1 主引擎处理厂 (`my-blog` Central Hub)

- **本质定位**：唯一枢纽，只负责拉取、拼装和 UI 渲染，自身不生产任何实质业务数据。
- **深度技术栈**：
  - **底层驱动 (Vite + Node.js)**：提供极速冷启动与 HMR。通过自定义 Vite 配置 `server.fs.allow: ['E:/Web_git']` 越权打通本地外部物理目录实现跨库沙盒预览；通过 `rollupOptions.external` 抽离 Vue 服务端渲染依赖，优化打包体积。
  - **视图层与 SSG (Vue 3 + VitePress 1.6.4)**：拦截 Markdown AST（抽象语法树）并转化为 Vue 渲染函数，预渲染生成纯静态 HTML，保障国内网络下的秒级加载与极限 SEO。
  - **工业级代码解析 (Shiki)**：在构建期读取 VS Code 语法规则生成内联高亮样式，实现真正的零客户端性能损耗。
  - **动态路由探测 (`vitepress-sidebar`** **1.36.1)**：核心自动化魔法。内存级扫描目录树，动态生成全站各大模块的侧边栏导航，实现路由层面的“配置代码零维护”。
  - **本地检索引擎 (MiniSearch)**：编译期抓取全站标题与段落生成高度压缩的反向索引库，实现浏览器纯本地的高效分词搜索。

### 2.2 数据源集群 (Data Source Repositories)

- **本质定位**：独立的微服务节点，纯粹的内容提供方。本地通过 Windows 快捷方式（软链接）无缝接入沙盒，云端通过 CI/CD 自动化拉取。
- **资产清单与挂载拓扑 (基于 Trae 物理快照)**：
  1. `Individual-Resume` -> 拆解并挂载至 `docs/resume-project/`（简历项目区）与 `docs/build-journal/`（建站日志区）。
  2. `tech-note` -> 挂载至 `docs/tech-note/`（基础技术笔记）。
  3. `AI-Application-Learning-Journey` -> 挂载至 `docs/ai-journey/`（大模型与 Agent 工程化演进）。
  4. `leetcode-solutions` -> 挂载至 `docs/leetcode/`（算法与哈希表等数据结构解析）。
  5. `env-setup` -> 挂载至 `docs/env-setup/`（服务器与自动化图床环境部署纪实）。
  6. `Reading-and-Comprehension` -> 挂载至 `docs/reading/`（大模型前沿论文与泛读思考）。
  7. `Project/垃圾分类模型训练` -> **（私有算法级资产）** 待挂载至 `docs/projects/garbage-classification/`，利用 GitHub PAT (Personal Access Token) 跨域授权强制接入。

### 2.3 后端服务层 (Backend Service Layer)

- **本质定位**：轻量级 API 网关，提供动态业务能力（邮件发送、表单处理）。
- **技术栈**：
  - **运行时引擎 (Node.js + Express)**：轻量化后端框架，低资源占用，高并发处理。
  - **邮件服务 (Nodemailer)**：对接网易163 SMTP，实现表单邮件发送。
  - **进程管理 (PM2)**：确保服务持久运行，支持开机自启与日志管理。
  - **反向代理 (Nginx)**：统一入口，负载均衡，静态资源托管。

### 2.4 CI/CD 全自动化部署流水线 (`deploy.yml`)

- **执行管线 (5 阶段防雷闭环)**：
  1. **引擎检出**：拉取 VitePress 主控配置代码。
  2. **微服务集群装配**：精准检出上述开源/私有仓库，映射至对应物理路径。
  3. **深层拼装与“除幽灵”机制**：针对简历仓库进行二次解构。**（核心防雷点）**：在执行 `cp` 映射前，通过 `rm -rf docs/xxx` 强制粉碎 Git 残留的软链接文件，配合 `if [ -d "..." ]` 目录探测机制，彻底根除 `mkdir: File exists` 引起的编译期崩溃。
  4. **全量构建**：部署 Node.js 18 环境，执行依赖安装与 `npm run docs:build`，触发全站自动化路由与 HTML 预渲染。
  5. **云端静默投递**：通过 SCP/SSH 协议跨服务器自动清理阿里云 `/www/my-blog/` 旧产物垃圾，将最新静态网站推送到公网。

## 三、 大陆本土化、网络防墙与富媒体接管策略

针对大陆用户的网络痛点及你全栈多格式文件的展示需求，制定以下底层防御规范：

### 3.1 跨国网络墙与 CDN 防御机制

- **图床去中心化与防污染**：严禁直接引用 `raw.githubusercontent.com`。短期内采用相对路径 (`./assets/image.png`) 随代码打包，由阿里云 Nginx 境内直连分发；中长期架构向阿里云 OSS/腾讯云 COS 独立图床迁移，彻底解决 Git 仓库“二进制树脂化”导致的克隆极慢问题。
- **海外字体/遥测资源阻断**：通过修改 VitePress 深层 Head 配置与自定义 CSS 覆写，全面剥离默认引入的 Google Fonts 字体库及海外探针。强制回退使用本地系统级无衬线字体（如 Microsoft YaHei, PingFang SC），确保国内终端用户无论是否开启代理，均能享受“首屏秒开”体验。

### 3.2 `public` 静态资源池的微服务化管理 (严控命名空间)

- **隔离法则**：`public` 目录作为全站的底层资产池，绝对禁止文件平铺散落。必须严格建立与源仓库映射的子目录结构，防止同名文件覆盖灾难。
- **标准拓扑结构**：

  Plaintext
  ```
  my-blog/docs/public/
  ├── global-assets/            # 全局跨模块 UI 资产 (Logo, favicon, 主题背景图)
  ├── resume/                   # 简历专属静态隔离区 (原始简历 index.html 及配套 CSS)
  ├── ai-journey-assets/        # AI 学习路线专属大文件 (高清架构拓扑 PDF)
  └── downloads/                # 面向访客的公共下载专区 (竞赛答辩 PPT, 开源工具 ZIP)
  ```

* **调用规范**：资源池在最终 URL 中隐形。Markdown 引用必须使用绝对路径，例如：`[下载答辩PPT](/downloads/2025-competition.ppt)`。

### 3.3 原生源码切片注入与文档流内嵌

- **长源码托管**：针对几百行的 Python 爬虫或 C++ 算法脚本，摒弃 Markdown 内部的低效纯文本粘贴。统一采用代码片段引入神技：`<<< @/path/to/script.py`。VitePress 将在编译期物理读取该文件，并渲染高亮，实现“一处修改，双端同步”。
- **文档级内嵌展示**：后期引入/编写 Vue 自定义组件，利用 HTML5 `<embed>` 或 `<iframe>` 标签，实现将 PDF 论文、比赛 PPT 直接镶嵌在博客网页流内部静默预览，无需用户跳出页面。

***

## 四、 云端部署架构详解

### 4.1 服务器拓扑

```
┌─────────────────────────────────────────────────────────────┐
│                    阿里云 ECS 服务器                          │
│  IP: 118.31.40.119 | 私有IP: 172.25.61.155                 │
│  域名: gyx-a.cn (待认证)                                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │     Nginx       │    │         Node.js + Express        │ │
│  │  (反向代理)      │───▶│        (邮件API服务)             │ │
│  │  80端口          │    │        3000端口                  │ │
│  └─────────────────┘    └─────────────────────────────────┘ │
│         │                          │                         │
│         ▼                          ▼                         │
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │   /www/my-blog/ │    │      /www/my-blog-api/          │ │
│  │  (静态网页)      │    │  (server.js + .env + node_modules)│ │
│  └─────────────────┘    └─────────────────────────────────┘ │
│                                    │                         │
│                                    ▼                         │
│                          ┌─────────────────┐                │
│                          │  PM2 进程管理    │                │
│                          │  (开机自启)       │                │
│                          └─────────────────┘                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  网易163 SMTP   │
                    │  (邮件发送)      │
                    └─────────────────┘
```

### 4.2 后端服务配置

**服务器目录结构**：

```
/www/
├── my-blog/                    # 前端静态文件
│   ├── index.html
│   ├── assets/
│   └── ...
└── my-blog-api/                # 后端 API 服务
    ├── server.js               # Express 服务器
    ├── package.json            # 依赖配置
    ├── .env                    # 环境变量（敏感）
    └── node_modules/           # 依赖包
```

**API 接口规范**：

| 接口   | 方法   | 路径             | 说明          |
| ---- | ---- | -------------- | ----------- |
| 邮件发送 | POST | `/api/contact` | 接收表单数据并发送邮件 |
| 健康检查 | GET  | `/api/health`  | 检查服务状态      |

**请求参数**（`/api/contact`）：

```json
{
  "name": "访客姓名",
  "email": "visitor@example.com",
  "message": "留言内容"
}
```

### 4.3 安全规范

**敏感文件保护**：

- `.env`、`nginx.conf` 必须加入 `.gitignore`
- 禁止硬编码密钥、密码等敏感信息
- 使用环境变量管理 SMTP 配置

**环境变量示例**（`.env`）：

```
SMTP_USER=your-email@163.com
SMTP_PASS=your-smtp-password
TO_EMAIL=recipient@example.com
PORT=3000
```

***

## 五、 日常运维 SOP (大管家标准作业程序)

基建封顶后，日常创作与运维被极简降维至以下三步及一套扩容法则：

### 5.1 日常内容更新 (三步走)

1. **沙盒创作（绝对原则）**：新增分类文件夹、修改 `.md` 内容、跨级拖拽重组等一切写操作，**必须且只能在对应的源仓库本地目录中进行**。`my-blog` 主引擎仓库保持绝对只读。
2. **数据入库 (Commit & Push)**：在 GitHub Desktop 中提交源仓库变更。**（警惕 Git 陷阱）**：新建的空文件夹必须放入一个 `.md` 占位文件，否则无法推送；重命名/移动文件后，必须全局搜索修复受影响的内部 `../` 相对死链。
3. **云端唤醒 (Trigger Build)**：登录 `my-blog` 的 GitHub 网页 Actions 面板，一键执行 `Run workflow` 手动点火。

### 5.2 全新私有/公开仓库接入流程 (架构扩容法则)

未来每新增一个实战项目，仅需对主引擎进行四步微调即可全网吞噬：

1. **注入拉取脚本**：在 `deploy.yml` 阶段二新增 `actions/checkout@v4`，填入新仓库地址（若是私有仓库，必须挂载 `token: ${{ secrets.ACTION_PAT }}` 跨域凭证）。
2. **配置路由探针**：在 `config.mjs` 的 `vitepress-sidebar` 数组中新增对应的 `scanStartPath` 和 URL 解析路径。
3. **暴露前端入口**：在 `config.mjs` 的 `themeConfig.nav` 数组中添加顶部导航菜单栏的链接。
4. **本地沙盒挂载**：在 `my-blog/docs/` 本地物理路径下新建该仓库的快捷方式（软链接），命名必须与 `deploy.yml` 里的 `path` 保持绝对一致，以支持 `npm run docs:dev` 的本地热重载预览。

### 5.3 后端服务运维

**服务管理命令**：

```bash
# 启动服务
pm2 start server.js --name my-blog-api

# 重启服务
pm2 restart my-blog-api

# 查看状态
pm2 status

# 查看日志
pm2 logs my-blog-api

# 设置开机自启
pm2 startup
pm2 save
```

**Nginx 配置管理**：

```bash
# 检查配置语法
nginx -t

# 重新加载配置
nginx -s reload
```

***

## 六、 知识架构重组方案

### 6.1 四大知识基盘

| 基盘                         | 内容                               | 篇数  | 未来扩展方向                         |
| -------------------------- | -------------------------------- | --- | ------------------------------ |
| 🤖 AI & Intelligent Agents | AI-Journey、Reading、LangChain/RAG | 16篇 | Agent、Prompt调优、模型微调、DeepSeek接入 |
| ⚙️ Architecture & DevOps   | Build-Journal、Docker、CI/CD、架构思考  | 6篇  | K8s、Nginx调优、微服务解耦、数据库集群        |
| ✨ Workflow & Efficiency    | Env-Setup、Tech-Note、本地开发环境       | 5篇  | Linux调优、Trae进阶、脚本自动化、前端新框架     |
| 🧠 CS Core & Algorithms    | LeetCode、算法思想                    | 4篇  | 设计模式、数据结构、计网原理、操作系统            |

### 6.2 重组实施步骤

1. **目录结构调整**：按四大基盘重新组织 `docs/` 目录结构
2. **导航配置更新**：修改 `config.mjs` 中的导航菜单
3. **侧边栏重构**：配置各基盘的文档侧边栏
4. **链接修复**：更新所有内部链接路径
5. **构建测试**：运行 `npm run docs:build` 验证

***

## 七、 项目状态与待办事项

### 7.1 已完成 ✅

- ✅ 博客网站成功部署至阿里云
- ✅ 自建邮件发送 API 服务部署完成
- ✅ Nginx 反向代理配置完成
- ✅ PM2 进程管理配置完成
- ✅ `.gitignore` 更新（保护敏感配置文件）
- ✅ 修复前端邮件表单数据格式问题
- ✅ 修复滚动导航与主题切换功能

### 7.2 进行中 ⏳

- ⏳ 垃圾分类模型训练与优化
- ⏳ AI 学习笔记持续更新
- ⏳ 知识架构重组方案实施

### 7.3 待办事项 📝

- 📝 将 `Project/垃圾分类模型训练/` 上传至 GitHub
- 📝 完善项目 README 文档
- 📝 域名认证通过后更新前端 API 地址
- 📝 网易邮箱授权码更新（因之前泄露风险）

***

## 八、 技术栈总览

| 分类    | 技术             | 版本     | 用途     |
| ----- | -------------- | ------ | ------ |
| 前端框架  | Vue 3          | 3.4.x  | 组件化开发  |
| 静态生成  | VitePress      | 1.6.4  | SSG 构建 |
| 构建工具  | Vite           | 6.5.0  | 快速构建   |
| 后端框架  | Express        | 4.18.x | API 服务 |
| 邮件服务  | Nodemailer     | 6.9.x  | 邮件发送   |
| 进程管理  | PM2            | 5.3.x  | 服务管理   |
| 反向代理  | Nginx          | 1.24.x | 服务器代理  |
| CI/CD | GitHub Actions | -      | 自动化部署  |

***

*文档版本: v2.0 | 最后更新: 2026-06-19*

<br />

## 附录：核心工程问题复盘与架构演进 SOP

在项目的云端工程化落地过程中，针对跨域、权限、Nginx 路由冲突等高频痛点，系统确立了以下标准规范与演进路线。

### 1. Nginx 路由代理与混合内容 (Mixed Content) 防御机制

- **问题复盘**：初期由于前端硬编码绝对路径 `http://118...:3000/api/contact`，在 HTTPS 环境下触发了浏览器底层的混合内容安全拦截。同时，独立分散的 `api.conf` 与 `nginx.conf` 在 80 端口上产生了 `conflicting server name` 冲突，导致 Nginx 丢弃静态资源路由（抛出 403 / 405 错误）。
- **架构规范**：
  - **彻底废弃**独立的 `api.conf`。
  - **动态相对路径**：前端请求统一改为相对路径 `/api/contact`。
  - **端口收敛**：对外完全屏蔽 3000 端口，在 `nginx.conf` 中配置双路分发。`/` 兜底指向 Vue 单页面，`/api/` 通过 `proxy_pass` 代理至 Node.js 进程。实现跨域免疫与协议自适应。

### 2. 邮件 API 的双重护甲与防拦截策略

由于 `/api/contact` 是裸露在公网的 POST 接口，极易遭到黑客脚本轰炸；同时，网易 163 邮箱具有极严的反垃圾机制（伪造发件人会触发 553 报错）。为此确立以下后端安全 SOP：

- **SMTP 防伪造绕过**：`from` 字段强制绑定鉴权本尊邮箱（如 `GYX-Dev <xxx@163.com>`），将访客填写的真实邮箱放入 `replyTo` 字段，既突破网易拦截，又保证一键回信功能。
- **CORS 严格白名单**：废弃 `app.use(cors())` 的全开模式，建立严格的 `allowedOrigins` 数组，仅允许本地环回地址与部署域名发起调用。
- **IP 速率熔断 (Rate Limit)**：引入 `express-rate-limit`，设定 15 分钟/ 3 次的访问阈值，防止恶意脚本耗尽邮件配额。

### 3. CI/CD 全栈部署管线的补全

- 传统的 GitHub Actions 往往只涵盖前端 SSG 构建。本系统在此基础上追加了 **“后端服务热更新”** 管线。
- 在 `deploy.yml` 尾部引入基于 SSH 的自动化脚本，实现在推流结束后，自动执行 `npm install` 补充依赖，并触发 `pm2 restart my-blog-api` 守护进程平滑重启，实现一次 `git push`，前后端双链路并发更新。

### 4. 未来架构演进：域名备案与 SSL 证书挂载 SOP

当 `gyx-a.cn` 域名备案成功后，必须执行以下 Nginx 模块化重构规范：

1. **证书部署**：将阿里云签发的 SSL 证书（`.pem` 和 `.key` 文件）上传至服务器的 `/etc/nginx/cert/` 目录。
2. **恢复模块化 (解开封印)**：编辑 `/etc/nginx/nginx.conf`，将底部庞大的 `server` 块剪切出，并**取消注释** `include /etc/nginx/conf.d/*.conf;`。
3. **建立专属指挥所**：在 `/etc/nginx/conf.d/` 下新建 `gyx-blog.conf`，写入包含 443 端口与证书路径的最终路由：

   Nginx
   ```
   # 强制 HTTP 跳转 HTTPS
   server {
       listen 80;
       server_name gyx-a.cn www.gyx-a.cn;
       return 301 https://$host$request_uri;
   }

   # HTTPS 全栈双引擎主路由
   server {
       listen 443 ssl;
       server_name gyx-a.cn www.gyx-a.cn;

       # 证书配置
       ssl_certificate /etc/nginx/cert/gyx-a.cn.pem;
       ssl_certificate_key /etc/nginx/cert/gyx-a.cn.key;
       ssl_protocols TLSv1.2 TLSv1.3;

       # 前端静态引擎
       root /var/www/html;
       index index.html;
       location / {
           try_files $uri $uri/ /index.html;
       }

       # 后端 API 反向代理
       location /api/ {
           proxy_pass http://127.0.0.1:3000/api/;
           proxy_http_version 1.1;
           proxy_set_header Host $host;
       }
   }

   ```
4. **后端白名单更新**：将 `https://gyx-a.cn` 与 `https://www.gyx-a.cn` 补充进 `server.js` 的 `allowedOrigins` 数组并推流，完成整个项目的企业级质变。

