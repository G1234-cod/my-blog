<template>
  <div class="hub-wrapper" id="hub">
    <div class="hub-header">
      <h2>知识中枢网关</h2>
      <p>所有杂乱无章的思考，都在这里结构化。</p>
    </div>
    
    <div class="hub-grid">
      <a href="/ai-journey/" class="hub-card">
        <div class="icon">🤖</div>
        <h3>AI 演进与大模型</h3>
        <p>RAG 架构搭建、Agent 探索与提示词工程实战笔记。</p>
      </a>
      
      <a href="/tech-note/" class="hub-card">
        <div class="icon">⚙️</div>
        <h3>专业基石与架构</h3>
        <p>设计模式 UML 重构、计算机底层基础与后端开发沉淀。</p>
      </a>
      
      <a href="/env-setup/" class="hub-card">
        <div class="icon">☁️</div>
        <h3>服务器运维与基建</h3>
        <p>Linux 部署指南、Nginx 踩坑与 Docker 容器化纪实。</p>
      </a>

      <a href="/reading/" class="hub-card">
        <div class="icon">📖</div>
        <h3>泛读思考与沉淀</h3>
        <p>技术前沿论文解析与 Typora 日常工作流随笔。</p>
      </a>
    </div>
  </div>
</template>

<style scoped>
.hub-wrapper {
  width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 0 5%;
}
.hub-header { text-align: center; margin-bottom: 60px; }
.hub-header h2 { font-size: 2.5rem; color: #fff; margin: 0 0 10px 0; }
.hub-header p { color: rgba(255, 255, 255, 0.5); font-family: monospace; }

.hub-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; max-width: 900px; width: 100%; }
.hub-card {
  text-decoration: none; background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; padding: 30px;
  transition: all 0.3s ease; position: relative; overflow: hidden;
}
.hub-card:hover {
  background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.2); transform: translateY(-3px);
}
.hub-card .icon { font-size: 2rem; margin-bottom: 16px; }
.hub-card h3 { color: #fff; font-size: 1.2rem; margin: 0 0 10px 0; }
.hub-card p { color: rgba(255, 255, 255, 0.6); font-size: 0.9rem; line-height: 1.5; margin: 0; }
</style>