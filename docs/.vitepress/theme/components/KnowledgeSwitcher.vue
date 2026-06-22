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
/* 样式保持不变 */
.knowledge-switcher-container {
  padding: 12px 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-sidebar-bg-color);
  position: sticky;
  top: 0;
  z-index: 10;
}
.switcher-track { display: flex; flex-direction: column; gap: 8px; }
.switcher-pill {
  display: flex; align-items: center; padding: 8px 12px;
  border-radius: 8px; font-size: 13px; font-weight: 600;
  color: var(--vp-c-text-2); text-decoration: none;
  transition: all 0.2s ease; background-color: var(--vp-c-bg-soft); border: 1px solid transparent;
}
.switcher-pill:hover { background-color: var(--vp-c-default-soft); color: var(--vp-c-text-1); }
.switcher-pill.active {
  background-color: var(--vp-c-brand-soft); color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-3); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.icon { margin-right: 8px; font-size: 16px; }
</style>