import DefaultTheme from 'vitepress/theme'
import './style.css'

import DynamicNavbar from '../components/DynamicNavbar.vue'
import HeroScreen from '../components/HeroScreen.vue'
// 1. 新增导入
import StatsBento from '../components/StatsBento.vue' 

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('DynamicNavbar', DynamicNavbar)
    app.component('HeroScreen', HeroScreen)
    // 2. 新增全局注册
    app.component('StatsBento', StatsBento) 
  }
}