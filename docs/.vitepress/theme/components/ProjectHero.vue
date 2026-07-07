<template>
  <div class="portfolio-hero">
    
    <div class="hero-header">
      <h1 class="p-title">{{ title }}</h1>
      <p class="p-subtitle">{{ subtitle }}</p>
    </div>

    <div class="meta-grid">
      <div class="meta-col">
        <span class="meta-label">TIME</span>
        <span class="meta-value">{{ date }}</span>
      </div>
      <div class="meta-col">
        <span class="meta-label">ROLE</span>
        <span class="meta-value" v-html="role.replace(' & ', '<br>')"></span>
      </div>
      <div class="meta-col honors-col">
        <span class="meta-label">HONORS</span>
        <div class="meta-value honors">
          <div v-for="honor in honors" :key="honor" class="honor-item">
            <span class="honor-icon">🏆</span> {{ honor }}
          </div>
        </div>
      </div>
    </div>

    <div class="hero-media">
      <slot></slot>
    </div>

  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
  date: String,
  role: String,
  honors: Array
})
</script>

<style scoped>
.portfolio-hero {
  padding: 40px 0 60px 0;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.hero-header {
  text-align: left;
}
.p-title {
  font-size: clamp(2.5rem, 8vw, 4.5rem); 
  font-weight: 900;
  line-height: 1.1;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  letter-spacing: -2px;
}
.p-subtitle {
  font-family: monospace;
  font-size: 1.1rem;
  color: var(--vp-c-brand-1);
  letter-spacing: 4px;
  text-transform: uppercase;
}

.meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr; 
  gap: 40px;
  padding-bottom: 40px;
}
.meta-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.meta-label {
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  letter-spacing: 2px;
}
.meta-value {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}
.honor-item {
  color: #e5b567; 
  font-size: 1.05rem;
  margin-bottom: 8px;
}
.honor-icon {
  margin-right: 6px;
}

.hero-media {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  background: #111;
}

/* 🔥 核心修复：当插槽里没放图片时，自动折叠消失，消灭空白！ */
.hero-media:empty {
  display: none;
}

.hero-media :deep(img) {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
  margin: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}
.hero-media:hover :deep(img) {
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .p-title { font-size: clamp(2rem, 6vw, 2.8rem); }
  .meta-grid { grid-template-columns: 1fr; gap: 24px; }
}

@media (max-width: 480px) {
  .p-title { font-size: clamp(1.6rem, 5vw, 2.2rem); }
  .portfolio-hero { gap: 40px; padding: 30px 0 40px 0; }
  .meta-grid { gap: 16px; padding-bottom: 20px; }
}
</style>