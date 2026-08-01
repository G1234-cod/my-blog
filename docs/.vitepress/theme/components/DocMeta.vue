<template>
  <!-- 文章元信息：发布日期 + 预计阅读时长（初始透明，挂载定位到 H1 下方后淡入） -->
  <div ref="metaEl" class="doc-meta" :class="{ ready }">
    <span v-if="dateText" class="meta-item">
      <span class="meta-icon">📅</span>{{ dateText }}
    </span>
    <span v-if="dateText && minutes" class="meta-divider">·</span>
    <span v-if="minutes" class="meta-item">
      <span class="meta-icon">⏱</span>约 {{ minutes }} 分钟读完
    </span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

const metaEl = ref(null)
const ready = ref(false)
const minutes = ref(0)

// 📅 发布日期：读取 frontmatter.date，无则不显示
const dateText = computed(() => {
  const raw = frontmatter.value?.date
  if (!raw) return ''
  const d = new Date(raw)
  if (isNaN(d.getTime())) return ''
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
})

// ⏱ 阅读时长估算：中文约 400 字/分钟，英文约 200 词/分钟，混合取两者之和
const estimateReadingTime = () => {
  const doc = document.querySelector('.VPDoc .vp-doc')
  if (!doc) return
  const text = doc.innerText || ''
  const cjkCount = (text.match(/[一-鿿㐀-䶿]/g) || []).length
  const wordCount = (text.replace(/[一-鿿㐀-䶿]/g, ' ').match(/[a-zA-Z0-9]+/g) || []).length
  minutes.value = Math.max(1, Math.round(cjkCount / 400 + wordCount / 200))
}

// 📌 把元信息块移动到文章 H1 正下方（doc-before 插槽默认渲染在标题上方）
const relocate = async () => {
  if (typeof document === 'undefined') return
  ready.value = false
  await nextTick()
  const h1 = document.querySelector('.VPDoc .vp-doc h1')
  if (h1 && metaEl.value && h1.nextSibling !== metaEl.value) {
    h1.insertAdjacentElement('afterend', metaEl.value)
  }
  estimateReadingTime()
  // 定位完成后再淡入，避免首屏在标题上方闪一下
  requestAnimationFrame(() => { ready.value = true })
}

onMounted(relocate)
// 路由切换时 VitePress 无刷新替换正文，需要重新定位与重新估算
watch(() => route.path, relocate)
</script>

<style scoped>
.doc-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: -0.8rem 0 2rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.doc-meta.ready {
  opacity: 1;
}
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  letter-spacing: 0.3px;
}
.meta-icon {
  font-size: 0.9rem;
}
.meta-divider {
  color: var(--vp-c-text-3);
}
</style>
