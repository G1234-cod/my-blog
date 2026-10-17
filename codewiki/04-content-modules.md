# 04 · 内容体系与多仓库拼装

## 4.1 内容目录职责

| 目录 | 归属 | 内容 | 维护方式 |
|---|---|---|---|
| `docs/index.md` | 本仓库 | 首页（`layout:false`，六屏 SPA） | 改组件 |
| `docs/about.md` | 本仓库 | 「关于我」页（教育背景/技术栈/荣誉） | 直接编辑 md |
| `docs/hub/*.md` | 本仓库 | 4 个知识中枢落地页（`ai-agent`/`cloud-devops`/`workflow`/`algorithm`） | frontmatter 数据驱动（见 4.3） |
| `docs/projects/*.md` | 本仓库 | 8 个项目作品详情页 + `*.assets/` 配图 | md + ProjectHero 组件 |
| `docs/public/` | 本仓库 | 静态资源：简历 PDF、照片、背景图；CI 会注入 `public/resume/` 原生 HTML 简历 | 手工维护 |
| `docs/ai-journey/` 等 7 个软链 | 外部仓库 | 学习笔记/题解/日志等长尾内容 | 在各自仓库维护 |

**项目作品清单**（`docs/projects/`）：`cloud-portal`（本项目自身）、`market-transactions`、`community-forum`、`online-exam`、`bearing-diagnosis`、`garbage-classification`、`graphic-tools`、`local-rag`。

## 4.2 多仓库软链映射表

本地开发：`docs/` 下目录是软链接（Windows Junction），指向同盘克隆的独立仓库；CI：`deploy.yml` 阶段二/三 checkout 到**相同路径**替代软链。两侧行为对齐是构建正确的前提。

| docs/ 下挂载点 | 本地目标（当前环境） | 远端仓库 | 侧边栏角色 |
|---|---|---|---|
| `docs/tech-note` | `E:\Web_git\tech-note` | `G1234-cod/tech-note` | 4 模块的技术笔记（`Published/01~04-*` 四个子目录分属四大模块） |
| `docs/ai-journey` | `E:\Web_git\AI-Application-Learning-Journey` | `G1234-cod/AI-Application-Learning-Journey` | AI 落地实战（Phase1~4） |
| `docs/leetcode` | `E:\Web_git\leetcode-solutions` | `G1234-cod/leetcode-solutions` | LeetCode 题解 |
| `docs/env-setup` | `E:\Web_git\env-setup` | `G1234-cod/env-setup` | 效能基建与环境配置 |
| `docs/reading` | `E:\Web_git\Reading-and-Comprehension` | `G1234-cod/Reading-and-Comprehension` | 读书/论文笔记（`01~04-*` 四个子目录） |
| `docs/my-resume` | `E:\Web_git\Individual-Resume\my-resume` | `G1234-cod/Individual-Resume` | 简历 md（`resume-zh.md`） |
| `docs/build-journal` | `E:\Web_git\Individual-Resume\build-journal` | `G1234-cod/Individual-Resume` | 建站日志（5 篇架构复盘） |

注意：

- `docs/my-resume`、`docs/build-journal` 以 **symlink 形式入库**（blob 指向 `E:/Web_git/Individual-Resume/...` 绝对路径），`docs/resume-project` 被 gitignore；其余 5 个挂载点被 gitignore、完全靠环境补齐。
- CI 阶段三会用真实内容覆盖 `docs/build-journal` 与 `docs/my-resume`（`rm -rf` 后拷贝），并额外产出一份 `docs/resume-project/` 兼容旧 URL（见 [01 章已知注意点](./01-architecture.md)）。

## 4.3 四种页面模式（frontmatter 契约）

### 模式 1：首页（`docs/index.md`）

`layout: false`，正文只组装六屏组件：`DynamicNavbar` + `HeroScreen` + `StatsBento` + `StickyTimeline` + `ProjectShowcase` + `HubGateway` + `ContactFooter`（`docs/index.md#L8-L16`）。内容更新通常是改对应组件。

### 模式 2：知识中枢页（`docs/hub/*.md`）

`layout: page` + `pageClass: hub-landing-page`，frontmatter 是**数据契约**，正文末尾一行 `<HubLanding />` 由组件消费渲染：

```yaml
---
layout: page
pageClass: hub-landing-page
title: 大模型与智能体工程 (AI & Agent)
icon: 🤖
subtitle: AI & AGENT
sidebarKey: /hub/ai-agent        # HubLanding 用它去 theme.sidebar 统计文章数
description: >-                  # Hero 简介
  ...
techTitle: 🎯 核心技术栈
techStack:                       # 技术栈矩阵
  - label: 运行环境
    value: WSL2 / Docker / 本地算力部署
tracks:                          # 知识轨道（每条含 icon/title/desc + points 或 links）
  - icon: 🌟
    title: AI 应用架构与落地实战 (AI-Journey)
    desc: ...
    points: ["**Phase 1: ...** - ..."]
  - icon: 🛠️
    title: 本地私有知识库搭建 (Tech-Notes)
    links: [{ text: ..., href: /tech-note/Published/... }]
quote: AI 是肢体，工程化是神经，而架构思维才是灵魂。
---
<HubLanding />
```

（示例取自 `docs/hub/ai-agent.md`；`**加粗**` 会被 `mdBold` 转成 `<strong>`。）

### 模式 3：项目作品页（`docs/projects/*.md`）

标准文档布局（`aside`/`outline: deep`），局部导入 ProjectHero 并传 props，正文为图文详情：

```markdown
<script setup>
import ProjectHero from '../.vitepress/theme/components/ProjectHero.vue'
</script>

<ProjectHero
  title="双引擎全栈技术门户系统"
  subtitle="CLOUD-NATIVE JAMSTACK PORTAL & CI/CD"
  date="2026.06"
  role="云原生架构师 & 全栈运维"
  :honors="['云计算技术课程优秀大作业', ...]"
/>
```

配图放同名 `xxx.assets/` 目录，正文用相对路径引用。

### 模式 4：内容仓库导言页（各软链仓库的 `index.md`）

写一段专栏介绍 + 末尾一行 `<CategoryList />`。组件自动按当前 URL 反查侧边栏字典渲染分类卡片墙，**新增文章不需要改导言页**（混合驱动模式）。

## 4.4 内容侧约定

| 约定 | 说明 |
|---|---|
| frontmatter `title` | 侧边栏标题优先取它（`useTitleFromFrontmatter`） |
| frontmatter `date` | `DocMeta` 据此显示发布日期 |
| 文件名序号 | `1.xxx` / `2-xxx` 形式的前缀会被侧边栏自动剥离（`prefixSeparator: /^\d+[.-]\s*/`） |
| 不进站文件 | `README.md`、`模板.md`、`阅读笔记_参考模板.md` 被 `srcExclude` + 侧边栏 `excludeByGlobPattern` 双重排除 |
| 新增专栏 | ① 内容仓库根 `index.md` 末尾加 `<CategoryList />` 并 push；② `config.mjs` 对应 `xxxSidebar` 里加一条 `getSidebarModule`；③ `deploy.yml` 若是新仓库需加 checkout 步骤 |

## 4.5 内容与引擎的耦合点（改代码时注意）

| 耦合点 | 位置 | 说明 |
|---|---|---|
| 侧边栏路由字典 | `config.mjs#L155-L179` | hub 页与内容目录共享同一套侧边栏，路径前缀必须与软链目录名一致 |
| `CategoryList` 反查 | `CategoryList.vue` | 依赖 `useData().theme.sidebar`，改 sidebar 结构会直接影响它 |
| `HubLanding` frontmatter | `docs/hub/*.md` | 字段名与组件消费逻辑绑定 |
| 硬编码项目卡片 | `ProjectShowcase.vue#L2-L174` | 与 `docs/projects/*.md` 一一对应，两处需同步 |
| 硬编码模块胶囊 | `KnowledgeSwitcher.vue` | 新增第五个模块需要同步改此组件 |
