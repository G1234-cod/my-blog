<template>
  <nav :class="['dynamic-navbar', { 'is-scrolled': isScrolled }]">
    <div class="nav-brand">GYX<span>.PORTAL</span></div>
    <ul class="nav-links">
      <li><a href="#hero">系统主页</a></li>
      <li><a href="#stats">极客履历</a></li>
      <li><a href="#projects">项目矩阵</a></li>
    </ul>
    <div class="nav-controls">
      <span class="control-btn">[ OPS: NORMAL ]</span>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const checkScroll = () => {
  const container = document.querySelector('.universe-container')
  if (container) isScrolled.value = container.scrollTop > 50
}

onMounted(() => {
  const container = document.querySelector('.universe-container')
  if (container) container.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  const container = document.querySelector('.universe-container')
  if (container) container.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
.dynamic-navbar {
  position: fixed; top: 0; left: 0; width: 100vw; height: 60px;
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 40px; z-index: 9999;
  background: transparent; transition: all 0.3s ease; box-sizing: border-box;
}
.dynamic-navbar.is-scrolled {
  /* 严格调用内置背景与边框变量 */
  background: var(--vp-c-bg-soft);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--vp-c-divider);
}
.nav-brand { font-size: 1.2rem; font-weight: 800; color: var(--vp-c-text-1); }
.nav-brand span { color: var(--vp-c-brand-1); }
.nav-links { display: flex; gap: 30px; list-style: none; margin: 0; }
.nav-links a { color: var(--vp-c-text-2); text-decoration: none; font-weight: 500; transition: color 0.2s ease; }
.nav-links a:hover { color: var(--vp-c-brand-1); }
.nav-controls { color: var(--vp-c-text-2); font-size: 0.8rem; font-family: monospace; }
</style>