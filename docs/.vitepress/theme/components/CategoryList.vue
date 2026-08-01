<template>
  <div class="category-list">
    <!-- 顶层直达链接（如「🌟 知识中枢」）：渲染为横幅入口卡 -->
    <div v-if="topLinks.length" class="top-links">
      <a v-for="l in topLinks" :key="l.link" :href="l.link" class="top-link-card">
        <span class="top-link-text">{{ l.text }}</span>
        <span class="top-link-arrow">→</span>
      </a>
    </div>

    <!-- 分组卡片矩阵 -->
    <div v-for="(group, index) in groups" :key="index" class="category-group">
      <h2 v-if="group.text" class="group-title">{{ group.text }}</h2>

      <!-- 空分组占位 -->
      <div v-if="!group.items || !group.items.length" class="empty-card">
        <span class="empty-icon">📭</span>
        <span>内容筹备中，敬请期待</span>
      </div>

      <div v-else class="card-grid">
        <a
          v-for="item in group.items"
          :key="item.text"
          :href="firstLink(item)"
          class="article-card"
        >
          <!-- 图标区分目录 / 文章 -->
          <div class="card-icon">{{ isFolder(item) ? '📁' : '📄' }}</div>
          <div class="card-content">
            <h3 class="article-title">{{ item.text }}</h3>
            <span v-if="isFolder(item)" class="read-more">共 {{ countArticles(item) }} 篇 · 进入目录 →</span>
            <span v-else class="read-more">点击阅读 →</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'

const { theme } = useData()
const route = useRoute()

// 根据当前路由取对应模块的 sidebar 配置
const currentSidebar = computed(() => {
  const pathParts = route.path.split('/')
  const currentCategoryKey = `/${pathParts[1]}/`

  return theme.value.sidebar[currentCategoryKey] || []
})

// 顶层无子项的链接（知识中枢等直达入口）
const topLinks = computed(() =>
  currentSidebar.value.filter((i) => i.link && !i.items)
)

// 分组（含 items 数组即视为分组；空数组分组渲染「内容筹备中」占位卡）
const groups = computed(() =>
  currentSidebar.value.filter((i) => Array.isArray(i.items) || (!i.link && i.text))
)

// 判断是否为目录（含子项）
const isFolder = (item) => !!(item.items && item.items.length)

// 递归统计目录下文章总数
const countArticles = (item) => {
  if (!item.items || !item.items.length) return item.link ? 1 : 0
  return item.items.reduce((sum, i) => sum + countArticles(i), 0)
}

// 递归取第一个可跳转链接：目录卡点击直达其第一篇文章
const firstLink = (item) => {
  if (item.link) return item.link
  for (const child of item.items || []) {
    const link = firstLink(child)
    if (link) return link
  }
  return '#'
}
</script>

<style scoped>
.category-list {
  margin-top: 2rem;
}

/* —— 顶层直达横幅卡 —— */
.top-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 0.5rem;
}
.top-link-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-radius: 12px;
  background-color: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-3);
  border-left: 4px solid var(--vp-c-brand-1);
  text-decoration: none !important;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  transition: all 0.25s ease;
}
.top-link-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px var(--vp-brand-glow);
}
.top-link-arrow {
  transition: transform 0.25s ease;
}
.top-link-card:hover .top-link-arrow {
  transform: translateX(4px);
}

/* —— 分组标题 —— */
.group-title {
  margin-top: 2.2rem !important;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 1.5rem;
  color: var(--vp-c-brand-1);
}

/* —— 卡片矩阵 —— */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
  margin-top: 1rem;
}
.article-card {
  display: flex;
  align-items: flex-start;
  padding: 1.3rem 1.4rem;
  background-color: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none !important;
  box-shadow: var(--vp-shadow-1);
  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
}
.article-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 12px 28px var(--vp-brand-glow);
}
.card-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  margin-top: 2px;
}
.article-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}
.read-more {
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

/* —— 空分组占位卡 —— */
.empty-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1.4rem 1.6rem;
  border: 1px dashed var(--vp-c-border);
  border-radius: 12px;
  color: var(--vp-c-text-3);
  font-size: 0.95rem;
  background-color: var(--vp-c-bg-soft);
}
.empty-icon {
  font-size: 1.3rem;
}
</style>
