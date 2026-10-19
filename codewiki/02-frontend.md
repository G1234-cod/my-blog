# 02 · 前端模块（VitePress 配置层 + 自定义主题）

前端全部代码集中在 `docs/.vitepress/`，分为三个模块：

| 模块 | 文件 | 职责 |
|---|---|---|
| 站点装配层 | `docs/.vitepress/config.mjs` | 站点元信息、导航、侧边栏跨目录拼装引擎、搜索、构建排除规则 |
| 主题入口层 | `docs/.vitepress/theme/index.js` | 继承官方主题，向 Layout 插槽注入全局增强，注册全局组件 |
| 样式与组件层 | `theme/style.css` + `theme/components/*.vue`（15 个） | 首页六屏、知识中枢落地页、项目 Hero、目录卡片、阅读体验增强等 |

---

## 2.1 config.mjs — 侧边栏拼装引擎

文件：`docs/.vitepress/config.mjs`（约 205 行）

### 关键函数

| 函数 | 位置 | 说明 |
|---|---|---|
| `fixSidebarLinks(items, scanPath)` | `config.mjs#L10-L24` | 递归修补侧边栏链接前缀。vitepress-sidebar 会吞掉 `/scanPath/` 前缀导致 404，此函数强行把 `item.link` 改写为 `/${scanPath}/...` |
| `countArticles(items)` | `config.mjs#L27-L33` | 递归统计分组内文章叶子数（含 `link` 的项），供侧边栏计数徽章 `.side-count` 使用 |
| `getSidebarModule(scanPath, title)` | `config.mjs#L36-L83` | 核心装配器：扫描目录 → `generateSidebar()` 生成树 → `fixSidebarLinks` 修前缀 → 单组拍平 → 可选注入 `<span class="side-count">N</span>` 计数徽章（空分组显示 `SOON`）|

`getSidebarModule` 内部对 vitepress-sidebar 的关键配置（均为踩坑修复）：

- `useTitleFromFrontmatter` / `useTitleFromFileHeading`：标题取自 md frontmatter/一级标题，避免显示英文文件名（`config.mjs#L44-L45`）；
- `followSymlinks: true`：`docs/` 下多为软链接目录，不开启则扫描为空（`config.mjs#L49`）；
- `removePrefixAfterOrdering` + `prefixSeparator: /^\d+[.-]\s*/`：清理 `1.` 序号前缀，正则用 `^` 锚定保护含 `.` 的正常标题（`config.mjs#L53-L54`）；
- `underscoreToSpace` / `hyphenToSpace`：文件名转友好标题；
- `excludeByGlobPattern`：排除 `README.md`、`模板.md` 等，与 `srcExclude` 对齐，避免侧边栏出现 404 入口。

### 四大模块侧边栏拼装（`config.mjs#L88-L114`）

每个模块 = 「知识中枢 hub 页」+ 3 个内容源的分组，跨目录聚合：

| 侧边栏常量 | 组成 |
|---|---|
| `aiSidebar` | `/hub/ai-agent` 中枢 + `ai-journey`（AI 落地实战）+ `tech-note/Published/01-AI-Agent`（本地部署）+ `reading/01-AI-Agent`（论文精读） |
| `cloudSidebar` | `/hub/cloud-devops` + `build-journal`（建站日志）+ `tech-note/Published/02-Cloud-DevOps` + `reading/02-Cloud-DevOps` |
| `workflowSidebar` | `/hub/workflow` + `env-setup` + `tech-note/Published/03-Workflow` + `reading/03-Workflow` |
| `algoSidebar` | `/hub/algorithm` + `leetcode` + `tech-note/Published/04-Algorithm` + `reading/04-Algorithm` |

`themeConfig.sidebar`（`config.mjs#L155-L179`）把上述四套按路由前缀分发（同一套侧边栏服务于 hub 页与三个内容目录），`/projects/` 单独走 `getSidebarModule('projects', '💼 项目作品集')`。

### 其它关键配置项

| 配置 | 位置 | 值/说明 |
|---|---|---|
| `title` / `description` / `lang` | `config.mjs#L120-L122` | DevPortal / zh-CN |
| `cleanUrls` / `ignoreDeadLinks` | `config.mjs#L123-L124` | 无 `.html` 后缀 URL；死链不阻断构建 |
| `srcExclude` | `config.mjs#L126-L130` | 排除模板/README 类 md，不进站 |
| `vite.resolve` | `config.mjs#L136-L143` | `preserveSymlinks: true`（软链目录必需）；`vue/server-renderer` 别名解决 SSR 解析 |
| `themeConfig.nav` | `config.mjs#L146-L153` | 首页 + 4 大知识模块 + 简历（`/my-resume/resume-zh`） |
| `themeConfig.search` | `config.mjs#L185-L201` | 本地搜索（`provider: 'local'`）+ 中文文案 |
| `editLink` | `config.mjs#L203` | 空 pattern，关闭「编辑此页」 |

---

## 2.2 theme/index.js — 主题入口

文件：`docs/.vitepress/theme/index.js`（55 行），`export default` 继承 `vitepress/theme`。

**Layout 插槽注入**（`index.js#L31-L40`）——用 `h(DefaultTheme.Layout, ...)` 劫持官方布局：

| 插槽 | 注入组件 | 作用 |
|---|---|---|
| `layout-top` | `ReadingProgress` | 顶部阅读进度条（组件内部自判断仅文档页显示） |
| `sidebar-nav-before` | `KnowledgeSwitcher` | 侧边栏顶部的四模块胶囊切换器 |
| `doc-before` | `DocMeta` | 文章标题下的「发布日期 · 阅读时长」 |

注意：首页是 `layout:false` 不经过此 Layout，首页导航由 `docs/index.md` 里的 `DynamicNavbar` 负责。

**全局注册**（`index.js#L42-L54`，`enhanceApp`）：`DynamicNavbar`、`HeroScreen`、`StatsBento`、`StickyTimeline`、`ProjectShowcase`、`HubGateway`、`ContactFooter`、`CategoryList`、`HubLanding`——供各 md 在正文直接使用。`ProjectHero` 未全局注册，由各项目页 `<script setup>` 局部导入。

---

## 2.3 组件清单（theme/components/，15 个）

### 按用途分组

| 分组 | 组件 | 使用位置 |
|---|---|---|
| 首页六屏（`docs/index.md#L8-L16`） | DynamicNavbar、HeroScreen、StatsBento、StickyTimeline、ProjectShowcase、HubGateway、ContactFooter | `layout:false` 首页，每屏一个 `<section class="universe-screen">` |
| 知识中枢 | HubLanding、KnowledgeSwitcher | hub 落地页正文 / 侧边栏顶部插槽 |
| 内容导航 | CategoryList | 各内容仓库 `index.md` 末尾一行 `<CategoryList />` |
| 项目作品 | ProjectHero | `docs/projects/*.md` 经 `<script setup>` 导入 |
| 阅读体验 | ReadingProgress、DocMeta | Layout 插槽注入 |
| 备用/遗留 | BentoGrid | 当前主仓库文档未见引用（静态 Bento 网格，建站日志中提及，保留备用） |

### 组件详解

#### DynamicNavbar.vue（首页自定义导航）
- **职责**：品牌入口、首页锚点导航、主题切换、移动端菜单；首页专用导航栏。
- **关键函数**：

| 函数 | 位置 | 说明 |
|---|---|---|
| `updateActiveStateByRoute()` | `DynamicNavbar.vue#L54-L66` | 按路由定位当前 section |
| `scrollToSection(sectionId)` | `DynamicNavbar.vue#L68-L84` | 锚点跳转；跨页时记录 pending scroll |
| `processPendingScroll()` | `DynamicNavbar.vue#L86-L93` | 跨页跳转落地后执行挂起的滚动 |
| `handleNavClick(sectionId)` | `DynamicNavbar.vue#L95-L108` | 导航点击入口 |
| `watch(route.path)` | `DynamicNavbar.vue#L110-L115` | 路由切换同步高亮 |
| `checkScroll()` | `DynamicNavbar.vue#L118-L140` | 滚动监听：首页监听 `.universe-container`，其它页监听 `window`，更新 `isScrolled` / `activeSection` |
| `checkTheme()` / `toggleTheme()` | `DynamicNavbar.vue#L142-L154` | 读取/切换暗色主题（localStorage） |
| `setBodyScrollLock(locked)` | `DynamicNavbar.vue#L156-L172` | 移动端菜单打开时锁 body 滚动 |
| `toggleMobileMenu()` / `closeMobileMenu()` | `DynamicNavbar.vue#L174-L184` | 移动端菜单开合 |

- **副作用**：`onMounted`/`onUnmounted`（`#L186`/`#L198`）注册/注销滚动与 resize 监听；读写 localStorage 主题键。

#### HeroScreen.vue（第一屏 · 个人介绍）
纯展示组件（`HeroScreen.vue#L2-L39` 模板 + scoped 样式）：个人介绍文案、使命卡片、底部核心统计。无脚本逻辑。

#### StatsBento.vue（第二屏 · 能力统计）
展示型 Bento（`StatsBento.vue#L2-L100` 模板，样式至 `#L220`）：头像、角色标签、简历入口按钮（指向 `docs/public/` 下的简历 PDF）、四宫格统计数据、技能进度条、双轨走马灯。无交互逻辑。

#### StickyTimeline.vue（第三屏 · 荣誉时间轴）
布局型组件（`StickyTimeline.vue#L2-L118`）：左侧 sticky 仪表盘看板 + 右侧可滚动荣誉/经历时间轴节点。纯 CSS sticky + 滚动容器。

#### ProjectShowcase.vue（第四屏 · 项目作品集）
- **职责**：左侧「全栈架构 & AI 探索」介绍板 + 右侧滚动项目卡片列表。
- **数据（2026-10-18 起改为数据驱动）**：卡片来自单一数据源 [projects.mjs](file:///e:/Web_git/my-blog/docs/.vitepress/theme/projects.mjs)（字段 `slug` / `title` / `badge{icon,text,type}` / `tags` / `desc`），组件用 `v-for` 渲染；首个 tag 自动高亮为品牌色，`badge.type` 映射到 `gold/purple/cyan/gray-badge` 类，左侧「N LAB NODES ACTIVE」计数自动取 `projects.length`。
- **样式**：`split-screen` 左右分栏（左 45% / 右 55%）、`.glass-panel` 玻璃卡片 hover 位移。
- **新增项目 = 改数据源 + 新建详情页**，组件本身无需再改：
  1. 在 `projects.mjs` 的 `projects` 数组追加一条（`slug` 必须等于详情页文件名）；
  2. 新建 `docs/projects/<slug>.md` 与配图目录 `docs/projects/<slug>.assets/`。
- ⚠️ 数据源文件名不可含 `.data.mjs`：VitePress 会把 `.vitepress/` 下的 `*.data.mjs` 当数据加载器解析，导致 `config must export or return an object` 构建报错。

#### HubGateway.vue（第五屏 · 知识中枢网关）
2×2 矩阵渲染四大知识入口卡片（`HubGateway.vue#L2-L80`），分别链到 `/hub/ai-agent`、`/hub/cloud-devops`、`/hub/workflow`、`/hub/algorithm`；卡片 hover 流光效果（`#L83-L157`）。

#### ContactFooter.vue（第六屏 · 联系留言）
全站唯一的「前端 ↔ 后端」交互组件，左表单 + 右侧 GitHub 链接与服务器状态终端。

| 函数 | 位置 | 说明 |
|---|---|---|
| `getFileIcon(type)` | `ContactFooter.vue#L157-L166` | 按 MIME 返回附件图标 |
| `formatFileSize(bytes)` | `ContactFooter.vue#L168-L172` | 文件大小格式化 |
| `handleFileSelect(event)` | `ContactFooter.vue#L174-L177` | 文件选择框 onchange |
| `handleDrop(event)` | `ContactFooter.vue#L179-L183` | 拖拽上传 |
| `addFiles(files)` | `ContactFooter.vue#L185-L206` | 核心校验：最多 3 个附件、单文件大小限制、去重 |
| `removeFile(index)` | `ContactFooter.vue#L208-L210` | 移除附件 |
| `submitForm()` | `ContactFooter.vue#L212-L261` | 构造 `FormData`（name/email/message + attachments，`subject` 后端兼容保留、前端暂不发送），`fetch('/api/contact', { method: 'POST' })`，处理成功/失败/413 状态 |
| `fetchServerStatus()` | `ContactFooter.vue#L264-L271` | `fetch('/api/health')` 拉取服务器探针 |
| `formattedUptime`（computed） | `ContactFooter.vue#L273-L280` | 把探针 `uptime` 秒数格式化为 `xh xm xs` |
| `onMounted` | `ContactFooter.vue#L282` | 挂载即拉服务器状态 |

- **数据契约**：请求体字段（name/email/message + attachments）与 `server.js` 的 `req.body` 对应（见 [03 章](./03-backend.md)）。

#### HubLanding.vue（知识中枢落地页）
- **职责**：渲染 hub 页的 Hero、核心技术栈矩阵、知识轨道、文末格言；在 `docs/hub/*.md` 末尾以 `<HubLanding />` 使用。
- **数据来源**：读取页面 frontmatter（`title`/`subtitle`/`description`/`techStack`/`tracks`/`quote`/`sidebarKey`），数据驱动渲染（契约见 [04 章](./04-content-modules.md)）。
- **关键函数**：`count`（`HubLanding.vue#L72-L80`，按 `sidebarKey` 从 `theme.sidebar` 递归统计文章数）、`mdBold(s)`（`HubLanding.vue#L82`，把 `**bold**` 转 `<strong>`）。

#### CategoryList.vue（目录索引卡片）
- **职责**：各内容仓库 `index.md` 的「自动分类卡片墙」——组件捕获当前 URL，反查 `config.mjs` 的 `sidebar` 字典动态渲染分组卡片；空分组显示「📭 内容筹备中」空态。
- **关键逻辑**：`topLinks`（`CategoryList.vue#L57-L59`，无子项的直达链接）、`groups`（`#L62-L64`，分组卡片）、`isFolder(item)`（`#L67`）、`stripHtml(s)`（`#L70-L73`，剔除标题里注入的 `.side-count` 徽章 HTML）、`countArticles(item)`（`#L76-L79`）、`firstLink(item)`（`#L82-L89`，递归取分组首链）。
- **地位**：「混合驱动」模式的关键——长尾文章零维护自动上架，专栏导言页只写一行 `<CategoryList />`。

#### KnowledgeSwitcher.vue（侧边栏胶囊切换器）
注入 `sidebar-nav-before` 插槽（`KnowledgeSwitcher.vue#L2-L47`）：硬编码四个 hub 模块入口胶囊，按当前路径高亮所在模块；在 `projects`/`resume`/首页/`about` 等页面自动隐藏。

#### ProjectHero.vue（项目详情页 Hero）
`defineProps`（`ProjectHero.vue#L36-L42`）接收 `title` / `subtitle` / `date` / `role` / `honors`（荣誉字符串数组），渲染项目标题与元数据网格。被 `docs/projects/*.md` 局部导入。

#### ReadingProgress.vue（阅读进度条）
`updateProgress`（`ReadingProgress.vue#L27-L32`）用 `scrollY / scrollHeight` 计算进度，`transform: scaleX()` 驱动；`onMounted`/`onUnmounted`（`#L34`/`#L40`）挂/卸 scroll 监听；仅非 home、非 `page` 布局的文档页显示。

#### DocMeta.vue（文章元信息）
- **职责**：显示「发布日期 · 阅读时长」，并把元信息块 DOM 挪到 `.VPDoc h1` 正下方。
- **关键函数**：`pad(n)`（`DocMeta.vue#L31`）、`estimateReadingTime()`（`#L36-L44`，中文字数 + 英文单词数混合估算）、`relocate()`（`#L46-L57`，DOM 重定位）、`watch(route.path, relocate)`（`#L61`）。
- **依赖**：文章 frontmatter 需有 `date` 字段才显示发布日期。

#### BentoGrid.vue（备用）
纯静态 Bento 网格（`BentoGrid.vue#L2-L90`，无脚本），CSS Grid + hover 动效；当前文档未引用，保留备用。

---

## 2.4 style.css 结构概览

文件：`docs/.vitepress/theme/style.css`（约 800 行），按区块组织：

| 区块 | 大致位置 | 内容 |
|---|---|---|
| CSS 变量 | `#L11-L138` | `:root` 与 `.dark` 双主题变量（品牌色、背景、文字、侧边栏专属变量 `#L494-L518`） |
| 首页全屏滚动 | `#L140-L190` | `.home-spa-wrapper` 高度链锁死、`.universe-container` 全屏 scroll-snap、每屏基础单元 |
| 响应式 | `#L191-L268` | 移动端（≤768px、≤480px）首页与导航适配 |
| 文档页排版 | `#L270-L436` | 正文容器加宽、图片展示、极客风格 H2/H3/H4（垂直线标题）、表格/引用块/代码/链接动效、pager 卡片化 |
| 导航栏美化 | `#L437-L492` | VPNavBar 毛玻璃、导航链接字距、搜索按钮、移动端导航条 |
| 侧边栏控制台风格 | `#L494-L650` | 扫描线纹理、细滚动条、分组标题计数徽章 `.side-count`（与 `config.mjs` 注入的 HTML 对应）、当前页高亮、折叠动画 |
| 移动端收尾 | `#L801` 起 | 移动端覆盖 |

修改视觉风格的入口就是这个文件；组件内另有 scoped 样式负责各自局部布局。
