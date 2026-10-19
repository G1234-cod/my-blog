<template>
  <section class="ed-section" id="selected-reading">
    <SectionHead
      tag="02 / SELECTED READING"
      title="精选阅读"
      sub="技术实战、学习笔记与论文精读中的代表作。"
    />

    <div class="read-list">
      <a v-for="p in featuredReads" :key="p.url" class="read-row" :href="p.url">
        <div class="read-main">
          <span class="read-title">{{ p.title }}</span>
          <span class="read-desc">{{ p.desc }}</span>
        </div>
        <span class="read-module mono">{{ p.module }}</span>
      </a>
    </div>

    <p class="more-link">
      <a href="/writing/">进入写作索引 →</a>
    </p>
  </section>
</template>

<script setup>
import { featuredReads } from '../featured-reads.mjs'
import SectionHead from './SectionHead.vue'
</script>

<style scoped>
.ed-section {
  padding: 64px 0;
}
/* 编辑部列表：分隔线 + 摘要，不用卡片 */
.read-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--vp-c-divider);
}
.read-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 4px;
  border-bottom: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out);
}
.read-row:hover {
  background-color: var(--vp-c-bg-soft);
}
.read-main {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}
.read-title {
  font-size: 1.02rem;
  font-weight: 600;
  line-height: 1.55;
  color: var(--vp-c-text-1);
  transition: color var(--duration-fast) var(--ease-out);
}
.read-row:hover .read-title {
  color: var(--vp-c-brand-1);
}
.read-desc {
  font-size: 0.88rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}
.read-module {
  flex-shrink: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 2px 9px;
}
.more-link {
  margin: 24px 0 0;
}
.more-link a {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.more-link a:hover {
  text-decoration: underline;
}
@media (max-width: 768px) {
  .ed-section {
    padding: 44px 0;
  }
  .read-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
