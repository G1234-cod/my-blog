<template>
  <div class="knowledge-switcher-container">
    <div class="switcher-track">
      <!-- 模块 1：大模型 -->
      <a href="/hub/ai-agent" :class="['switcher-pill', { active: activeModule === 'ai' }]">
        <span class="icon">🤖</span>
        <span class="text">AI & Agent</span>
      </a>
      <!-- 模块 2：云原生 -->
      <a href="/hub/cloud-devops" :class="['switcher-pill', { active: activeModule === 'cloud' }]">
        <span class="icon">☁️</span>
        <span class="text">Cloud & DevOps</span>
      </a>
      <!-- 模块 3：工作流 -->
      <a href="/hub/workflow" :class="['switcher-pill', { active: activeModule === 'workflow' }]">
        <span class="icon">⚡</span>
        <span class="text">Workflow</span>
      </a>
      <!-- 模块 4：算法 -->
      <a href="/hub/algorithm" :class="['switcher-pill', { active: activeModule === 'algo' }]">
        <span class="icon">🧠</span>
        <span class="text">Algorithm</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

// 🔥 核心防崩溃：使用 useData 替代 useRoute，完美绕过 VitePress 的路由初始化 Bug
const { page } = useData()

const activeModule = computed(() => {
  // page.relativePath 会返回当前物理文件的路径，如 'hub/ai-agent.md'
  const path = page.value.relativePath || ''
  
  if (path.includes('ai-journey') || path.includes('01-AI-Agent') || path.includes('ai-agent')) return 'ai'
  if (path.includes('build-journal') || path.includes('02-Cloud-DevOps') || path.includes('cloud-devops')) return 'cloud'
  if (path.includes('env-setup') || path.includes('03-Workflow') || path.includes('workflow')) return 'workflow'
  if (path.includes('leetcode') || path.includes('04-Algorithm') || path.includes('algorithm')) return 'algo'
  return ''
})
</script>

<style scoped>
.knowledge-switcher-container {
  padding: 12px 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-sidebar-bg-color);
  position: sticky;
  top: 0;
  z-index: 10;
}

.switcher-track {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.switcher-pill {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
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
  border-color: var(--vp-c-brand-3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.icon {
  margin-right: 8px;
  font-size: 16px;
}
</style>