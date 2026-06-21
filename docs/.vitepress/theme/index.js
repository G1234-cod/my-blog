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

// 🔥 新增：引入侧边栏顶部的胶囊切换器组件
import KnowledgeSwitcher from './components/KnowledgeSwitcher.vue'

export default {
  extends: DefaultTheme,
  
  // 🔥 核心魔法：劫持官方布局，同时注入顶部导航和侧边栏分类
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 保留你原来的极客导航栏钉在全站顶部
      'layout-top': () => h(DynamicNavbar),
      // 新增：把 4 大模块的胶囊切换器钉在侧边栏顶部
      'sidebar-nav-before': () => h(KnowledgeSwitcher)
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
    // 注意：KnowledgeSwitcher 是通过 h 函数直接渲染的，不需要在这里全局注册
  }
}