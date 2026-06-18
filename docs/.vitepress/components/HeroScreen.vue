<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const scrollToNext = () => {
  const nextSection = document.getElementById('screen-stats')
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="hero-container" :class="{ 'hero-visible': isVisible }">
    <!-- 背景装饰 -->
    <div class="hero-bg">
      <div class="bg-circle bg-circle-1"></div>
      <div class="bg-circle bg-circle-2"></div>
      <div class="bg-circle bg-circle-3"></div>
    </div>

    <!-- 主卡片 -->
    <div class="hero-card glass-effect">
      <div class="hero-avatar">
        <div class="avatar-inner">
          <span class="avatar-emoji">👨‍💻</span>
        </div>
        <div class="avatar-ring"></div>
      </div>
      
      <h1 class="hero-title">
        <span class="title-text">CYBER<span class="title-accent">DEV</span></span>
      </h1>
      
      <p class="hero-subtitle">Full-Stack Architect & AI Engineer</p>
      
      <p class="hero-slogan">
        Building the future with <span class="slogan-highlight">code</span> and <span class="slogan-highlight">intelligence</span>
      </p>

      <div class="hero-tags">
        <span class="tag">Python</span>
        <span class="tag">Vue.js</span>
        <span class="tag">LLM</span>
        <span class="tag">DevOps</span>
      </div>

      <div class="hero-actions">
        <button class="btn btn-primary">
          <span>🚀 EXPLORE</span>
        </button>
        <button class="btn btn-secondary">
          <span>📋 RESUME</span>
        </button>
      </div>
    </div>

    <!-- 向下箭头 -->
    <button class="scroll-hint" @click="scrollToNext">
      <div class="arrow">↓</div>
    </button>
  </div>
</template>

<style scoped>
.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
}

.hero-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%);
}

.bg-circle-1 {
  width: 400px;
  height: 400px;
  top: 10%;
  right: 10%;
  animation: float 6s ease-in-out infinite;
}

.bg-circle-2 {
  width: 300px;
  height: 300px;
  bottom: 20%;
  left: 5%;
  animation: float 8s ease-in-out infinite reverse;
}

.bg-circle-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float 10s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.hero-card {
  position: relative;
  z-index: 10;
  padding: 3rem;
  border-radius: 1.5rem;
  text-align: center;
  max-width: 500px;
  width: 100%;
  animation: cardAppear 0.6s ease-out 0.3s both;
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.hero-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
}

.avatar-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-emoji {
  font-size: 3.5rem;
}

.avatar-ring {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-brand-1);
  opacity: 0.5;
  animation: ringPulse 2s ease-out infinite;
}

@keyframes ringPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0;
  }
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem;
}

.title-text {
  color: var(--vp-c-text-1);
}

.title-accent {
  color: var(--vp-c-brand-1);
  text-shadow: 
    0 0 10px var(--vp-c-brand-1),
    0 0 20px rgba(37, 99, 235, 0.5);
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin: 0 0 1rem;
  font-weight: 500;
}

.hero-slogan {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin: 0 0 1.5rem;
  line-height: 1.6;
}

.slogan-highlight {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  padding: 0.375rem 0.875rem;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 2rem;
  font-size: 0.875rem;
  color: var(--vp-c-brand-1);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.75rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 4px 15px rgba(37, 99, 235, 0.3),
    0 0 20px rgba(37, 99, 235, 0.2);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: var(--vp-c-brand-1);
}

.scroll-hint {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  animation: hintBreathe 2s ease-in-out infinite;
}

@keyframes hintBreathe {
  0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
  50% { opacity: 1; transform: translateX(-50%) translateY(8px); }
}

.arrow {
  font-size: 2rem;
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .hero-card {
    padding: 2rem;
    margin: 0 1rem;
  }
  
  .hero-title {
    font-size: 1.75rem;
  }
  
  .hero-avatar {
    width: 100px;
    height: 100px;
  }
  
  .avatar-emoji {
    font-size: 2.5rem;
  }
}
</style>