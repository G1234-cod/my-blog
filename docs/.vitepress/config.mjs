import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

// 🛠️ 辅助魔法函数：精准扫描指定物理目录，并生成对应的侧边栏模块
function getSidebarModule(scanPath, title) {
  const items = generateSidebar({
    documentRootPath: 'docs',
    scanStartPath: scanPath,
    resolvePath: `/${scanPath}/`, // 确保生成的内部链接前缀正确，与路由对齐
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true
  })
  
  // 安全校验：如果该目录下没有扫描到 md 文件，就不渲染这个分类的标题，防止出现空目录
  return items && items.length > 0 ? [{ text: title, items: items }] : []
}

// ==========================================
// 🎯 4 大模块的侧边栏跨目录拼装逻辑
// ==========================================

// 1. 组装 AI 模块：大盘门面 + 实战 + 知识库笔记 + 前沿阅读
const aiSidebar = [
  { text: '🌟 知识中枢', link: '/hub/ai-agent' },
  ...getSidebarModule('ai-journey', '🚀 AI 落地实战路线'),
  ...getSidebarModule('tech-note/Published/01-AI-Agent', '🛠️ 知识库与本地部署'),
  ...getSidebarModule('reading/01-AI-Agent', '📖 前沿论文精读')
]

// 2. 组装云原生模块
const cloudSidebar = [
  { text: '🌟 知识中枢', link: '/hub/cloud-devops' },
  ...getSidebarModule('build-journal', '🏗️ 全栈建站日志'),
  ...getSidebarModule('tech-note/Published/02-Cloud-DevOps', '☁️ 云原生基建排障'),
  ...getSidebarModule('reading/02-Cloud-DevOps', '📖 架构演进泛读')
]

// 3. 组装工作流模块
const workflowSidebar = [
  { text: '🌟 知识中枢', link: '/hub/workflow' },
  ...getSidebarModule('env-setup', '⚡ 效能基建与自动化'),
  ...getSidebarModule('tech-note/Published/03-Workflow', '🛠️ 极客开发环境'),
  ...getSidebarModule('reading/03-Workflow', '📖 工程文化与敏捷')
]

// 4. 组装算法模块
const algoSidebar = [
  { text: '🌟 知识中枢', link: '/hub/algorithm' },
  ...getSidebarModule('leetcode', '💻 LeetCode 题解仓库'),
  ...getSidebarModule('tech-note/Published/04-Algorithm', '🧠 数据结构精修'),
  ...getSidebarModule('reading/04-Algorithm', '📖 CS 底层泛读')
]


// ==========================================
// 🚀 VitePress 主配置
// ==========================================
export default defineConfig({
  title: "DevPortal",
  description: "专注 AI 应用与全栈架构的软件工程师",
  lang: 'zh-CN',
  ignoreDeadLinks: true, // 忽略死链报错，保证构建不中断
  
  /* 排除文件名中包含 '.' 或 '_' 的 Markdown 文件（修复 VitePress 1.6.4 SSR 解析 Bug） */
  srcExclude: ['**/*.*.md', '**/*_*.md'],
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  // 保留你原本极其关键的底层构建配置
  vite: {
    resolve: {
      /* 关键：保留符号链接路径，使模块从 my-blog/node_modules 解析，防止软链接报错 */
      preserveSymlinks: true,
      alias: {
        'vue/server-renderer': require.resolve('vue/server-renderer')
      }
    }
  },

  themeConfig: {
    // 🔥 顶部导航栏更新：接入最新的四大模块与简历入口
    nav: [
      { text: '首页', link: '/' },
      { text: '01 AI & AGENT', link: '/hub/ai-agent' },
      { text: '02 CLOUD & DEVOPS', link: '/hub/cloud-devops' },
      { text: '03 WORKFLOW', link: '/hub/workflow' },
      { text: '04 ALGORITHM', link: '/hub/algorithm' },
      { text: '05 RESUME', link: '/my-resume/resume-zh' }
    ],

    // 🔥 核心路由劫持：无论访客深入这个模块的哪个子物理仓库，侧边栏都雷打不动地展示拼接好的完整目录树
    sidebar: {
      // 模块 1：AI 与智能体工程
      '/hub/ai-agent': aiSidebar,
      '/ai-journey/': aiSidebar,
      '/tech-note/Published/01-AI-Agent/': aiSidebar,
      '/reading/01-AI-Agent/': aiSidebar,

      // 模块 2：架构演进与云原生运维
      '/hub/cloud-devops': cloudSidebar,
      '/build-journal/': cloudSidebar,
      '/tech-note/Published/02-Cloud-DevOps/': cloudSidebar,
      '/reading/02-Cloud-DevOps/': cloudSidebar,

      // 模块 3：效能工具与现代工作流
      '/hub/workflow': workflowSidebar,
      '/env-setup/': workflowSidebar,
      '/tech-note/Published/03-Workflow/': workflowSidebar,
      '/reading/03-Workflow/': workflowSidebar,

      // 模块 4：计算机科学与算法精修
      '/hub/algorithm': algoSidebar,
      '/leetcode/': algoSidebar,
      '/tech-note/Published/04-Algorithm/': algoSidebar,
      '/reading/04-Algorithm/': algoSidebar,
      
      // 模块 5：项目实战展示（兼容保留原本的单独目录扫描）
      '/projects/': generateSidebar({
        documentRootPath: 'docs',
        scanStartPath: 'projects',
        resolvePath: '/projects/',
        useTitleFromFileHeading: true,
        useFolderTitleFromIndexFile: true
      })
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/G1234-cod' }
    ],

    // 保留你原本完美的汉化搜索配置
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: { selectText: '选择', navigateText: '切换' }
              }
            }
          }
        }
      }
    },
    
    editLink: { pattern: '' }
  }
})