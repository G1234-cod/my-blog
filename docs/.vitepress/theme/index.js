import DefaultTheme from 'vitepress/theme'
import './style.css'
import BentoGrid from '../components/BentoGrid.vue'
import CategoryList from '../components/CategoryList.vue' // 新增引入

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BentoGrid', BentoGrid)
    app.component('CategoryList', CategoryList) // 新增注册
  }
}