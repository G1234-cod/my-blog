import DefaultTheme from 'vitepress/theme'
import './style.css'

import DynamicNavbar from './components/DynamicNavbar.vue'
import HeroScreen from './components/HeroScreen.vue'
import StatsBento from './components/StatsBento.vue'
import StickyTimeline from './components/StickyTimeline.vue'
import ProjectShowcase from './components/ProjectShowcase.vue'
import HubGateway from './components/HubGateway.vue'
import ContactFooter from './components/ContactFooter.vue'

export default {
  ...DefaultTheme,
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