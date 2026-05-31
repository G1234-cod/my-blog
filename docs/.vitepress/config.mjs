import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "关运祥 | 技术沉淀",
  description: "AI 应用开发与软件工程实践",
  ignoreDeadLinks: true, 

  themeConfig: {
    nav: [
      { text: '🏠 首页', link: '/' },
      { text: '👨‍💻 个人简历', link: '/resume/index.html' }, 
      { text: '🤖 AI 应用探索', link: '/ai-journey/' },
      { text: '💻 力扣题解', link: '/leetcode/' },
      { text: '🛠️ 环境部署', link: '/env-setup/' },
      { text: '📚 阅读与碎片', link: '/tech-note/' }
    ],

    sidebar: {
      '/ai-journey/': [
        {
          text: '🤖 AI 核心学习日志',
          collapsed: false,
          items: [
            { text: '专栏简介', link: '/ai-journey/' }
          ]
        }
      ],
      '/leetcode/': [
        {
          text: '💻 算法与数据结构',
          collapsed: false,
          items: [
            { text: '力扣刷题总览', link: '/leetcode/' }
          ]
        }
      ],
      '/env-setup/': [
        {
          text: '🛠️ 环境配置与服务架构',
          collapsed: false,
          items: [
            { text: '部署随笔索引', link: '/env-setup/' }
          ]
        }
      ],
      '/resume-project/': [
        {
          text: '💻 个人门户项目实战',
          collapsed: false,
          items: [
            { text: '主页架构实战', link: '/resume-project/关于简历与博客架构连通' }
          ]
        }
      ],    
      '/tech-note/': [
        {
          text: '📝 沙箱与技术碎片',
          collapsed: false,
          items: [
            { text: '未分类随笔', link: '/tech-note/' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/G1234-cod' }
    ]
  }
})