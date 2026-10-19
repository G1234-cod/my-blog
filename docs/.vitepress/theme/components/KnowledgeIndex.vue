<template>
  <section class="ed-section" id="knowledge-map">
    <SectionHead
      tag="03 / KNOWLEDGE MAP"
      title="知识地图"
      sub="四条技术主线，一跳直达内容。每条主线聚合实战记录、学习笔记与论文精读。"
    />

    <nav class="map-list">
      <a v-for="m in modules" :key="m.href" class="map-row" :href="m.href">
        <div class="map-main">
          <h3 class="map-title">{{ m.title }}</h3>
          <p class="map-desc">{{ m.desc }}</p>
        </div>
        <span class="map-arrow mono">进入 →</span>
      </a>
    </nav>
  </section>
</template>

<script setup>
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
  padding: 22px 4px;
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
  font-size: 1.25rem;
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
}
</style>
