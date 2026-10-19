<template>
  <section class="ed-section" id="selected-work">
    <SectionHead
      tag="01 / SELECTED WORK"
      title="精选作品"
      sub="从工业诊断到已上线小程序——每个项目都是一次「问题 → 架构 → 落地」的完整推演。"
    />

    <div class="work-list">
      <article v-for="(p, i) in featured" :key="p.slug" class="work-item">
        <p class="work-index mono">{{ String(i + 1).padStart(2, '0') }}</p>
        <div class="work-body">
          <h3 class="work-title">
            <a :href="`/projects/${p.slug}`">{{ p.title }}</a>
          </h3>
          <p class="work-meta">
            <span v-if="p.badge" class="work-badge" :data-type="p.badge.type">{{ p.badge.icon }} {{ p.badge.text }}</span>
            <span v-for="t in p.tags" :key="t" class="work-tag mono">{{ t }}</span>
          </p>
          <p class="work-desc">{{ p.desc }}</p>
          <a class="work-link mono" :href="`/projects/${p.slug}`">阅读项目复盘 →</a>
        </div>
      </article>
    </div>

    <p class="more-link">
      <a href="/projects/">查看全部 {{ projects.length }} 个作品 →</a>
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { projects } from '../projects.mjs'
import SectionHead from './SectionHead.vue'

const featured = computed(() => projects.slice(0, 3))
</script>

<style scoped>
.ed-section {
  padding: 64px 0;
}
.work-list {
  display: flex;
  flex-direction: column;
}
.work-item {
  display: flex;
  gap: 28px;
  padding: 28px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.work-item:first-child {
  border-top: 1px solid var(--vp-c-divider);
}
.work-index {
  margin: 4px 0 0;
  flex-shrink: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-3);
}
.work-body {
  min-width: 0;
}
.work-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.35;
}
.work-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}
.work-title a:hover {
  color: var(--vp-c-brand-1);
}
.work-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin: 10px 0 0;
}
.work-badge {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.work-badge[data-type='gold'] {
  color: #a16207;
}
.work-badge[data-type='emerald'] {
  color: var(--vp-c-brand-1);
}
.work-tag {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 2px 9px;
}
.work-desc {
  margin: 12px 0 0;
  max-width: 72ch;
  font-size: 0.98rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}
.work-link {
  display: inline-block;
  margin-top: 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  letter-spacing: 0.05em;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.work-link:hover {
  text-decoration: underline;
}
.more-link {
  margin: 26px 0 0;
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
  .work-item {
    gap: 14px;
  }
  .work-title {
    font-size: 1.22rem;
  }
}
</style>
