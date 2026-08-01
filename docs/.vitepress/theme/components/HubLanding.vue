<template>
  <div class="hub-landing">
    <!-- Hero 区：模块图标 + 标题 + 简介 + 文章数徽章 -->
    <header class="hub-hero">
      <div class="hub-icon" aria-hidden="true">{{ fm.icon }}</div>
      <div class="hub-hero-text">
        <div v-if="fm.subtitle" class="hub-eyebrow">{{ fm.subtitle }}</div>
        <h1 class="hub-title">{{ fm.title }}</h1>
        <p v-if="fm.description" class="hub-desc">{{ fm.description }}</p>
        <div class="hub-badges">
          <span class="badge">📚 {{ articleCount }} 篇已归档</span>
        </div>
      </div>
    </header>

    <!-- 核心技术栈矩阵 -->
    <section v-if="fm.techStack && fm.techStack.length" class="hub-section">
      <h2 class="section-title">{{ fm.techTitle || '🎯 核心技术栈' }}</h2>
      <div class="tech-grid">
        <div v-for="t in fm.techStack" :key="t.label" class="tech-card">
          <div class="tech-label">{{ t.label }}</div>
          <div class="tech-value">{{ t.value }}</div>
        </div>
      </div>
    </section>

    <!-- 知识轨道（每条轨道：标题 + 说明 + 要点/文章链接） -->
    <section v-if="fm.tracks && fm.tracks.length" class="hub-section">
      <h2 class="section-title">📚 知识导航</h2>
      <div class="track-grid">
        <article v-for="tr in fm.tracks" :key="tr.title" class="track-card">
          <header class="track-head">
            <span class="track-icon" aria-hidden="true">{{ tr.icon }}</span>
            <h3 class="track-title">{{ tr.title }}</h3>
          </header>
          <p v-if="tr.desc" class="track-desc">{{ tr.desc }}</p>
          <ul v-if="tr.points && tr.points.length" class="track-points">
            <li v-for="(p, i) in tr.points" :key="i" v-html="mdBold(p)" />
          </ul>
          <ul v-if="tr.links && tr.links.length" class="track-links">
            <li v-for="l in tr.links" :key="l.href">
              <a :href="l.href" class="track-link">
                <span class="link-text">{{ l.text }}</span>
                <span class="link-arrow">→</span>
              </a>
            </li>
          </ul>
          <p v-if="tr.note" class="track-note">{{ tr.note }}</p>
        </article>
      </div>
    </section>

    <!-- 文末格言 -->
    <footer v-if="fm.quote" class="hub-quote">
      <span class="quote-icon" aria-hidden="true">💡</span>
      <em>“{{ fm.quote }}”</em>
    </footer>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter, theme } = useData()
const fm = computed(() => frontmatter.value || {})

// 📊 文章数徽章：递归统计本模块 sidebar 中的文章总数（排除知识中枢自链）
const articleCount = computed(() => {
  const key = fm.value.sidebarKey
  const items = (key && theme.value.sidebar?.[key]) || []
  const count = (list) =>
    list.reduce((sum, i) => {
      if (i.items && i.items.length) return sum + count(i.items)
      if (i.link && !i.link.startsWith('/hub/')) return sum + 1
      return sum
    }, 0)
  return count(items)
})

// 轻量加粗转换：让 frontmatter 里的 **重点** 以 <strong> 呈现（静态自有文案，无 XSS 风险）
const mdBold = (s) => String(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
</script>

<style scoped>
.hub-landing {
  max-width: 1080px;
  margin: 0 auto;
  padding: 48px 24px 72px;
}

/* —— Hero 区 —— */
.hub-hero {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 36px 40px;
  border-radius: 16px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  box-shadow: var(--vp-shadow-2);
}
.hub-icon {
  font-size: 3.2rem;
  line-height: 1;
  flex-shrink: 0;
  filter: drop-shadow(0 4px 14px var(--vp-brand-glow));
}
.hub-eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--vp-c-brand-1);
  margin-bottom: 8px;
}
.hub-title {
  margin: 0 0 12px;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  line-height: 1.3;
  color: var(--vp-c-text-1);
}
.hub-desc {
  margin: 0 0 16px;
  font-size: 1.02rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}
.hub-badges {
  display: flex;
  gap: 10px;
}
.badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-3);
}

/* —— 分区标题 —— */
.hub-section {
  margin-top: 48px;
}
.section-title {
  position: relative;
  margin: 0 0 20px;
  padding-left: 16px;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--vp-c-text-1);
}
.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 12%;
  height: 76%;
  width: 5px;
  border-radius: 4px;
  background-color: var(--vp-c-brand-1);
}

/* —— 技术栈矩阵 —— */
.tech-grid {
  display: grid;
  /* min() 兜底：窄屏（如 320px 手机）内容区不足 260px 时收缩为 100%，防止横向溢出 */
  grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));
  gap: 14px;
}
.tech-card {
  padding: 16px 20px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  box-shadow: var(--vp-shadow-1);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}
.tech-card:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 10px 24px var(--vp-brand-glow);
}
.tech-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}
.tech-value {
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

/* —— 知识轨道卡片 —— */
.track-grid {
  display: grid;
  /* min() 兜底：窄屏内容区不足 320px 时收缩为 100%，防止横向溢出 */
  grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
  gap: 18px;
}
.track-card {
  display: flex;
  flex-direction: column;
  padding: 22px 24px;
  border-radius: 14px;
  background-color: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  box-shadow: var(--vp-shadow-1);
  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
}
.track-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 14px 30px var(--vp-brand-glow);
}
.track-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.track-icon {
  font-size: 1.3rem;
}
.track-title {
  margin: 0;
  font-size: 1.08rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: var(--vp-c-text-1);
}
.track-desc {
  margin: 0 0 10px;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
.track-points {
  margin: 0 0 6px;
  padding-left: 18px;
}
.track-points li {
  margin-bottom: 6px;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
.track-points :deep(strong) {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}
.track-links {
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
}
.track-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 12px;
  margin-bottom: 6px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  text-decoration: none !important;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid transparent;
  transition: all 0.2s ease;
}
.track-link:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}
.link-arrow {
  flex-shrink: 0;
  color: var(--vp-c-text-3);
  transition: transform 0.2s ease, color 0.2s ease;
}
.track-link:hover .link-arrow {
  transform: translateX(3px);
  color: var(--vp-c-brand-1);
}
.track-note {
  margin: 10px 0 0;
  font-size: 0.82rem;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}

/* —— 文末格言 —— */
.hub-quote {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 56px;
  padding: 20px 28px;
  border-radius: 12px;
  border-left: 4px solid var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-text-1);
  font-size: 1.02rem;
  letter-spacing: 0.5px;
}
.quote-icon {
  font-size: 1.1rem;
}

/* —— 移动端适配 —— */
@media (max-width: 640px) {
  .hub-landing {
    padding: 28px 16px 56px;
  }
  .hub-hero {
    flex-direction: column;
    padding: 26px 22px;
    gap: 16px;
  }
  .hub-title {
    font-size: 1.6rem;
  }
}
</style>
