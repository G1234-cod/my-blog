// ==========================================
// 项目作品集 · 单一数据源（Single Source of Truth）
// ==========================================
// 新增项目只需两步：
//   1. 在本数组追加一条记录（slug 必须与 docs/projects/<slug>.md 文件名一致）
//   2. 新建详情页 docs/projects/<slug>.md 与配图目录 docs/projects/<slug>.assets/
// 首页 FeaturedProjects 会据此自动渲染精选卡片，无需再改组件。
//
// ⚠️ 文件名不要包含 .data.mjs —— VitePress 会把 .vitepress/ 下的 *.data.mjs 当作数据加载器处理。
//
// 字段说明：
//   slug   —— 路由标识，对应 /projects/<slug>
//   title  —— 卡片标题
//   badge  —— 右上角徽章，可为 null（不显示）；type 可选 gold / purple / cyan / gray
//   tags   —— 技术标签数组，第一个自动高亮为品牌色
//   desc   —— 卡片描述（建议 60~90 字，说清「解决什么问题 + 怎么解决」）
// ==========================================

export const projects = [
  {
    slug: 'bearing-diagnosis',
    title: '智眸探微：工业轴承故障诊断系统',
    badge: { icon: '🏆', text: '省级二等奖', type: 'gold' },
    tags: ['DeepSeek-R1', 'CNN 模型', '预知性维护'],
    desc: '一个集实时监测、预知性维护与智能决策于一体的工业解决方案。通过轻量化 CNN 模型与 DeepSeek-R1 大模型联动，实现了轴承异常的早期预警与自动化维护闭环，大幅降低了非计划停机损失。'
  },
  {
    slug: 'shangan-banxue',
    title: '上岸伴学：考公备考激励小程序',
    badge: { icon: '📱', text: '已上线小程序', type: 'emerald' },
    tags: ['Taro 4 + React', 'FastAPI', '三端体系'],
    desc: '一款已上线微信的考公备考激励小程序（搜「上岸伴学」直达）。以「倒计时督促 + 打卡 + 奖券激励」为核心，覆盖错题、番茄钟、记账、时政收集等 18 个功能页；游客沙盒与云端同步双轨设计，断网可用、数据不丢失。'
  },
  {
    slug: 'market-transactions',
    title: '智能二手商品发布助手',
    badge: { icon: '🌟', text: 'AI 全栈应用', type: 'gold' },
    tags: ['YOLOv8 + CLIP', '以图搜图', 'AI 智能定价'],
    desc: '一款面向二手商品交易的 AI 发布平台。用户只需上传一张商品照片，系统自动完成品类识别、市场查价、瑕疵检测、智能定价、流式文案生成，全流程仅需 3 次点击即可一键发布到商城。'
  },
  {
    slug: 'online-exam',
    title: '在线考试管理系统',
    badge: { icon: '🪪', text: '国家软著登记', type: 'purple' },
    tags: ['RBAC 权限', '自动化阅卷', '极值数据分析'],
    desc: '一款校园场景下的考务自动化平台。实现了角色权限分离、题库增删维护、自动阅卷与深度统计分析。系统具备严密的防作弊逻辑，能一键提取考生成绩极值与违纪率，为教学质量评估提供数据支撑。'
  },
  {
    slug: 'graphic-tools',
    title: '多功能图形工具集系统',
    badge: { icon: '🪪', text: '国家软著登记', type: 'purple' },
    tags: ['Python', 'Turtle + Pygame', '跨库渲染解耦'],
    desc: '一款集成益智游戏、图形绘制与教育应用的桌面系统。采用四层模块化解耦设计，通过融合 turtle 与 pygame 的跨库渲染技术，在极低资源占用下提供了丰富的交互娱乐功能。便于对学生进行python教学。'
  },
  {
    slug: 'local-rag',
    title: '基于 AnythingLLM 的本地私有化知识库',
    badge: { icon: '🔒', text: '纯内网物理隔离', type: 'gray' },
    tags: ['RAG 架构', 'WSL2 / Docker', 'AnythingLLM'],
    desc: '一套部署于 WSL2 容器环境的私有化 RAG（检索增强生成）系统。通过解耦 Ollama 模型底座与 AnythingLLM 应用层，实现了完全本地化、数据不出内网的文档切片、向量检索与智能问答服务。'
  },
  {
    slug: 'community-forum',
    title: '基于双重验证机制的社区互动系统',
    badge: { icon: '⏳', text: '软著审核中', type: 'cyan' },
    tags: ['Web 安全架构', '双重验证引擎', '原子化结算'],
    desc: '一个高安全性的 Web 交互平台。核心采用了多模态双重验证引擎与全局拦截器架构，不仅保障了内容交互的安全，还内置了原子化积分结算引擎，确保了用户资产的安全性与数据记录的可追溯性。'
  },
  {
    slug: 'garbage-classification',
    title: '基于深度学习的垃圾分类识别系统',
    badge: null,
    tags: ['PyTorch', '长尾分布对抗', '工厂设计模式'],
    desc: '利用 PyTorch 构建的高精度图像识别底座。系统解决了 40 类垃圾图像的长尾分布痛点，通过工厂设计模式实现了多种主流网络架构的一键切换与评估，为智慧城市环卫场景提供了算法支持。'
  },
  {
    slug: 'cloud-portal',
    title: '云原生个人门户系统 (Jamstack + CI/CD)',
    badge: null,
    tags: ['Jamstack', 'VitePress', 'GitHub Actions'],
    desc: '基于 Jamstack 架构的个人知识库与作品集。通过 GitHub Actions 构建自动化流水线，实现了代码多仓库聚合、VitePress 自动编译与 阿里云服务器/GitHub Pages 双平台 的零宕机发布，构建了从本地写作到云端发布的闭环运维体系。'
  }
]
