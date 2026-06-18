<template>
  <nav :class="['dynamic-navbar', { 'is-scrolled': isScrolled }]">
    <a href="#hero" class="nav-brand">GYX<span>.Twin</span></a>
    
    <ul class="nav-links">
      <li><a href="#hero" :class="{ active: activeSection === 'hero' }">01 START</a></li>
      <li><a href="#stats" :class="{ active: activeSection === 'stats' }">02 DATA</a></li>
      <li><a href="#timeline" :class="{ active: activeSection === 'timeline' }">03 HONORS</a></li>
      <li><a href="#projects" :class="{ active: activeSection === 'projects' }">04 LABS</a></li>
      <li><a href="#hub" :class="{ active: activeSection === 'hub' }">05 KNOWLEDGE</a></li>
      <li><a href="#contact" :class="{ active: activeSection === 'contact' }">06 CONNECT</a></li>
    </ul>

    <div class="nav-controls">
      <div class="theme-switch" @click="toggleTheme" title="色彩模式中控台">
        <span class="icon">{{ isDark ? '🌙' : '☀️' }}</span>
        <span class="label">{{ isDark ? 'DARK' : 'LIGHT' }}</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isDark = ref(true) 
const activeSection = ref('hero') // 默认激活第一屏
let observer = null // 定义滚动雷达

// 侦测是否往下滑动了（用于控制毛玻璃背景）
const checkScroll = () => {
  const container = document.querySelector('.universe-container')
  if (container) {
    isScrolled.value = container.scrollTop > 50
  }
}

// 主题模式控制
const checkTheme = () => {
  isDark.value = document.documentElement.classList.contains('dark')
}
const toggleTheme = () => {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('vitepress-theme-appearance', isDark.value ? 'light' : 'dark')
    checkTheme()
  }
}

onMounted(() => {
  const container = document.querySelector('.universe-container')
  if (container) {
    container.addEventListener('scroll', checkScroll)
  }
  if (typeof window !== 'undefined') {
    checkTheme()
  }

  // === 核心：配置交叉观察器 (雷达系统) ===
  const options = {
    root: container, // 以滚动容器为参照
    rootMargin: '0px',
    threshold: 0.5 // 当屏风有 50% 面积进入视野时触发切换
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id // 更新当前激活的屏风 ID
      }
    })
  }, options)

  // 将雷达绑定到我们六个屏风的 ID 上
  const sectionIds = ['hero', 'stats', 'timeline', 'projects', 'hub', 'contact']
  sectionIds.forEach(id => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  const container = document.querySelector('.universe-container')
  if (container) {
    container.removeEventListener('scroll', checkScroll)
  }
  if (observer) {
    observer.disconnect() // 销毁雷达，释放内存
  }
})
</script>

<style scoped>
.dynamic-navbar {
  position: fixed; top: 0; left: 0; width: 100vw; height: 60px;
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 40px; z-index: 9999;
  background: transparent; transition: all 0.3s ease; box-sizing: border-box;
  /* 恢复官方的高级无衬线字体，去除了难看的 monospace */
  font-family: var(--vp-font-family-base); 
}

.dynamic-navbar.is-scrolled {
  background: var(--vp-c-bg-soft);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--vp-c-border);
}

/* 左侧 Logo 优化 */
.nav-brand { 
  font-size: 1.3rem; 
  font-weight: 800; 
  color: var(--vp-c-text-1); 
  text-decoration: none; 
  letter-spacing: 0.5px;
}
.nav-brand span { color: var(--vp-c-brand-1); }

/* 中间导航栏优化 */
.nav-links { display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; }

.nav-links a { 
  color: var(--vp-c-text-2); 
  text-decoration: none; 
  font-size: 0.85rem; 
  font-weight: 600; /* 加粗字重，更具现代感 */
  letter-spacing: 0.5px;
  padding-bottom: 6px; /* 为底部的发光条留出空间 */
  position: relative;
  transition: color 0.3s ease; 
}

/* Hover 状态与 Active(当前屏) 状态 */
.nav-links a:hover { color: var(--vp-c-text-1); }
.nav-links a.active { color: var(--vp-c-brand-1); }

/* 炫酷的发光指示条 (仅在 active 时显示) */
.nav-links a.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--vp-c-brand-1);
  border-radius: 2px;
  box-shadow: 0 0 10px var(--vp-c-brand-1); /* 赛博发光特效 */
  animation: slideIn 0.3s ease forwards;
}

@keyframes slideIn {
  from { transform: scaleX(0); opacity: 0; }
  to { transform: scaleX(1); opacity: 1; }
}

.nav-controls { display: flex; align-items: center; }

/* 亮度开关维持极客感，仅内部数字英文使用 monospace */
.theme-switch {
  display: flex; align-items: center; gap: 8px; cursor: pointer;
  padding: 6px 12px; border-radius: 8px; border: 1px solid var(--vp-c-border);
  background: var(--vp-c-default-soft);
  transition: all 0.2s ease;
}
.theme-switch:hover { border-color: var(--vp-c-brand-1); }
.theme-switch .icon { font-size: 1rem; }
.theme-switch .label { font-size: 0.75rem; color: var(--vp-c-text-2); font-weight: 600; font-family: monospace; }
</style>