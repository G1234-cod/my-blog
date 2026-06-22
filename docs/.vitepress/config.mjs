import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import { createRequire } from 'module'
import fs from 'fs'
import path from 'path'

const require = createRequire(import.meta.url)

// 🛠️ 进阶引擎 1：递归修补路由前缀（彻底解决 vitepress-sidebar 吞前缀导致 404 的 Bug）
function fixSidebarLinks(items, scanPath) {
  if (!items || !Array.isArray(items)) return [];
  return items.map(item => {
    // 如果链接存在，且没有包含正确的前缀，则强行补上
    if (item.link && !item.link.startsWith(`/${scanPath}/`)) {
      const cleanLink = item.link.replace(/^\//, ''); // 剔除可能多余的斜杠
      item.link = `/${scanPath}/${cleanLink}`;
    }
    // 递归处理子目录
    if (item.items) {
      item.items = fixSidebarLinks(item.items, scanPath);
    }
    return item;
  });
}

// 🛠️ 进阶引擎 2：精准扫描并拦截修正
function getSidebarModule(scanPath, title) {
  const targetDir = path.join(process.cwd(), 'docs', scanPath)
  if (!fs.existsSync(targetDir)) return []

  let items = generateSidebar({
    documentRootPath: 'docs',
    scanStartPath: scanPath,
    resolvePath: `/${scanPath}/`, 
    useTitleFromFrontmatter: true, // 🔥 修复 1：强制读取 md 顶部的 YAML 标题，解决全是英文名的问题
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true
  })
  
  // 🔥 修复 2：调用上方函数，强行修正丢失的路径前缀
  items = fixSidebarLinks(items, scanPath);
  
  // 如果传了 title，说明是给 Hub 页面拼装的；如果不传，说明是给根目录直出的
  return items && items.length > 0 ? (title ? [{ text: title, items: items }] : items) : []
}

// ==========================================
// 🎯 4 大模块的侧边栏跨目录拼装逻辑
// ==========================================
const aiSidebar = [
  { text: '🌟 知识中枢', link: '/hub/ai-agent' },
  ...getSidebarModule('ai-journey', '🚀 AI 落地实战路线'),
  ...getSidebarModule('tech-note/Published/01-AI-Agent', '🛠️ 知识库与本地部署'),
  ...getSidebarModule('reading/01-AI-Agent', '📖 前沿论文精读')
]

const cloudSidebar = [
  { text: '🌟 知识中枢', link: '/hub/cloud-devops' },
  ...getSidebarModule('build-journal', '🏗️ 全栈建站日志'),
  ...getSidebarModule('tech-note/Published/02-Cloud-DevOps', '☁️ 云原生基建排障'),
  ...getSidebarModule('reading/02-Cloud-DevOps', '📖 架构演进泛读')
]

const workflowSidebar = [
  { text: '🌟 知识中枢', link: '/hub/workflow' },
  ...getSidebarModule('env-setup', '⚡ 效能基建与自动化'),
  ...getSidebarModule('tech-note/Published/03-Workflow', '🛠️ 极客开发环境'),
  ...getSidebarModule('reading/03-Workflow', '📖 工程文化与敏捷')
]

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
  ignoreDeadLinks: true, 

  srcExclude: [
    '**/模板.md',
    '**/阅读笔记_参考模板.md',
    '**/README.md',
  ],
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  vite: {
    resolve: {
      preserveSymlinks: true,
      alias: {
        'vue/server-renderer': require.resolve('vue/server-renderer')
      }
    }
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '01 AI & AGENT', link: '/hub/ai-agent' },
      { text: '02 CLOUD & DEVOPS', link: '/hub/cloud-devops' },
      { text: '03 WORKFLOW', link: '/hub/workflow' },
      { text: '04 ALGORITHM', link: '/hub/algorithm' },
      { text: '05 RESUME', link: '/my-resume/resume-zh' }
    ],

    sidebar: {
      '/hub/ai-agent': aiSidebar,
      '/ai-journey/': aiSidebar,
      '/tech-note/Published/01-AI-Agent/': aiSidebar,
      '/reading/01-AI-Agent/': aiSidebar,

      '/hub/cloud-devops': cloudSidebar,
      '/build-journal/': cloudSidebar,
      '/tech-note/Published/02-Cloud-DevOps/': cloudSidebar,
      '/reading/02-Cloud-DevOps/': cloudSidebar,

      '/hub/workflow': workflowSidebar,
      '/env-setup/': workflowSidebar,
      '/tech-note/Published/03-Workflow/': workflowSidebar,
      '/reading/03-Workflow/': workflowSidebar,

      '/hub/algorithm': algoSidebar,
      '/leetcode/': algoSidebar,
      '/tech-note/Published/04-Algorithm/': algoSidebar,
      '/reading/04-Algorithm/': algoSidebar,
      
      // 🔥 修复 3：统一调用我们增强过的 getSidebarModule，彻底解决 404 与英文名
      '/projects/': getSidebarModule('projects')
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/G1234-cod' }
    ],

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