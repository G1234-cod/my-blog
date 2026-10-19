import DefaultTheme from 'vitepress/theme'
import { h } from 'vue' // 🔥 必须引入 Vue 的 h 函数
import './style.css'

// 引入原来的组件
import DynamicNavbar from './components/DynamicNavbar.vue'
import HeroScreen from './components/HeroScreen.vue'
import StatsBento from './components/StatsBento.vue'
import StickyTimeline from './components/StickyTimeline.vue'
import ProjectShowcase from './components/ProjectShowcase.vue'
import HubGateway from './components/HubGateway.vue'
import ContactFooter from './components/ContactFooter.vue'

// 🔥 引入侧边栏顶部的胶囊切换器组件
import KnowledgeSwitcher from './components/KnowledgeSwitcher.vue'

// 新增：目录索引卡片、知识中枢落地页（需在 md 中全局使用，故 enhanceApp 注册）
import CategoryList from './components/CategoryList.vue'
import HubLanding from './components/HubLanding.vue'

// 新增：文档体验增强（顶部阅读进度条 + 文章元信息）
import ReadingProgress from './components/ReadingProgress.vue'
import DocMeta from './components/DocMeta.vue'

export default {
  extends: DefaultTheme,

  // 🔥 核心魔法：劫持官方布局，注入各类全局增强
  // 注意：首页是 layout:false，不经过此 Layout，首页导航由其 md 内的 DynamicNavbar 负责；
  // 其余页面统一使用官方 VPNavBar（已在 style.css 做毛玻璃美化），此处不再重复注入 DynamicNavbar
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

  enhanceApp({ app }) {
    app.component('DynamicNavbar', DynamicNavbar)
    app.component('HeroScreen', HeroScreen)
    app.component('StatsBento', StatsBento)
    app.component('StickyTimeline', StickyTimeline)
    app.component('ProjectShowcase', ProjectShowcase)
    app.component('HubGateway', HubGateway)
    app.component('ContactFooter', ContactFooter)
    // 全局注册：供各专栏 index.md 与 hub/*.md 在正文中直接使用
    app.component('CategoryList', CategoryList)
    app.component('HubLanding', HubLanding)
    // 注意：KnowledgeSwitcher / ReadingProgress / DocMeta 是通过 h 函数直接渲染的，不需要在这里全局注册
  }
}