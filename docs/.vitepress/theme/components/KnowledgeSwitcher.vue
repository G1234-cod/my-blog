<template>
  <div v-if="showSwitcher" class="knowledge-switcher-container">
    <div class="switcher-track">
      <a href="/hub/ai-agent.html" :class="['switcher-pill', { active: activeModule === 'ai' }]">
        <span class="icon">🤖</span><span class="text">AI & Agent</span>
      </a>
      <a href="/hub/cloud-devops.html" :class="['switcher-pill', { active: activeModule === 'cloud' }]">
        <span class="icon">☁️</span><span class="text">Cloud & DevOps</span>
      </a>
      <a href="/hub/workflow.html" :class="['switcher-pill', { active: activeModule === 'workflow' }]">
        <span class="icon">⚡</span><span class="text">Workflow</span>
      </a>
      <a href="/hub/algorithm.html" :class="['switcher-pill', { active: activeModule === 'algo' }]">
        <span class="icon">🧠</span><span class="text">Algorithm</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { page } = useData()

// 🎯 1. 显示控制逻辑：明确在哪些页面不需要这个胶囊切换器
const showSwitcher = computed(() => {
  // 安全获取当前相对路径，防止 SSR 阶段未定义
  const path = page.value?.relativePath || ''
  
  // 如果是 项目展示区、简历区、或根目录(首页/关于)，则隐藏
  if (path.startsWith('projects/')) return false
  if (path.includes('my-resume')) return false
  if (path === 'index.md' || path === 'about.md') return false
  
  return true // 其他技术笔记页面正常显示
})

// 🎯 2. 高亮控制逻辑
const activeModule = computed(() => {
  const path = page.value?.relativePath || ''
  if (path.includes('ai-journey') || path.includes('01-AI-Agent') || path.includes('ai-agent')) return 'ai'
  if (path.includes('build-journal') || path.includes('02-Cloud-DevOps') || path.includes('cloud-devops')) return 'cloud'
  if (path.includes('env-setup') || path.includes('03-Workflow') || path.includes('workflow')) return 'workflow'
  if (path.includes('leetcode') || path.includes('04-Algorithm') || path.includes('algorithm')) return 'algo'
  return ''
})
</script>

<style scoped>
/* 容器：位于侧边栏顶部，随目录列表一起滚动（不用 sticky 固定，
   避免滚动时遮挡下方目录项；模块切换另有顶部导航栏入口兜底） */
.knowledge-switcher-container {
  padding: 10px 12px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}
/* 4 个胶囊改为 2×2 网格，减少纵向占用 */
.switcher-track {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.switcher-pill {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: all 0.2s ease;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid transparent;
}
.switcher-pill:hover {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}
.switcher-pill.active {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 10px var(--vp-brand-glow);
}
.icon { margin-right: 5px; font-size: 14px; }
</style>