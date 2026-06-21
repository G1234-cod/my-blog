<template>
  <nav :class="['dynamic-navbar', { 'is-scrolled': isScrolled }]">
    <a href="javascript:void(0)" class="nav-brand" @click.prevent="handleNavClick('hero')">GYX<span>.Dev</span></a>
    
    <ul class="nav-links">
      <li><a href="javascript:void(0)" :class="{ active: activeSection === 'hero' }" @click.prevent="handleNavClick('hero')">01 START</a></li>
      <li><a href="javascript:void(0)" :class="{ active: activeSection === 'stats' }" @click.prevent="handleNavClick('stats')">02 DATA</a></li>
      <li><a href="javascript:void(0)" :class="{ active: activeSection === 'timeline' }" @click.prevent="handleNavClick('timeline')">03 HONORS</a></li>
      <li><a href="javascript:void(0)" :class="{ active: activeSection === 'projects' }" @click.prevent="handleNavClick('projects')">04 LABS</a></li>
      <li><a href="javascript:void(0)" :class="{ active: activeSection === 'hub' }" @click.prevent="handleNavClick('hub')">05 KNOWLEDGE</a></li>
      <li><a href="javascript:void(0)" :class="{ active: activeSection === 'contact' }" @click.prevent="handleNavClick('contact')">06 CONNECT</a></li>
    </ul>

    <div class="nav-controls">
      <button class="theme-switch" @click="toggleTheme" title="切换显示模式">
        <span class="icon">{{ isDark ? '🌙' : '☀️' }}</span>
        <span class="label">{{ isDark ? 'Dark' : 'Light' }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vitepress'

const route = useRoute()
const router = useRouter()

const isScrolled = ref(false)
const isDark = ref(true) 
const activeSection = ref('hero') 

const sections = ['hero', 'stats', 'timeline', 'projects', 'hub', 'contact']

// 💡 1. 核心判断：当前是否在首页？
const isHomePage = computed(() => route.path === '/' || route.path === '/index.html')

// 💡 2. 智能高亮雷达：根据当前 URL 路由分析高亮哪个标签
const updateActiveStateByRoute = () => {
  if (!isHomePage.value) {
    // 只要是在项目实战目录里，高亮 04 LABS
    if (route.path.includes('/projects/')) {
      activeSection.value = 'projects'
    } 
    // 其他如算法、笔记、知识库等，高亮 05 KNOWLEDGE
    else if (route.path.includes('/ai-journey/') || route.path.includes('/tech-note/') || 
             route.path.includes('/leetcode/') || route.path.includes('/env-setup/')) {
      activeSection.value = 'hub'
    } else {
      activeSection.value = '' 
    }
  }
}

// 监听路由实时变化
watch(() => route.path, () => {
  updateActiveStateByRoute()
  // 如果刚切回首页，检查是否有需要滚动的“跨页请求”
  if (isHomePage.value) {
    setTimeout(processPendingScroll, 100)
  }
}, { immediate: true })

// 💡 3. 跨页跃迁引擎：拦截所有点击动作
const handleNavClick = (sectionId) => {
  if (isHomePage.value) {
    // 情况A：本来就在首页，直接丝滑滚动
    scrollToSection(sectionId)
  } else {
    // 情况B：在项目详情页，先用 sessionStorage 记下要去哪，然后强制路由跳回首页
    sessionStorage.setItem('pendingScroll', sectionId)
    router.go('/')
  }
}

// 基础的丝滑滚动计算
const scrollToSection = (sectionId) => {
  const container = document.querySelector('.universe-container')
  if (!container) return
  const index = sections.indexOf(sectionId)
  if (index !== -1) {
    activeSection.value = sectionId
    const targetScrollTop = index * window.innerHeight
    container.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
  }
}

// 处理“跨页跃迁”落地后的滚动
const processPendingScroll = () => {
  const pending = sessionStorage.getItem('pendingScroll')
  if (pending) {
    scrollToSection(pending)
    sessionStorage.removeItem('pendingScroll')
  }
}

// 💡 4. 双轨毛玻璃特效判断
const checkScroll = () => {
  if (isHomePage.value) {
    // 首页用内部的宇宙容器算高度
    const container = document.querySelector('.universe-container')
    if (!container) return
    isScrolled.value = container.scrollTop > 50
    
    const screenHeight = window.innerHeight
    const scrollPosition = container.scrollTop + (screenHeight / 2) 
    const index = Math.floor(scrollPosition / screenHeight)
    if (sections[index] && activeSection.value !== sections[index]) {
      activeSection.value = sections[index]
    }
  } else {
    // 项目文档页，直接用传统的网页 window 滚动条判断
    isScrolled.value = window.scrollY > 50
  }
}

const checkTheme = () => {
  isDark.value = document.documentElement.classList.contains('dark')
}
const toggleTheme = () => {
  if (typeof window !== 'undefined') {
    const isDarkMode = document.documentElement.classList.toggle('dark')
    isDark.value = isDarkMode
    localStorage.setItem('vitepress-theme-appearance', isDarkMode ? 'dark' : 'light')
  }
}

onMounted(() => {
  // 同时监听首页容器滚动和全局网页滚动，确保两边都有毛玻璃特效
  const container = document.querySelector('.universe-container')
  if (container) container.addEventListener('scroll', checkScroll)
  window.addEventListener('scroll', checkScroll)
  
  if (typeof window !== 'undefined') checkTheme()
  
  // 初次加载如果是在首页，检查跨页跃迁
  if (isHomePage.value) {
    setTimeout(processPendingScroll, 300)
  }
})

onUnmounted(() => {
  const container = document.querySelector('.universe-container')
  if (container) container.removeEventListener('scroll', checkScroll)
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
/* 原有的 CSS 完美无瑕，原样保留 */
.dynamic-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  z-index: 9999;
  background: transparent;
  transition: all 0.3s ease;
  box-sizing: border-box;
  font-family: var(--vp-font-family-base);
}

.dynamic-navbar.is-scrolled {
  background: var(--vp-c-bg-soft);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--vp-c-divider);
}

.nav-brand {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  text-decoration: none;
  letter-spacing: 0.5px;
}
.nav-brand span {
  color: var(--vp-c-brand-1);
}

.nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a { 
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding-bottom: 6px;
  position: relative;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--vp-c-text-1);
}

.nav-links a.active {
  color: var(--vp-c-brand-1);
}

.nav-links a.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--vp-c-brand-1);
  border-radius: 2px;
  box-shadow: 0 0 10px var(--vp-c-brand-1);
  animation: slideIn 0.3s ease forwards;
}

@keyframes slideIn {
  from { transform: scaleX(0); opacity: 0; }
  to { transform: scaleX(1); opacity: 1; }
}

.nav-controls {
  display: flex;
  align-items: center;
}

.theme-switch {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  transition: all 0.2s ease;
  font-family: inherit;
  font-size: inherit;
}

.theme-switch:hover {
  border-color: var(--vp-c-brand-1);
}

.theme-switch .icon {
  font-size: 1.1rem;
}

.theme-switch .label {
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  font-weight: 700;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .dynamic-navbar {
    padding: 0 20px;
  }
  .nav-links {
    gap: 16px;
  }
  .nav-links a {
    font-size: 0.75rem;
  }
  .theme-switch .label {
    display: none;
  }
}
</style>