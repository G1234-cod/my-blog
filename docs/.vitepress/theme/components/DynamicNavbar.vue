<template>
  <nav :class="['dynamic-navbar', { 'is-scrolled': isScrolled }]">
    <a href="#hero" class="nav-brand">GYX<span>.Dev</span></a>
    
    <ul class="nav-links">
      <li><a href="#hero" :class="{ active: activeSection === 'hero' }">01 START</a></li>
      <li><a href="#stats" :class="{ active: activeSection === 'stats' }">02 DATA</a></li>
      <li><a href="#timeline" :class="{ active: activeSection === 'timeline' }">03 HONORS</a></li>
      <li><a href="#projects" :class="{ active: activeSection === 'projects' }">04 LABS</a></li>
      <li><a href="#hub" :class="{ active: activeSection === 'hub' }">05 KNOWLEDGE</a></li>
      <li><a href="#contact" :class="{ active: activeSection === 'contact' }">06 CONNECT</a></li>
    </ul>

    <div class="nav-controls">
      <div class="theme-switch" @click="toggleTheme" title="切换显示模式">
        <span class="icon">{{ isDark ? '🌙' : '☀️' }}</span>
        <span class="label">{{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress' // 核心修复：引入 VitePress 官方数据钩子

const { isDark } = useData() // 官方变量，直接接管全局亮暗
const isScrolled = ref(false)
const activeSection = ref('hero') 
let observer = null 

const checkScroll = () => {
  const container = document.querySelector('.universe-container')
  if (container) {
    isScrolled.value = container.scrollTop > 50
  }
}

// 核心修复：使用官方变量取反，100% 触发网站变亮/变暗
const toggleTheme = () => {
  isDark.value = !isDark.value 
}

onMounted(() => {
  const container = document.querySelector('.universe-container')
  if (container) {
    container.addEventListener('scroll', checkScroll)
  }

  // 核心修复：将雷达判定区域缩小至屏幕正中央（极其灵敏）
  const options = {
    root: container,
    rootMargin: '-40% 0px -40% 0px', // 只有当元素滑过屏幕中间 20% 的高度时才触发
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id 
      }
    })
  }, options)

  const sectionIds = ['hero', 'stats', 'timeline', 'projects', 'hub', 'contact']
  // 延迟绑定，确保 DOM 已经完全渲染
  setTimeout(() => {
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  }, 100)
})

onUnmounted(() => {
  const container = document.querySelector('.universe-container')
  if (container) {
    container.removeEventListener('scroll', checkScroll)
  }
  if (observer) {
    observer.disconnect() 
  }
})
</script>

<style scoped>
.dynamic-navbar {
  position: fixed; top: 0; left: 0; width: 100vw; height: 60px;
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 40px; z-index: 9999;
  background: transparent; transition: all 0.3s ease; box-sizing: border-box;
  font-family: var(--vp-font-family-base); 
}

.dynamic-navbar.is-scrolled {
  background: var(--vp-c-bg-soft);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--vp-c-border);
}

.nav-brand { font-size: 1.3rem; font-weight: 800; color: var(--vp-c-text-1); text-decoration: none; letter-spacing: 0.5px; }
.nav-brand span { color: var(--vp-c-brand-1); }

.nav-links { display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; }
.nav-links a { 
  color: var(--vp-c-text-2); text-decoration: none; font-size: 0.85rem; 
  font-weight: 600; letter-spacing: 0.5px; padding-bottom: 6px; 
  position: relative; transition: color 0.3s ease; 
}
.nav-links a:hover { color: var(--vp-c-text-1); }
.nav-links a.active { color: var(--vp-c-brand-1); }

.nav-links a.active::after {
  content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px;
  background: var(--vp-c-brand-1); border-radius: 2px;
  box-shadow: 0 0 10px var(--vp-c-brand-1); 
  animation: slideIn 0.3s ease forwards;
}

@keyframes slideIn {
  from { transform: scaleX(0); opacity: 0; }
  to { transform: scaleX(1); opacity: 1; }
}

.nav-controls { display: flex; align-items: center; }

.theme-switch {
  display: flex; align-items: center; gap: 8px; cursor: pointer;
  padding: 6px 14px; border-radius: 8px; border: 1px solid var(--vp-c-border);
  background: var(--vp-c-default-soft);
  transition: all 0.2s ease;
}
.theme-switch:hover { border-color: var(--vp-c-brand-1); }
.theme-switch .icon { font-size: 1.1rem; }
/* 核心修复：去掉了 monospace 字体，使用系统原生极简粗体 */
.theme-switch .label { font-size: 0.8rem; color: var(--vp-c-text-1); font-weight: 700; letter-spacing: 0.5px;}
</style>