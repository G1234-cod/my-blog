<template>
  <nav :class="['dynamic-navbar', { 'is-scrolled': isScrolled }]">
    <a href="#" class="nav-brand">GYX<span>.Dev</span></a>
    
    <ul class="nav-links">
      <li><a href="#hero" :class="{ active: activeSection === 'hero' }">01 START</a></li>
      <li><a href="#stats" :class="{ active: activeSection === 'stats' }">02 DATA</a></li>
      <li><a href="#timeline" :class="{ active: activeSection === 'timeline' }">03 HONORS</a></li>
      <li><a href="#projects" :class="{ active: activeSection === 'projects' }">04 LABS</a></li>
      <li><a href="#hub" :class="{ active: activeSection === 'hub' }">05 KNOWLEDGE</a></li>
      <li><a href="#contact" :class="{ active: activeSection === 'contact' }">06 CONNECT</a></li>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const isScrolled = ref(false)
const activeSection = ref('hero') 
let observer = null 
let scrollContainer = null

// 修复：直接操作 VitePress 的主题状态
const toggleTheme = () => {
  const html = document.documentElement
  const currentTheme = html.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  
  html.setAttribute('data-theme', newTheme)
  localStorage.setItem('vitepress-theme-appearance', newTheme)
}

// 修复：更可靠的滚动检测
const handleScroll = () => {
  if (scrollContainer) {
    isScrolled.value = scrollContainer.scrollTop > 50
  } else {
    isScrolled.value = window.scrollY > 50
  }
}

onMounted(() => {
  // 获取滚动容器
  scrollContainer = document.querySelector('.universe-container')
  
  // 绑定滚动事件
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
  } else {
    window.addEventListener('scroll', handleScroll, { passive: true })
  }

  // 创建交叉观察器 - 检测当前可视区域的屏风
  const options = {
    root: scrollContainer || null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, options)

  // 延迟绑定，确保 DOM 已完全渲染
  setTimeout(() => {
    const sectionIds = ['hero', 'stats', 'timeline', 'projects', 'hub', 'contact']
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  }, 200)
})

onUnmounted(() => {
  // 清理滚动事件
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handleScroll)
  } else {
    window.removeEventListener('scroll', handleScroll)
  }
  
  // 销毁观察器
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
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
