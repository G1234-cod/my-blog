<template>
  <div class="category-list">
    <div v-for="(group, index) in currentSidebar" :key="index" class="category-group">
      <h2 class="group-title">{{ group.text }}</h2>
      
      <div class="card-grid">
        <a 
          v-for="item in group.items" 
          :key="item.link" 
          :href="item.link" 
          class="article-card hover-effect"
        >
          <div class="card-icon">📄</div>
          <div class="card-content">
            <h3 class="article-title">{{ item.text }}</h3>
            <span class="read-more">点击阅读 →</span>
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

// 核心逻辑：根据当前的 URL 路径，自动去提取对应的 sidebar 配置
const currentSidebar = computed(() => {
  // 例如当前路径是 /build-journal/index.html，提取出 /build-journal/
  const pathParts = route.path.split('/')
  const currentCategoryKey = `/${pathParts[1]}/`
  
  // 返回 config.mjs 中对应这个 key 的数据
  return theme.value.sidebar[currentCategoryKey] || []
})
</script>

<style scoped>
.category-list {
  margin-top: 2rem;
}
.group-title {
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 1.5rem;
  color: var(--vp-c-brand-1);
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
.article-card {
  display: flex;
  align-items: flex-start;
  padding: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none !important; /* 去除超链接下划线 */
  transition: all 0.3s ease;
}
.hover-effect:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}
.card-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  margin-top: 2px;
}
.article-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}
.read-more {
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>