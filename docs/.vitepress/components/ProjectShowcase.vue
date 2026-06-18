<template>
  <div class="split-screen" id="projects">
    <div class="left-board">
      <div class="board-content">
        <h2 class="board-title">全栈架构<br>& AI 探索</h2>
        <p class="board-desc">不浮于表面，深耕系统底层与工程化落地。从自动化流水线到本地化大模型知识库的探索纪实。</p>
      </div>
    </div>

    <div class="right-scroll">
      <div class="projects-container">
        
        <div class="project-card">
          <div class="tech-tags">
            <span>WSL2</span><span>Docker</span><span>Ollama</span>
          </div>
          <h3>RAG 本地大模型知识库系统</h3>
          <p>彻底摆脱外部算力依赖，利用 WSL2 配合 Docker 容器化环境，成功拉起 7B 级别大模型的本地私有化部署与知识库检索打通。</p>
          <a href="/projects/rag-system" class="view-btn">View Details ↗</a>
        </div>

        <div class="project-card">
          <div class="tech-tags">
            <span>VitePress</span><span>Nginx</span><span>CI/CD</span>
          </div>
          <h3>数字孪生体与全栈自动化中台</h3>
          <p>弃用传统静态博客生成器，基于 VitePress + Nginx 构建。打通 GitHub Actions 实现从 Typora 本地编写到云服务器的零人工干预部署。</p>
          <a href="/projects/digital-twin" class="view-btn">View Details ↗</a>
        </div>

        <div class="project-card">
          <div class="tech-tags">
            <span>Java</span><span>国家级软著</span>
          </div>
          <h3>双因子安全社区交互系统</h3>
          <p>具备完整用户闭环与安全校验的底层交互系统，已获得国家版权局计算机软件著作权登记证书。</p>
          <a href="/projects/security-community" class="view-btn">View Details ↗</a>
        </div>

        <div style="height: 50px;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.split-screen { width: 100%; height: 100%; display: flex; }
.left-board {
  width: 40%; height: 100%; display: flex; align-items: center; justify-content: center; border-right: 1px solid rgba(255, 255, 255, 0.05);
}
.board-content { width: 70%; }
.board-title { font-size: 2.5rem; font-weight: 800; line-height: 1.2; color: #fff; margin-bottom: 20px; }
.board-desc { font-size: 1rem; color: rgba(255, 255, 255, 0.6); line-height: 1.6; }

.right-scroll { width: 60%; height: 100%; overflow-y: auto; padding: 100px 8%; scrollbar-width: none; }
.right-scroll::-webkit-scrollbar { display: none; }

.projects-container { display: flex; flex-direction: column; gap: 40px; }
.project-card {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 40px;
  transition: transform 0.3s ease, border-color 0.3s ease;
}
.project-card:hover {
  transform: translateY(-5px);
  border-color: rgba(120, 80, 255, 0.4);
  box-shadow: 0 10px 40px rgba(120, 80, 255, 0.1);
}
.tech-tags { display: flex; gap: 10px; margin-bottom: 20px; }
.tech-tags span {
  font-size: 0.75rem; font-family: monospace; color: var(--vp-c-brand-1);
  background: rgba(120, 80, 255, 0.1); padding: 4px 10px; border-radius: 8px;
}
.project-card h3 { font-size: 1.5rem; color: #fff; margin: 0 0 16px 0; }
.project-card p { font-size: 0.95rem; color: rgba(255, 255, 255, 0.6); line-height: 1.6; margin: 0 0 30px 0; }
.view-btn {
  display: inline-block; color: #fff; font-size: 0.9rem; font-weight: 600; text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3); padding-bottom: 2px; transition: all 0.2s ease;
}
.view-btn:hover { color: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); }
</style>