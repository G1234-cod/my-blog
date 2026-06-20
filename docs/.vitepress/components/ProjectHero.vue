<template>
  <div class="project-hero">
    <div class="hero-bg-glow"></div>
    <div class="hero-content">
      <div class="project-meta">
        <span class="meta-item date">{{ date }}</span>
        <span class="meta-item role">{{ role }}</span>
      </div>
      
      <h1 class="project-title">{{ title }}</h1>
      <p class="project-desc">{{ desc }}</p>
      
      <div class="tech-stack">
        <span v-for="tech in tags" :key="tech" class="tech-tag">{{ tech }}</span>
      </div>

      <div v-if="github || link" class="action-links">
        <a v-if="github" :href="github" target="_blank" class="btn outline-btn">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          查看源码
        </a>
        <a v-if="link" :href="link" target="_blank" class="btn primary-btn">
          访问系统
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  desc: String,
  date: String,
  role: String,
  tags: Array,
  github: String,
  link: String
})
</script>

<style scoped>
.project-hero {
  position: relative;
  padding: 60px 0 80px 0;
  margin-bottom: 40px;
  border-bottom: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.hero-bg-glow {
  position: absolute;
  top: -50px; left: 10%;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(100, 108, 255, 0.15) 0%, rgba(0,0,0,0) 70%);
  filter: blur(40px);
  z-index: 0;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.project-meta {
  display: flex; gap: 20px;
  font-family: monospace; font-size: 0.9rem;
  color: var(--vp-c-brand-1); margin-bottom: 24px;
  letter-spacing: 1px; text-transform: uppercase;
}

.project-title {
  font-size: 3.5rem; font-weight: 800; line-height: 1.2;
  margin-bottom: 20px; color: var(--vp-c-text-1);
  letter-spacing: -1px;
}

.project-desc {
  font-size: 1.25rem; color: var(--vp-c-text-2);
  line-height: 1.6; max-width: 800px; margin-bottom: 30px;
}

.tech-stack {
  display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 40px;
}

.tech-tag {
  padding: 6px 16px; border-radius: 20px;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border);
  font-size: 0.85rem; font-weight: 600; color: var(--vp-c-text-2);
}

.action-links { display: flex; gap: 16px; }

.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 24px; border-radius: 8px; font-weight: 600;
  font-size: 0.95rem; text-decoration: none !important;
  transition: all 0.2s; cursor: pointer;
}

.outline-btn {
  background: transparent; color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
}
.outline-btn:hover { border-color: var(--vp-c-text-1); background: var(--vp-c-bg-soft); }

.primary-btn {
  background: var(--vp-c-brand-1); color: #fff;
  border: 1px solid var(--vp-c-brand-1); box-shadow: 0 4px 12px rgba(100, 108, 255, 0.3);
}
.primary-btn:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 6px 16px rgba(100, 108, 255, 0.4); }

@media (max-width: 768px) {
  .project-title { font-size: 2.5rem; }
  .project-desc { font-size: 1.1rem; }
}
</style>