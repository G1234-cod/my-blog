<template>
  <div class="split-screen" id="projects">
    <div class="left-board">
      <div class="board-content">
        <h2 class="board-title">全栈架构<br>& AI 探索</h2>
        <p class="board-desc">深耕系统底层与工程化落地，从自动化流水线到私有化大模型知识库。</p>
      </div>
    </div>
    <div class="right-scroll">
      <div class="projects-container">
        <div class="project-card">
          <div class="tech-tags"><span>WSL2</span><span>Docker</span><span>Ollama</span></div>
          <h3>RAG 本地大模型知识库系统</h3>
          <p>利用 WSL2 配合 Docker 容器化环境，成功拉起 7B 级别大模型的本地私有化部署。</p>
        </div>
        <div class="project-card">
          <div class="tech-tags"><span>VitePress</span><span>Nginx</span><span>CI/CD</span></div>
          <h3>数字孪生体与自动化中台</h3>
          <p>基于 VitePress 构建，打通 GitHub Actions 实现云服务器的零干预部署。</p>
        </div>
        <div style="height: 50px;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.split-screen { width: 100%; height: 100%; display: flex; }
.left-board { width: 40%; height: 100%; display: flex; align-items: center; justify-content: center; border-right: 1px solid var(--vp-c-divider); }
.board-content { width: 70%; }
.board-title { font-size: 2.5rem; font-weight: 800; color: var(--vp-c-text-1); margin-bottom: 20px; }
.board-desc { font-size: 1rem; color: var(--vp-c-text-2); line-height: 1.6; }
.right-scroll { width: 60%; height: 100%; overflow-y: auto; padding: 100px 8%; scrollbar-width: none; }
.right-scroll::-webkit-scrollbar { display: none; }
.projects-container { display: flex; flex-direction: column; gap: 40px; }
.project-card { background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border); border-radius: 16px; padding: 40px; transition: transform 0.3s ease, border-color 0.3s ease; }
.project-card:hover { transform: translateY(-5px); border-color: var(--vp-c-brand-1); }
.tech-tags { display: flex; gap: 10px; margin-bottom: 20px; }
.tech-tags span { font-size: 0.75rem; font-family: monospace; color: var(--vp-c-brand-1); background: var(--vp-c-default-soft); padding: 4px 10px; border-radius: 8px; }
.project-card h3 { font-size: 1.5rem; color: var(--vp-c-text-1); margin: 0 0 16px 0; }
.project-card p { font-size: 0.95rem; color: var(--vp-c-text-2); line-height: 1.6; margin: 0; }
</style>