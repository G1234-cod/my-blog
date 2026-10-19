// ==========================================
// 精选阅读 · 单一数据源（Single Source of Truth）
// ==========================================
// 内容仓库文章没有 date frontmatter，无法自动取「最新」，
// 因此首页精选阅读采用手选代表作（沿用 projects.mjs 的数据驱动模式）。
// 调整精选只需改本数组；url 必须与内容仓库中的 md 路径一致（cleanUrls，无 .html）。
//
// 字段说明：
//   title  —— 文章标题
//   url    —— 文章路由（docs/<url>.md）
//   module —— 体裁/模块标签
//   desc   —— 一句话摘要（建议 30~50 字）
// ==========================================

export const featuredReads = [
  {
    title: '本地私有知识库（基于 AnythingLLM）搭建学习笔记',
    url: '/tech-note/3.本地私有知识库_基于AnythingLLM搭建学习笔记_详细版',
    module: '技术笔记',
    desc: '从 DNS、Docker 网络到镜像加速——先本地跑通全流程，再考虑上云优化的完整踩坑记录。'
  },
  {
    title: 'RAG 与 Agent',
    url: '/ai-journey/Phase2-RAG-KnowledgeBase/2.RAG与Agent',
    module: 'AI 落地实战',
    desc: '厘清检索增强生成与智能体两大范式的边界、协作方式与选型判断。'
  },
  {
    title: 'Agent 工程化与规范驱动开发 SDD',
    url: '/ai-journey/Phase1-API-Basics/6.Agent工程化与规范驱动开发_SDD',
    module: 'AI 落地实战',
    desc: '用规范驱动开发约束 Agent 产出：从提示词到工程规范的范式升级。'
  },
  {
    title: 'Docker 环境搭建',
    url: '/tech-note/1.Docker环境搭建',
    module: '技术笔记',
    desc: '容器环境从零搭建的初始知识点与配置实录。'
  },
  {
    title: 'WSL2 Docker 环境隔离',
    url: '/env-setup/WSL2-Docker-Env-Isolation',
    module: '环境配置',
    desc: 'Windows 与 WSL2 混合开发环境下的 Docker 隔离方案与实践。'
  },
  {
    title: 'LeetCode-1 两数之和',
    url: '/leetcode/哈希/LeetCode-1-两数之和',
    module: '算法题解',
    desc: '哈希表经典入门题的思路推演与复杂度分析。'
  }
]
