import DefaultTheme from 'vitepress/theme'
import { h } from 'vue' // 🔥 必须引入 Vue 的 h 函数
import './style.css'

import DynamicNavbar from './components/DynamicNavbar.vue'
import HeroScreen from './components/HeroScreen.vue'
import StatsBento from './components/StatsBento.vue'
import StickyTimeline from './components/StickyTimeline.vue'
import ProjectShowcase from './components/ProjectShowcase.vue'
import HubGateway from './components/HubGateway.vue'
import ContactFooter from './components/ContactFooter.vue'

export default {
  extends: DefaultTheme,
  
  // 🔥 核心魔法：劫持官方布局，把你的极客导航栏钉在全站顶部
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(DynamicNavbar)
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
  }
}