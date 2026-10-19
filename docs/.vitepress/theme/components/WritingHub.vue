<template>
  <section class="ed-section" id="writing">
    <SectionHead
      tag="03 / WRITING"
      title="写作"
      sub="四条技术主线聚合实战记录、学习笔记与论文精读；下方是目前最值得读的几篇。"
    />

    <!-- 模块导航：四条主线一跳直达 -->
    <nav class="map-list">
      <a v-for="m in modules" :key="m.href" class="map-row" :href="m.href">
        <div class="map-main">
          <h3 class="map-title">{{ m.title }}</h3>
          <p class="map-desc">{{ m.desc }}</p>
        </div>
        <span class="map-arrow mono">进入 →</span>
      </a>
    </nav>

    <!-- 精选文章：具体到篇的推荐 -->
    <p class="reads-label mono">精选文章 / PICKS</p>
    <div class="read-list">
      <a v-for="p in featuredReads" :key="p.url" class="read-row" :href="p.url">
        <div class="read-main">
          <span class="read-title">{{ p.title }}</span>
          <span class="read-desc">{{ p.desc }}</span>
        </div>
        <span class="read-module mono">{{ p.module }}</span>
      </a>
    </div>

    <p class="more-link">
      <a href="/writing/">写作索引（全部模块与体裁）→</a>
    </p>
  </section>
</template>

<script setup>
import { featuredReads } from '../featured-reads.mjs'
import SectionHead from './SectionHead.vue'

const modules = [
  {
    title: 'AI Agent · 智能体与大模型落地',
    desc: '本地化部署、RAG 知识库、Agent 工程化——从模型底座到应用层的完整链路。',
    href: '/hub/ai-agent'
  },
  {
    title: 'Cloud DevOps · 云原生与自动化运维',
    desc: '建站实战、CI/CD 流水线、容器编排与服务器运维的一线记录。',
    href: '/hub/cloud-devops'
  },
  {
    title: 'Workflow · 效率工具与工作流',
    desc: '开发环境配置、编辑器与工具链、让工作流顺滑起来的实践方法。',
    href: '/hub/workflow'
  },
  {
    title: 'Algorithm · 算法与数据结构',
    desc: '题解沉淀与核心课程攻坚：离散数学、算法设计与复杂度分析。',
    href: '/hub/algorithm'
  }
]
</script>

<style scoped>
.ed-section {
  padding: 64px 0;
}
.map-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--vp-c-divider);
}
.map-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 4px;
  border-bottom: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out);
}
.map-row:hover {
  background-color: var(--vp-c-bg-soft);
}
.map-main {
  min-width: 0;
}
.map-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.22rem;
  font-weight: 700;
  letter-spacing: -0.005em;
  color: var(--vp-c-text-1);
  transition: color var(--duration-fast) var(--ease-out);
}
.map-row:hover .map-title {
  color: var(--vp-c-brand-1);
}
.map-desc {
  margin: 6px 0 0;
  max-width: 68ch;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
.map-arrow {
  flex-shrink: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  letter-spacing: 0.05em;
  color: var(--vp-c-brand-1);
}
/* 精选文章子块 */
.reads-label {
  margin: 36px 0 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: var(--vp-c-text-3);
}
.read-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--vp-c-divider);
}
.read-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px 4px;
  border-bottom: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out);
}
.read-row:hover {
  background-color: var(--vp-c-bg-soft);
}
.read-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.read-title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.55;
  color: var(--vp-c-text-1);
  transition: color var(--duration-fast) var(--ease-out);
}
.read-row:hover .read-title {
  color: var(--vp-c-brand-1);
}
.read-desc {
  font-size: 0.86rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}
.read-module {
  flex-shrink: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 2px 9px;
}
.more-link {
  margin: 24px 0 0;
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
  .map-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .map-title {
    font-size: 1.12rem;
  }
  .read-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
