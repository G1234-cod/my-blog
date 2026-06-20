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

    <div class="hero-media" v-if="coverImage">
      <img :src="coverImage" alt="Project Cover" class="cover-img" />
      </div>

  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
  date: String,
  role: String,
  honors: Array,
  coverImage: String
})
</script>

<style scoped>
/* 整个头部的容器，去除多余内边距 */
.portfolio-hero {
  padding: 40px 0 60px 0;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

/* 巨型标题排版 */
.hero-header {
  text-align: left;
}
.p-title {
  font-size: 4.5rem; /* 极其夸张的大标题 */
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

/* 数据网格 (TIME, ROLE, HONORS) */
.meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr; /* 按照 1:1:2 的比例划分，给荣誉留更多空间 */
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
  color: #e5b567; /* 参考图那种暗金色的荣誉文字 */
  font-size: 1.05rem;
  margin-bottom: 8px;
}
.honor-icon {
  margin-right: 6px;
}

/* 封面大图 */
.hero-media {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  background: #111;
}
.cover-img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}
.hero-media:hover .cover-img {
  transform: scale(1.02);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .p-title { font-size: 2.8rem; }
  .meta-grid { grid-template-columns: 1fr; gap: 24px; }
}
</style>