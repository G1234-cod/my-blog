<template>
  <nav :class="['dynamic-navbar', { 'is-scrolled': isScrolled, 'is-mobile-open': isMobileMenuOpen }]">
    <a href="javascript:void(0)" class="nav-brand" @click.prevent="handleNavClick('hero')">GYX<span>.Dev</span></a>

    <div
      v-if="isMobileMenuOpen"
      class="nav-overlay"
      @click="closeMobileMenu"
      aria-hidden="true"
    ></div>
    
    <ul class="nav-links">
      <li><a href="javascript:void(0)" :class="{ active: activeSection === 'hero' }" @click.prevent="handleNavClick('hero')">01 START</a></li>
      <li><a href="javascript:void(0)" :class="{ active: activeSection === 'stats' }" @click.prevent="handleNavClick('stats')">02 DATA</a></li>
      <li><a href="javascript:void(0)" :class="{ active: activeSection === 'timeline' }" @click.prevent="handleNavClick('timeline')">03 HONORS</a></li>
      <li><a href="javascript:void(0)" :class="{ active: activeSection === 'projects' }" @click.prevent="handleNavClick('projects')">04 LABS</a></li>
      <li><a href="javascript:void(0)" :class="{ active: activeSection === 'hub' }" @click.prevent="handleNavClick('hub')">05 KNOWLEDGE</a></li>
      <li><a href="javascript:void(0)" :class="{ active: activeSection === 'contact' }" @click.prevent="handleNavClick('contact')">06 CONNECT</a></li>
    </ul>

    <div class="nav-controls">
      <ClientOnly>
        <button class="theme-switch" @click="toggleTheme" title="切换显示模式">
          <span class="icon">{{ isDark ? '🌙' : '☀️' }}</span>
          <span class="label">{{ isDark ? 'Dark' : 'Light' }}</span>
        </button>
      </ClientOnly>
      
      <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span class="menu-icon" :class="{ 'is-open': isMobileMenuOpen }"></span>
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
const isMobileMenuOpen = ref(false)

const sections = ['hero', 'stats', 'timeline', 'projects', 'hub', 'contact']

// 💡 1. 核心判断：当前是否在首页？
const isHomePage = computed(() => route.path === '/' || route.path === '/index.html')

// 💡 2. 智能高亮雷达
const updateActiveStateByRoute = () => {
  if (!isHomePage.value) {
    if (route.path.includes('/projects/')) {
      activeSection.value = 'projects'
    } else if (route.path.includes('/ai-journey/') || route.path.includes('/tech-note/') || 
               route.path.includes('/leetcode/') || route.path.includes('/env-setup/')) {
      activeSection.value = 'hub'
    } else {
      activeSection.value = '' 
    }
  }
}

// 💡 3. 跨页跃迁引擎 (🔥 修复：必须放在 watch 之前定义)
const scrollToSection = (sectionId) => {
  if (typeof document === 'undefined') return
  const container = document.querySelector('.universe-container')
  if (!container) return
  const isMobile = window.innerWidth <= 768
  const index = sections.indexOf(sectionId)
  if (index !== -1) {
    activeSection.value = sectionId
    const targetScrollTop = index * window.innerHeight
    if (isMobile) {
      // 移动端 universe-container 不再是滚动容器
      window.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
    } else {
      container.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
    }
  }
}

const processPendingScroll = () => {
  if (typeof sessionStorage === 'undefined') return // 防 SSR 崩溃保护
  const pending = sessionStorage.getItem('pendingScroll')
  if (pending) {
    scrollToSection(pending)
    sessionStorage.removeItem('pendingScroll')
  }
}

const handleNavClick = (sectionId) => {
  closeMobileMenu()
  if (isHomePage.value) {
    scrollToSection(sectionId)
  } else {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('pendingScroll', sectionId)
    }
    if (typeof window !== 'undefined') {
      window.location.href = '/' 
    }
  }
}

// 💡 4. 监听路由实时变化 (🔥 移到了被调用的函数下方)
watch(() => route.path, () => {
  updateActiveStateByRoute()
  if (isHomePage.value) {
    setTimeout(processPendingScroll, 100)
  }
}, { immediate: true })

// 💡 5. 双轨毛玻璃特效判断
const checkScroll = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  
  if (isHomePage.value) {
    const container = document.querySelector('.universe-container')
    const isMobile = window.innerWidth <= 768
    // 移动端 universe-container 不再是滚动容器，改用 window 滚动位置
    const scrollTop = isMobile
      ? (window.scrollY || document.documentElement.scrollTop || 0)
      : (container ? container.scrollTop : 0)
    
    isScrolled.value = scrollTop > 50
    
    const screenHeight = window.innerHeight
    const scrollPosition = scrollTop + (screenHeight / 2)
    const index = Math.floor(scrollPosition / screenHeight)
    if (sections[index] && activeSection.value !== sections[index]) {
      activeSection.value = sections[index]
    }
  } else {
    isScrolled.value = window.scrollY > 50
  }
}

const checkTheme = () => {
  if (typeof document !== 'undefined') {
    isDark.value = document.documentElement.classList.contains('dark')
  }
}

const toggleTheme = () => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const isDarkMode = document.documentElement.classList.toggle('dark')
    isDark.value = isDarkMode
    localStorage.setItem('vitepress-theme-appearance', isDarkMode ? 'dark' : 'light')
  }
}

const setBodyScrollLock = (locked) => {
  if (typeof document === 'undefined') return
  const body = document.body
  if (locked) {
    if (!body.style.overflow) {
      body.dataset.prevOverflow = body.style.overflow
    }
    body.style.overflow = 'hidden'
  } else {
    if (body.dataset.prevOverflow !== undefined) {
      body.style.overflow = body.dataset.prevOverflow
      delete body.dataset.prevOverflow
    } else {
      body.style.overflow = ''
    }
  }
}

const toggleMobileMenu = () => {
  const next = !isMobileMenuOpen.value
  isMobileMenuOpen.value = next
  setBodyScrollLock(next)
}

const closeMobileMenu = () => {
  if (!isMobileMenuOpen.value) return
  isMobileMenuOpen.value = false
  setBodyScrollLock(false)
}

onMounted(() => {
  const container = document.querySelector('.universe-container')
  if (container) container.addEventListener('scroll', checkScroll)
  window.addEventListener('scroll', checkScroll)
  
  if (typeof window !== 'undefined') checkTheme()
  
  if (isHomePage.value) {
    setTimeout(processPendingScroll, 300)
  }
})

onUnmounted(() => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return
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

.nav-overlay {
  position: fixed;
  inset: 60px 0 0 0;
  background: rgba(15, 18, 24, 0.45);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: 9997;
  animation: navOverlayFadeIn 0.25s ease;
}

@keyframes navOverlayFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  /* 触控目标 ≥44px */
  padding: 0;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

/* 移动端需要 flex 布局来居中汉堡图标 */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }
}

.menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--vp-c-text-1);
  position: relative;
  transition: all 0.3s ease;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background: var(--vp-c-text-1);
  transition: all 0.3s ease;
}

.menu-icon::before {
  top: -8px;
}

.menu-icon::after {
  top: 8px;
}

.menu-icon.is-open {
  background: transparent;
}

.menu-icon.is-open::before {
  transform: rotate(45deg);
  top: 0;
}

.menu-icon.is-open::after {
  transform: rotate(-45deg);
  top: 0;
}

/* 中等屏幕（平板横屏/窄笔记本）：收紧导航间距防止挤压溢出 */
@media (min-width: 769px) and (max-width: 1100px) {
  .dynamic-navbar {
    padding: 0 24px;
  }
  .nav-links {
    gap: 18px;
  }
  .nav-links a {
    font-size: 0.78rem;
  }
  .theme-switch .label {
    display: none; /* 只留图标，省空间 */
  }
}

@media (max-width: 768px) {
  .dynamic-navbar {
    padding: 0 20px;
  }
  
  .nav-links {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);
    background: var(--vp-c-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    border-bottom: 1px solid var(--vp-c-divider);
    z-index: 9998;
  }
  
  .is-mobile-open .nav-links {
    transform: translateX(0);
  }
  
  .nav-links a {
    font-size: 1.2rem;
    font-weight: 700;
    padding: 12px 24px;
    border-radius: 12px;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }
  
  .nav-links a:hover,
  .nav-links a.active {
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
  }

  .nav-links a:active {
    transform: scale(0.97);
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
  }
  
  .theme-switch .label {
    display: none;
  }
}

@media (max-width: 480px) {
  .nav-links {
    gap: 20px;
  }
  
  .nav-links a {
    font-size: 1rem;
  }
}
</style>
