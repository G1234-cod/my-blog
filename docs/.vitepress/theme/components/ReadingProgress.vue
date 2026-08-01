<template>
  <!-- 顶部阅读进度条：纯 CSS transform 驱动，性能友好 -->
  <div
    v-if="visible"
    class="reading-progress"
    :style="{ transform: `scaleX(${progress})` }"
    aria-hidden="true"
  />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const progress = ref(0)

// 🎯 只在文档页显示：首页 layout:false 不经过 Layout 插槽（天然排除）；
// home/page 布局（如知识中枢落地页）不显示
const visible = computed(() => {
  const layout = frontmatter.value?.layout
  return layout !== 'home' && layout !== 'page' && layout !== false
})

// 滚动进度 = 已滚动距离 / 可滚动总距离
const updateProgress = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const total = document.documentElement.scrollHeight - window.innerHeight
  progress.value = total > 0 ? Math.min(1, Math.max(0, scrollTop / total)) : 0
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress, { passive: true })
})

onUnmounted(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>

<style scoped>
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 8px var(--vp-brand-glow);
  transform-origin: left center;
  will-change: transform;
  /* 高于导航栏(30)，低于移动端侧栏遮罩(50)，侧栏展开时自然被遮盖 */
  z-index: 45;
  pointer-events: none;
}
</style>
