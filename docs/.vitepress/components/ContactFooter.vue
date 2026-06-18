<script setup>
import { ref } from 'vue'

const contactInfo = ref({
  email: 'dev@cyberdev.io',
  phone: '+86 195-6252-3965',
  location: 'Shanghai, China',
  github: 'https://github.com/CyberDev',
  linkedin: 'https://linkedin.com/in/cyberdev'
})

const socialLinks = ref([
  { name: 'GitHub', icon: '🐙', url: contactInfo.value.github },
  { name: 'LinkedIn', icon: '💼', url: contactInfo.value.linkedin },
  { name: 'Twitter', icon: '🐦', url: '#' },
  { name: 'Medium', icon: '📖', url: '#' }
])

const isEmailHovered = ref(false)
</script>

<template>
  <div class="contact-container">
    <!-- 装饰背景 -->
    <div class="contact-bg">
      <div class="bg-ring bg-ring-1"></div>
      <div class="bg-ring bg-ring-2"></div>
      <div class="bg-ring bg-ring-3"></div>
    </div>

    <div class="contact-content">
      <h2 class="section-title">
        <span class="title-icon">✉️</span>
        GET IN TOUCH
      </h2>

      <!-- 主卡片 -->
      <div class="contact-card glass-effect">
        <div class="contact-header">
          <div class="avatar-wrapper">
            <div class="contact-avatar">
              <span>👨‍💻</span>
            </div>
          </div>
          <h3 class="contact-name">CYBERDEV</h3>
          <p class="contact-title">Full-Stack Architect & AI Engineer</p>
        </div>

        <div class="contact-info">
          <div class="info-item">
            <span class="info-icon">📧</span>
            <a 
              :href="'mailto:' + contactInfo.email"
              class="info-link"
              @mouseenter="isEmailHovered = true"
              @mouseleave="isEmailHovered = false"
            >
              <span :class="{ 'email-highlight': isEmailHovered }">{{ contactInfo.email }}</span>
            </a>
          </div>
          <div class="info-item">
            <span class="info-icon">📱</span>
            <span class="info-text">{{ contactInfo.phone }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">📍</span>
            <span class="info-text">{{ contactInfo.location }}</span>
          </div>
        </div>

        <!-- 社交链接 -->
        <div class="social-links">
          <a 
            v-for="social in socialLinks" 
            :key="social.name"
            :href="social.url"
            class="social-link"
            :title="social.name"
          >
            <span class="social-icon">{{ social.icon }}</span>
          </a>
        </div>

        <!-- 行动按钮 -->
        <div class="contact-actions">
          <a href="/Guanyunxiang_Resume_AI.pdf" class="btn btn-primary" download>
            <span>📋 Download Resume</span>
          </a>
          <a :href="'mailto:' + contactInfo.email" class="btn btn-secondary">
            <span>💌 Send Email</span>
          </a>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="footer-copyright">
        <p>&copy; 2024 CYBERDEV. All rights reserved.</p>
        <p class="copyright-sub">Built with Vue 3 & VitePress</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  width: 100%;
  padding: 2rem 0;
  position: relative;
}

.contact-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
}

.bg-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(37, 99, 235, 0.1);
}

.bg-ring-1 {
  width: 300px;
  height: 300px;
  top: 20%;
  right: 10%;
  animation: ringFloat 8s ease-in-out infinite;
}

.bg-ring-2 {
  width: 200px;
  height: 200px;
  bottom: 30%;
  left: 5%;
  animation: ringFloat 10s ease-in-out infinite reverse;
}

.bg-ring-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ringFloat 6s ease-in-out infinite;
  animation-delay: 1s;
}

@keyframes ringFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(180deg); }
}

.contact-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
  margin-bottom: 1.5rem;
  letter-spacing: 0.1em;
}

.title-icon {
  margin-right: 0.5rem;
}

.contact-card {
  padding: 2rem;
  border-radius: 1.5rem;
  text-align: center;
  max-width: 450px;
  width: 100%;
}

.contact-header {
  margin-bottom: 1.5rem;
}

.avatar-wrapper {
  margin-bottom: 1rem;
}

.contact-avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
}

.contact-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
}

.contact-title {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
}

.info-icon {
  font-size: 1rem;
}

.info-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: all 0.2s ease;
}

.info-link:hover {
  text-decoration: underline;
}

.email-highlight {
  text-shadow: 0 0 10px var(--vp-c-brand-1);
}

.info-text {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.social-link {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-link:hover {
  background: rgba(37, 99, 235, 0.2);
  transform: translateY(-3px);
}

.social-icon {
  font-size: 1.25rem;
}

.contact-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
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

.footer-copyright {
  margin-top: 2rem;
  text-align: center;
}

.footer-copyright p {
  margin: 0.25rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.copyright-sub {
  font-size: 0.75rem !important;
}

@media (max-width: 640px) {
  .contact-card {
    padding: 1.5rem;
    margin: 0 1rem;
  }
  
  .contact-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>