<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isDarkMode = ref(false)

const navItems = [
  { id: 'screen-hero', label: 'HOME', icon: '🏠' },
  { id: 'screen-stats', label: 'STATS', icon: '📊' },
  { id: 'screen-timeline', label: 'TIMELINE', icon: '⏱️' },
  { id: 'screen-projects', label: 'PROJECTS', icon: '💻' },
  { id: 'screen-hub', label: 'HUB', icon: '🔗' },
  { id: 'screen-contact', label: 'CONTACT', icon: '✉️' }
]

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

let scrollContainer = null

const handleScroll = () => {
  isScrolled.value = (scrollContainer?.scrollTop ?? window.scrollY) > 50
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark')
}

onMounted(() => {
  // 优先监听 universe-container，回退到 window
  scrollContainer = document.querySelector('.universe-container')
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
  } else {
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onUnmounted(() => {
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handleScroll)
  } else {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <nav 
    class="navbar"
    :class="{ 'navbar-scrolled': isScrolled }"
  >
    <div class="navbar-content">
      <!-- Logo -->
      <div class="navbar-logo" @click="scrollToSection('screen-hero')">
        <span class="logo-icon">⟨/⟩</span>
        <span class="logo-text">DEV<span class="logo-accent">PORTAL</span></span>
      </div>

      <!-- Navigation Items -->
      <div class="navbar-nav">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="nav-item"
          @click="scrollToSection(item.id)"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </button>
      </div>

      <!-- Actions -->
      <div class="navbar-actions">
        <button class="action-btn" @click="toggleDarkMode">
          <span>{{ isDarkMode ? '☀️' : '🌙' }}</span>
        </button>
        <button class="action-btn">
          <span>🎵</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0.75rem 2rem;
  transition: all 0.3s ease;
}

.navbar-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .navbar-scrolled {
  background: rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.05);
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.logo-icon {
  font-size: 1.5rem;
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.logo-accent {
  color: var(--vp-c-brand-1);
}

.navbar-nav {
  display: flex;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--vp-c-text-1);
}

.navbar-scrolled .nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-icon {
  font-size: 0.75rem;
}

.nav-label {
  letter-spacing: 0.05em;
}

.navbar-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.5rem 1rem;
  }
  
  .nav-label {
    display: none;
  }
  
  .nav-item {
    padding: 0.5rem;
  }
}
</style>