# DESIGN.md — DevPortal 视觉系统（Almanac 方向）

> 本文件是全站视觉的唯一真相。CSS / 组件与本文冲突时，以本文为准。
> 方向代号 **Almanac（年鉴 / 编辑部）**，2026-10-19 确立，替代旧「极客控制台 / 霓虹终端」方向。

## 1. 发现与定位（Discovery）

- **产物类型**：个人技术门户 = 作品集（Experience/Persuade）+ 技术写作知识库（Read）+ 求职入口（Persuade）。约 70% 内容是长文阅读，按 Read 模式排版优先。
- **受众**：技术招聘方、同行开发者、学习者。
- **形容词承诺**：编辑感 · 克制 · 精密 · 有温度（纸感）· 清晰。
- **三词本质**：印刷品般的、可信的、安静的。
- **差异化依据（2026 联网调研）**：AI 生成站默认审美已收敛为「深色底 + 蓝渐变 + 玻璃拟态」；本站反向走浅色纸感编辑部风，衬线西文 + 规则线排版，避开 AI 指纹。

## 2. 美学承诺与签名

- **基底风格**：Editorial / magazine（aesthetics-library），向 Swiss 网格借「规则与留白」，向 Almanac 借「纸感与年鉴式元信息」。
- **定义性特征（defining trait）**：以**细规则线（rule lines）+ 栏式留白 + mono 元信息**取代卡片墙；层级靠字号/字重/墨色深浅，不靠发光和渐变。
- **签名动作（signature move）**：文章/区块标题上方的**全宽细规则线 + 左对齐 mono 小标签**（栏目名/日期），像报纸版面的栏头。

## 3. 字体系统

| 角色 | 栈 | 说明 |
|---|---|---|
| Display（西文/数字/短装饰词） | `"Fraunces", "Noto Serif SC", "Songti SC", serif` | 衬线复兴；西文经 fontsource 加载，失败回退系统衬线 |
| Display（中文大标题） | 同上 | 中文渲染到 Noto Serif SC / 系统宋体 |
| 正文 | `"PingFang SC", "Microsoft YaHei", "Noto Sans SC", system-ui, sans-serif` | 系统黑体，稳定无加载成本 |
| 元信息 / 代码 / 计数 | `"JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace` | 替代裸 `monospace` |

- 字号阶梯（~1.2 模数，基准 16px）：12 / 14 / 16 / 20 / 25 / 30 / 40px（hero 可至 clamp(40px, 6vw, 64px)）。
- 标题行高 1.25、字距 -0.01em；正文行高 1.8，行宽 ≤ 72ch；正文强调用 600 字重，不用全粗。
- 数字一律 `font-variant-numeric: tabular-nums`。

## 4. 色彩系统（OKLCH 意识 · 单一 accent）

| 角色 | 浅色（默认） | 深色 Mood Mode | 用途 |
|---|---|---|---|
| bg（纸面） | `#FAF9F6` | `#141414` | 页面底色，暖色温纸感 / 多层深灰非纯黑 |
| bg-alt | `#F3F1EC` | `#1B1B1B` | 代码块、分区底 |
| bg-elv | `#FFFFFF` | `#212121` | 浮层 |
| bg-soft | `#F0EEE8` | `#1E1E1E` | 柔和区分 |
| fg-1 / fg-2 / fg-3 | `#201E1A` / `#55514A` / `#8B857A` | `#EAE7E0` / `#A8A29A` / `#6E6A62` | 主/次/弱文字（暖墨，非纯黑纯白） |
| accent（墨绿） | `#0F766E`（hover `#115E59`） | `#2DD4BF` | 链接、强调、当前态；唯一彩色 |
| accent-soft | `rgba(15,118,110,0.10)` | `rgba(45,212,191,0.14)` | 强调底 |
| border / divider | `#E3DFD6` / `#EAE7DE` | `#2E2E2E` / `#262626` | 规则线与边框 |
| 语义 | 成功 `#15803D` · 警告 `#B45309` · 错误 `#B91C1C` | 亮一档同族 | 仅状态反馈使用 |

- 分布约 60-30-10：中性纸墨 / 品牌 accent / 状态色。
- 禁止：紫蓝渐变、霓虹发光、纯黑 `#000`、纯白文字、彩色卡片底。

## 5. 布局 · 间距 · 圆角 · 阴影

- 间距刻度：4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px；组内紧、组间松。
- 圆角最多两档：6px（控件/小标签）、12px（卡片/图片）；胶囊仅徽章。
- 阴影只有一种弱法：`0 1px 2px rgba(32,30,26,0.06)` 级；层级主要靠边框与底色差，不用发光表达。
- 文章正文 ≤ 72ch；首页分区允许 1200–1400px 宽画板。
- 左对齐为主；居中仅限 hero 短句与空态。

## 6. 动效系统

| token | 值 | 用途 |
|---|---|---|
| `--duration-fast` | 150ms | 按钮、链接、hover |
| `--duration-normal` | 200ms | 常规状态变化 |
| `--duration-slow` | 300ms | 面板、折叠 |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | 进场与常规 |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | 屏内移动 |

- 只动 `transform` 与 `opacity`；禁止动画化 width/height/top/left。
- 滚动 reveal 用原生 `animation-timeline: view()`，位移 8–16px（读作淡入，非滑入）。
- 页间过渡用 View Transitions API（200–300ms 交叉淡入），不支持则静默降级。
- 焦点时刻唯一：首页 Hero 文案 stagger；其余区块统一轻 reveal，禁止每屏同款 fade-up。
- `prefers-reduced-motion` 采用倒置写法：默认无动效，在 `no-preference` 下启用；不砍安全淡入。

## 7. Craft 决策

- **导航**：全站单一导航壳（VPNavBar），首页不再是 `layout:false` 特例；锚点用原生滚动 + `scroll-margin-top`。
- **首页**：编辑部式单页长滚动（Hero → 精选作品 → 最新写作 → 知识地图 → 关于 → 联系），无滚动容器、无 scroll-snap。
- **列表**：分隔线列表（标题/日期/体裁标签），不用卡片墙；空态给一句引导而非插画堆砌。
- **组件状态**：hover / focus-visible / active / disabled 齐全；focus 用 2px accent 描边，不移除轮廓。
- **无障碍**：正文对比 ≥ 4.5:1；点击目标 ≥ 44px（移动端）；不以颜色单独表意；语义 HTML 优先。

## 8. Slop 规避记录（已从旧站移除）

玻璃拟态面板、霓虹 glow 阴影、侧边栏扫描线纹理、双轨走马灯、假终端闪烁光标、装饰性 pulse 状态点、裸 `monospace` 字体栈、`scroll-snap` 整屏吸附、`100vh` 高度链锁死、全局 0.01ms 动效一刀切。

## 9. 变更日志

- **2026-10-19 v1**：确立 Almanac 方向；色彩由青蓝霓虹换暖纸墨绿；标题由竖线极客风换规则线编辑部风；动效 token 化；记录去 slop 清单。
