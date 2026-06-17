import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

export default defineConfig({
  title: "DevPortal",
  description: "专注 AI 应用与全栈架构的软件工程师",
  lang: 'zh-CN',
  ignoreDeadLinks: true,
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  vite: {
    server: {
      fs: { allow: ['E:/Web_git'] }
    },
    build: {
      rollupOptions: { external: ['vue/server-renderer', 'vue'] }
    }
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI 探索', link: '/ai-journey/' },
      { text: '环境部署', link: '/env-setup/' },
      { text: '算法解析', link: '/leetcode/' },
      { text: '技术笔记', link: '/tech-note/' },
      { text: '泛读思考', link: '/reading/' },
      { text: '建站日志', link: '/build-journal/' } 
    ],

    // 【极其关键】这里是你之前漏传的自动化引擎！
    sidebar: generateSidebar([
      {
        documentRootPath: 'docs',
        scanStartPath: 'ai-journey',
        resolvePath: '/ai-journey/',
        useTitleFromFileHeading: true,
        useFolderTitleFromIndexFile: true
      },
      {
        documentRootPath: 'docs',
        scanStartPath: 'env-setup',
        resolvePath: '/env-setup/',
        useTitleFromFileHeading: true
      },
      {
        documentRootPath: 'docs',
        scanStartPath: 'build-journal',
        resolvePath: '/build-journal/',
        useTitleFromFileHeading: true
      },
      {
        documentRootPath: 'docs',
        scanStartPath: 'leetcode',
        resolvePath: '/leetcode/',
        useTitleFromFileHeading: true
      },
      {
        documentRootPath: 'docs',
        scanStartPath: 'reading',
        resolvePath: '/reading/',
        useTitleFromFileHeading: true
      },
      {
        documentRootPath: 'docs',
        scanStartPath: 'tech-note',
        resolvePath: '/tech-note/',
        useTitleFromFileHeading: true
      }
    ]),

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
