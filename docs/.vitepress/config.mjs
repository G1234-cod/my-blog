import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "DevPortal",
  description: "专注 AI 应用与全栈架构的软件工程师",
  lang: 'zh-CN',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  vite: {
    server: {
      fs: {
        allow: ['E:/Web_git']
      }
    }
  },

  themeConfig: {
    // 顶部导航栏，指向 6 个专栏的根目录（index.md）
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI 探索', link: '/ai-journey/' },
      { text: '环境部署', link: '/env-setup/' },
      { text: '算法解析', link: '/leetcode/' },
      { text: '技术笔记', link: '/tech-note/' },
      { text: '泛读思考', link: '/reading/' },
      { text: '建站日志', link: '/build-journal/' } 
    ],

    // 左侧边栏分组逻辑，严格映射本地物理文件
    sidebar: {
      
      '/ai-journey/': [
        {
          text: 'Phase 1: API 基础与工程化',
          items: [
            { text: '1. Set First', link: '/ai-journey/Phase1-API-Basics/1.Set_first' },
            { text: '2. 项目环境搭建与密钥安全', link: '/ai-journey/Phase1-API-Basics/2.项目环境搭建与密钥安全：从零理解虚拟环境与环境变量' },
            { text: '3. 借助 Trae 修复 CI/CD 目录解析', link: '/ai-journey/Phase1-API-Basics/3.借助Trae 修复 CICD 目录解析与死循环陷阱' },
            { text: '5. Agent 工程化与规范驱动开发', link: '/ai-journey/Phase1-API-Basics/5.Agent 工程化与规范驱动开发（SDD实战）' },
            { text: '阶段总结：原生基础与协议破冰', link: '/ai-journey/Phase1-API-Basics/5.第一阶段总结：原生基础与协议破冰' }
          ]
        },
        {
          text: 'Phase 2: RAG 与本地知识库',
          items: [
            { text: '1. AI 应用架构与 LangChain 定位', link: '/ai-journey/Phase2-RAG-KnowledgeBase/1.AI应用架构与LangChain生态定位' },
            { text: '2. RAG 与 Agent', link: '/ai-journey/Phase2-RAG-KnowledgeBase/2.RAG与Agent' },
            { text: '3. 检索模块与模型调用接口认知', link: '/ai-journey/Phase2-RAG-KnowledgeBase/3.检索模块与模型调用接口深度认知' },
            { text: '5. Model 整体流程及学习框架', link: '/ai-journey/Phase2-RAG-KnowledgeBase/5.Model整体流程及学习框架' },
            { text: '6. PromptTemplate 总结', link: '/ai-journey/Phase2-RAG-KnowledgeBase/6.PromptTemplate总结' },
            { text: '7. ChatPromptTemplate 总结', link: '/ai-journey/Phase2-RAG-KnowledgeBase/7.ChatPromptTemplate总结' },
            { text: '8. 返回值类型总结', link: '/ai-journey/Phase2-RAG-KnowledgeBase/8.返回值类型总结' },
            { text: '9. Chains 知识总结', link: '/ai-journey/Phase2-RAG-KnowledgeBase/9.Chains知识总结' }
          ]
        }
      ],

      '/env-setup/': [
        {
          text: '自动化图床与博客搭建',
          items: [
            { text: '1. 自动化图床系统构建全记录', link: '/env-setup/Typora + PicGo + GitHub实现博客搭建/1.1.Typora + PicGo + GitHub 自动化图床系统构建全记录' },
            { text: '2. 构建工业级图片管理体系', link: '/env-setup/Typora + PicGo + GitHub实现博客搭建/2.构建工业级图片管理体系——Typora 路径变量与 GitHub 层级化存储' },
            { text: '3. 自动化图床背后的工程逻辑', link: '/env-setup/Typora + PicGo + GitHub实现博客搭建/3.自动化图床背后的工程逻辑与工具哲学' }
          ]
        }
      ],

      '/build-journal/': [
        {
          text: '双引擎个人技术门户构建',
          items: [
            { text: '架构连通与初始化', link: '/build-journal/关于简历与博客架构连通' },
            { text: '自动化上线实战', link: '/build-journal/自动化上线实战下' },
            { text: '架构的终极进化', link: '/build-journal/架构的终极进化' }
          ]
        }
      ],

      '/leetcode/': [
        {
          text: '哈希表 (Hash Table)',
          items: [
            { text: 'LeetCode 1: 两数之和', link: '/leetcode/哈希/LeetCode-1-两数之和' },
            { text: 'LeetCode 49: 字母异位词分组', link: '/leetcode/哈希/LeetCode-49-字母异位词分组' }
          ]
        }
      ],

      '/reading/': [
        {
          text: '大模型前沿 (Large Model)',
          items: [
            { text: '阅读笔记参考模板', link: '/reading/01_Large_Model/阅读笔记：[参考模板]' }
          ]
        }
      ],
      
      // tech-note 暂未分类，留空即可，后续有了文章按此格式添加
      '/tech-note/': []
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/G1234-cod' }
    ],

    // 本地搜索配置
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