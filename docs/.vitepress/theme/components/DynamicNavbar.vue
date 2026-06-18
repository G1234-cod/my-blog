<template>
  <nav :class="['dynamic-navbar', { 'is-scrolled': isScrolled }]">
    <a href="#hero" class="nav-brand">GYX<span>.Twin</span></a>
    
    <ul class="nav-links">
      <li><a href="#hero" class="active">01 START</a></li>
      <li><a href="#stats">02 DATA</a></li>
      <li><a href="#timeline">03 HONORS</a></li>
      <li><a href="#projects">04 LABS</a></li>
      <li><a href="#hub">05 KNOWLEDGE</a></li>
      <li><a href="#contact">06 CONNECT</a></li>
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
const isDark = ref(true) // 默认为极客暗黑模式

// 检查是否滚动
const checkScroll = () => {
  const container = document.querySelector('.universe-container')
  if (container) {
    isScrolled.value = container.scrollTop > 50
  }
}

// 检查系统/VitePress 当​​前主题模式
const checkTheme = () => {
  isDark.value = document.documentElement.classList.contains('dark')
}

// 严格遵循底线：调用 native 方式切换 VitePress 主题模式
const toggleTheme = () => {
  if (typeof window !== 'undefined') {
    // 触发 VitePress 默认主题切换的逻辑，这通常是通过在 html 上切换 dark 类名
    document.documentElement.classList.toggle('dark')
    // 保存用户的选择到本地存储
    localStorage.setItem('vitepress-theme-appearance', isDark.value ? 'light' : 'dark')
    checkTheme()
  }
}

onMounted(() => {
  // 监听内部宇宙容器的滚动
  const container = document.querySelector('.universe-container')
  if (container) {
    container.addEventListener('scroll', checkScroll)
  }
  // 初始化色彩模式检查
  if (typeof window !== 'undefined') {
    checkTheme()
  }
})

onUnmounted(() => {
  const container = document.querySelector('.universe-container')
  if (container) {
    container.removeEventListener('scroll', checkScroll)
  }
})
</script>

<style scoped>
.dynamic-navbar {
  position: fixed; top: 0; left: 0; width: 100vw; height: 60px;
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 40px; z-index: 9999;
  background: transparent; transition: all 0.3s ease; box-sizing: border-box;
  font-family: monospace; /* 统一使用极客代码字体 */
}

/* 下滑后激活的亚克力状态 */
.dynamic-navbar.is-scrolled {
  /* 严格调用内置背景与边框变量 */
  background: var(--vp-c-bg-soft);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--vp-c-border);
}

.nav-brand { font-size: 1.2rem; font-weight: 800; color: var(--vp-c-text-1); text-decoration: none; }
.nav-brand span { color: var(--vp-c-brand-1); }

.nav-links { display: flex; gap: 20px; list-style: none; margin: 0; padding: 0; }
.nav-links a { color: var(--vp-c-text-2); text-decoration: none; font-size: 0.8rem; font-weight: 500; transition: color 0.2s ease; }
.nav-links a:hover, .nav-links a.active { color: var(--vp-c-brand-1); }

.nav-controls { display: flex; align-items: center; }

/* 亮度开关样式：现代、极简 */
.theme-switch {
  display: flex; align-items: center; gap: 8px; cursor: pointer;
  padding: 6px 12px; border-radius: 8px; border: 1px solid var(--vp-c-border);
  background: var(--vp-c-default-soft);
  transition: all 0.2s ease;
}
.theme-switch:hover { border-color: var(--vp-c-brand-1); }
.theme-switch .icon { font-size: 1rem; }
.theme-switch .label { font-size: 0.75rem; color: var(--vp-c-text-2); font-weight: 600; }
</style>