import DefaultTheme from 'vitepress/theme'
import './style.css' // 引入你刚才加了各种炫酷特效的全局样式

// 1. 手动导入我们手写的极客组件
import DynamicNavbar from '../components/DynamicNavbar.vue'
import HeroScreen from '../components/HeroScreen.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 2. 全局注册！这一步是让组件能在 Markdown 中生效的关键
    app.component('DynamicNavbar', DynamicNavbar)
    app.component('HeroScreen', HeroScreen)
  }
}