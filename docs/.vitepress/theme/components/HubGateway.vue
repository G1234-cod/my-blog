<template>
  <div class="hub-wrapper" id="hub">
    <div class="hub-header">
      <h2>知识中枢网关</h2>
      <p>所有杂乱无章的思考，都在这里结构化。</p>
    </div>
    <div class="hub-grid">
      <a href="/ai-journey/" class="hub-card">
        <h3>🤖 AI 演进与大模型</h3>
        <p>RAG 架构搭建与提示词工程实战笔记。</p>
      </a>
      <a href="/tech-note/" class="hub-card">
        <h3>⚙️ 专业基石与架构</h3>
        <p>设计模式 UML 重构与底层开发沉淀。</p>
      </a>
      <a href="/env-setup/" class="hub-card">
        <h3>☁️ 服务器运维与基建</h3>
        <p>Linux 部署指南、Docker 容器化纪实。</p>
      </a>
      <a href="/reading/" class="hub-card">
        <h3>📖 泛读思考与沉淀</h3>
        <p>前沿论文解析与 Typora 日常随笔。</p>
      </a>
    </div>
  </div>
</template>

<style scoped>
.hub-wrapper { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 0 5%; }
.hub-header { text-align: center; margin-bottom: 60px; }
.hub-header h2 { font-size: 2.5rem; color: var(--vp-c-text-1); margin: 0 0 10px 0; }
.hub-header p { color: var(--vp-c-text-2); font-family: monospace; }
.hub-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; max-width: 900px; width: 100%; }
.hub-card { text-decoration: none; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border); border-radius: 16px; padding: 30px; transition: all 0.3s ease; }
.hub-card:hover { background: var(--vp-c-bg-alt); border-color: var(--vp-c-brand-1); transform: translateY(-3px); }
.hub-card h3 { color: var(--vp-c-text-1); font-size: 1.2rem; margin: 0 0 10px 0; }
.hub-card p { color: var(--vp-c-text-2); font-size: 0.9rem; line-height: 1.5; margin: 0; }
</style>