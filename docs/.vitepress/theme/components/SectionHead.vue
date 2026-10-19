<template>
  <header class="ed-head">
    <p class="ed-tag mono">{{ tag }}</p>
    <h2 class="ed-title">{{ title }}</h2>
    <p v-if="sub" class="ed-sub">{{ sub }}</p>
  </header>
</template>

<script setup>
defineProps({
  tag: { type: String, required: true },
  title: { type: String, required: true },
  sub: { type: String, default: '' }
})
</script>

<style scoped>
/* 编辑部栏头：mono 栏目标签 + 衬线大标题 + 细规则线（签名动作） */
.ed-head {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 20px;
  margin-bottom: 32px;
}
.ed-tag {
  margin: 0 0 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: var(--vp-c-brand-1);
}
.ed-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.25;
  color: var(--vp-c-text-1);
}
.ed-sub {
  margin: 10px 0 0;
  max-width: 62ch;
  font-size: 0.98rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
@media (max-width: 768px) {
  .ed-title {
    font-size: 1.55rem;
  }
}
</style>
