import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.css'

// 首页编辑部区块（docs/index.md 按顺序引用）
import HeroScreen from './components/HeroScreen.vue'
import ProjectList from './components/ProjectList.vue'
import HonorsSection from './components/HonorsSection.vue'
import WritingHub from './components/WritingHub.vue'
import ContactFooter from './components/ContactFooter.vue'

// 侧边栏顶部的胶囊切换器组件
import KnowledgeSwitcher from './components/KnowledgeSwitcher.vue'

// 目录索引卡片、知识中枢落地页（需在 md 中全局使用，故 enhanceApp 注册）
import CategoryList from './components/CategoryList.vue'
import HubLanding from './components/HubLanding.vue'

// 文档体验增强（顶部阅读进度条 + 文章元信息）
import ReadingProgress from './components/ReadingProgress.vue'
import DocMeta from './components/DocMeta.vue'

export default {
  extends: DefaultTheme,

  // 劫持官方布局，注入全局增强。
  // 首页为 layout: page，与文档页共用 VPNavBar（全站单一导航壳）
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 顶部阅读进度条（组件内部自行判断仅在文档类页面显示）
      'layout-top': () => h(ReadingProgress),
      // 把 4 大模块的胶囊切换器钉在侧边栏顶部
      'sidebar-nav-before': () => h(KnowledgeSwitcher),
      // 文章标题下方注入「发布日期 · 阅读时长」
      'doc-before': () => h(DocMeta)
    })
  },

  enhanceApp({ app, router }) {
    app.component('HeroScreen', HeroScreen)
    app.component('ProjectList', ProjectList)
    app.component('HonorsSection', HonorsSection)
    app.component('WritingHub', WritingHub)
    app.component('ContactFooter', ContactFooter)
    // 供各专栏 index.md 与 hub/*.md 在正文中直接使用
    app.component('CategoryList', CategoryList)
    app.component('HubLanding', HubLanding)
    // KnowledgeSwitcher / ReadingProgress / DocMeta 通过 h 函数直接渲染，无需注册
  }
}
