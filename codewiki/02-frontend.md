# 02 · 前端模块（VitePress 配置层 + 自定义主题）

> 2026-10-19 起视觉方向切换为 **Almanac（编辑部/年鉴）**，首页由六屏全屏滚动重构为编辑部式单页长滚动。
> 视觉系统唯一真相见根目录 `DESIGN.md`（色彩/字体/间距/动效 token 与去 slop 清单）。

前端全部代码集中在 `docs/.vitepress/`，分为三个模块：

| 模块 | 文件 | 职责 |
|---|---|---|
| 站点装配层 | `docs/.vitepress/config.mjs` | 站点元信息、导航（首页/作品/写作/知识库下拉/关于/简历）、侧边栏跨目录拼装引擎、搜索、构建排除规则 |
| 主题入口层 | `docs/.vitepress/theme/index.js` | 继承官方主题，Layout 插槽注入全局增强，注册全局组件，View Transitions 路由钩子 |
| 样式与组件层 | `theme/style.css` + `theme/components/*.vue`（13 个）+ 数据源 `projects.mjs` / `featured-reads.mjs` | 首页编辑部六区块、知识中枢落地页、项目列表、目录卡片、阅读体验增强 |

---

## 2.1 config.mjs — 侧边栏拼装引擎

侧边栏拼装逻辑不变（`fixSidebarLinks` / `countArticles` / `getSidebarModule` 三函数 + 四模块混合驱动），详见 git 历史版本的完整说明。要点：

- 四大模块侧边栏（`aiSidebar` / `cloudSidebar` / `workflowSidebar` / `algoSidebar`）= hub 页 + 3 个内容源分组，跨目录聚合；
- `themeConfig.sidebar` 按路由前缀分发；`/projects/` 走 `getSidebarModule('projects', '💼 项目作品集')`；
- **导航（2026-10-19 重组）**：`首页 / 作品 /写作 / 知识库(四模块下拉) / 关于 / 简历`，替代原 6 项平铺；
- 本地搜索（`provider: 'local'`）、`cleanUrls`、`ignoreDeadLinks`、软链所需的 `vite.resolve.preserveSymlinks` 均保留。

## 2.2 theme/index.js — 主题入口

`export default` 继承 `vitepress/theme`：

| 能力 | 实现 |
|---|---|
| Layout 插槽注入 | `layout-top` → `ReadingProgress`（仅文档页显示）；`sidebar-nav-before` → `KnowledgeSwitcher`；`doc-before` → `DocMeta` |
| 全局组件注册 | `HeroScreen`、`ProjectList`、`FeaturedReads`、`KnowledgeIndex`、`HomeAbout`、`ContactFooter`、`CategoryList`、`HubLanding` |
| View Transitions | `enhanceApp({ router })` 中用 `router.onBeforeRouteChange` + `document.startViewTransition` 包裹路由切换（双 rAF 等 DOM 更新后定格新画面），仅浏览器 + 支持 API + 未开启 reduced-motion 时启用，静默降级 |

注意：首页 `layout: page` 与文档页共用 VPNavBar（全站单一导航壳）；旧 `layout:false` + DynamicNavbar 双导航体系已退役。

## 2.3 组件清单（theme/components/，13 个）

### 首页编辑部区块（docs/index.md 按序引用，`.home-editorial` 容器）

| 组件 | 职责 |
|---|---|
| `HeroScreen.vue` | 衬线大标题 Hero：定位语、主/次 CTA（精选作品锚点 + 简历 PDF）、求职意向 mono 注脚。入场 stagger 编排（全站唯一焦点序列） |
| `ProjectList.vue` | 项目列表（数据源 `projects.mjs`）：`limit` / `heading` / `showMore` / `sectionId` props 泛化，首页精选 3 条与 `/projects/` 全量索引共用 |
| `FeaturedReads.vue` | 精选阅读（数据源 `featured-reads.mjs`）：内容仓文章无 date frontmatter，无法自动取「最新」，沿用 projects.mjs 模式手选代表作 |
| `KnowledgeIndex.vue` | 知识地图：四模块分隔线行式索引，一跳直达 `/hub/*` |
| `HomeAbout.vue` | 关于：数字带（mono tabular-nums）+ 五条精简履历（荣誉/算法/创新/资质/实践）+ 简历与 about 链接 |
| `ContactFooter.vue` | 联系：留言表单（name/email/message + 附件 ≤3 个，`POST /api/contact`）+ GitHub 与 `/api/health` 服务器状态。表单逻辑保留旧实现，视觉去终端拟物 |
| `SectionHead.vue` | 编辑部栏头（签名动作）：mono 栏目标签 + 衬线大标题 + 细规则线，被各区块复用 |

### 其余组件

| 组件 | 使用位置 |
|---|---|
| `HubLanding.vue` | `docs/hub/*.md` 末尾 `<HubLanding />`，frontmatter 数据驱动 |
| `CategoryList.vue` | 各内容仓 `index.md` 末尾 `<CategoryList />`，反查 sidebar 自动上架 |
| `ProjectHero.vue` | `docs/projects/*.md` 局部导入 |
| `KnowledgeSwitcher.vue` | 侧边栏顶部四模块胶囊（`sidebar-nav-before` 插槽） |
| `ReadingProgress.vue` | 阅读进度条（`layout-top` 插槽，JS scroll 监听；可选升级 `animation-timeline: scroll()`） |
| `DocMeta.vue` | 「发布日期 · 阅读时长」（`doc-before` 插槽，DOM 重定位到 h1 下） |

### 数据源

| 文件 | 说明 |
|---|---|
| `theme/projects.mjs` | 项目单一数据源（slug/title/badge/tags/desc），新增项目改这里 + 建详情页 |
| `theme/featured-reads.mjs` | 精选阅读单一数据源（title/url/module/desc），调整精选改这里 |

已退役组件（2026-10-19 删除）：DynamicNavbar、StatsBento、StickyTimeline、ProjectShowcase、HubGateway、BentoGrid。

## 2.4 页面结构

| 路由 | 形态 |
|---|---|
| `/` | `layout: page` 编辑部单页：Hero → 精选作品 → 精选阅读 → 知识地图 → 关于 → 联系。window 原生滚动（无嵌套滚动容器/无 scroll-snap），锚点原生 |
| `/projects/` | 作品索引（ProjectList 全量） |
| `/writing/` | 写作索引：四模块 × 三体裁导航 + 体裁说明 |
| `/about/` | 完整履历页 |
| `/hub/*` | 知识中枢着陆页（HubLanding） |
| 内容仓文章 | 文档页（VPDoc 排版 + ReadingProgress + DocMeta） |

## 2.5 style.css 结构概览

约 780 行，按区块组织：

| 区块 | 内容 |
|---|---|
| 字体加载（顶部 @import） | Fraunces / Noto Serif SC / JetBrains Mono（jsdelivr fontsource，失败回退系统栈） |
| 色彩基座（:root / .dark） | Almanac token：暖纸面 + 暖墨字 + 墨绿单一 accent；深色 Mood Mode 多层深灰。含动效 token（duration/ease） |
| 首页容器 | `.home-editorial`（max-width 1100px）；无滚动容器 |
| reduced-motion | 全局 reduce 安全网；新动效均在 `no-preference` 倒置启用 |
| 文档页排版 | 衬线 H1（底部细规则线）/ H2（顶部规则线栏头）/ H3 / 表格 / 引文 / 链接 hover 下划线 |
| 导航与侧边栏 | 实色纸面导航（无毛玻璃）、侧栏 mono 分组标签 + `.side-count` 徽章（无扫描线/发光） |
| 动效系统（§20） | `ed-rise` Hero stagger、`ed-reveal` scroll-driven reveal（`animation-timeline: view()`）、View Transitions 交叉淡入 220ms |

组件内另有 scoped 样式负责各自局部布局。
