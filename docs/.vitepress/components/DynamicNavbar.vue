<template>
  <nav :class="['dynamic-navbar', { 'is-scrolled': isScrolled }]">
    <div class="nav-brand">GYX<span>.PORTAL</span></div>
    <ul class="nav-links">
      <li><a href="#hero">系统主页</a></li>
      <li><a href="#stats">极客履历</a></li>
      <li><a href="#projects">项目矩阵</a></li>
    </ul>
    <div class="nav-controls">
      <span class="control-btn">[ SOUND: OFF ]</span>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const checkScroll = () => {
  // 核心：必须监听 universe-container 的滚动，而不是 window
  const container = document.querySelector('.universe-container')
  if (container) {
    isScrolled.value = container.scrollTop > 50
  }
}

onMounted(() => {
  const container = document.querySelector('.universe-container')
  if (container) {
    container.addEventListener('scroll', checkScroll)
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  z-index: 9999; /* 必须极高，压住下面所有屏风 */
  background: transparent;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

/* 下滑后激活的毛玻璃状态 */
.dynamic-navbar.is-scrolled {
  background: rgba(9, 9, 11, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-brand {
  font-size: 1.2rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: 1px;
}
.nav-brand span {
  color: var(--vp-c-brand-1);
}

.nav-links {
  display: flex;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #fff;
}

.nav-controls {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  font-family: monospace;
  cursor: pointer;
}
</style>