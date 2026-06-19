<template>
  <div class="hub-wrapper" id="hub">
    
    <div class="ambient-glow glow-blue"></div>
    <div class="ambient-glow glow-purple"></div>

    <div class="hub-container">
      
      <div class="hub-header">
        <div class="section-tag">05 / KNOWLEDGE HUB</div>
        <h2>知识中枢网关</h2>
        <p class="subtitle">打通本地 Typora 写作到云端发布的闭环。所有杂乱无章的思考，都在这里结构化。</p>
        
        <div class="global-stats">
          <div class="stat-pill"><span class="icon">📚</span> 31 篇技术沉淀</div>
          <div class="stat-pill"><span class="icon">🤖</span> 15 篇大模型探索</div>
          <div class="stat-pill"><span class="icon">⚙️</span> 16 篇工程与算法架构</div>
        </div>
      </div>

      <div class="bento-grid">
        
        <a href="/ai-journey/" class="hub-card span-2 hero-card">
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="card-head">
              <div class="icon-box">🤖</div>
              <span class="post-count">15 篇</span>
            </div>
            <h3>AI 演进与大模型实战</h3>
            <p>专注于私有化大模型的本地落地。涵盖 RAG 知识库部署、Agent 探索、LangChain 链路搭建以及基础 API 调用的全记录。</p>
            <div class="series-tags">
              <span class="tag"># Phase2-RAG-KnowledgeBase</span>
              <span class="tag"># Phase1-API-Basics</span>
            </div>
          </div>
        </a>

        <a href="/tech-note/" class="hub-card">
          <div class="card-content">
            <div class="card-head">
              <div class="icon-box">⚙️</div>
              <span class="post-count">13 篇</span>
            </div>
            <h3>全栈架构与工程实践</h3>
            <p>从服务器搭建到自动化流水线。Docker 容器化实录、CI/CD 构建与 Trae 辅助开发的深度踩坑笔记。</p>
            <div class="series-tags">
              <span class="tag"># Build Journal</span>
              <span class="tag"># Tech Note</span>
            </div>
          </div>
        </a>

        <a href="/env-setup/" class="hub-card">
          <div class="card-content">
            <div class="card-head">
              <div class="icon-box">☁️</div>
              <span class="post-count">3 篇</span>
            </div>
            <h3>效能环境与云端基建</h3>
            <p>打造极致沉浸式工作流。基于 Typora + PicGo + GitHub 的云端图床自动化构建与环境调优纪实。</p>
          </div>
        </a>

        <a href="/leetcode/" class="hub-card">
          <div class="card-content">
            <div class="card-head">
              <div class="icon-box">💡</div>
              <span class="post-count">3 篇</span>
            </div>
            <h3>算法基石与内功修炼</h3>
            <p>拒绝做调包侠，回归计算机科学底层底座。LeetCode 刷题笔记与哈希算法等核心思想提炼。</p>
          </div>
        </a>

        <a href="/reading/" class="hub-card">
          <div class="card-content">
            <div class="card-head">
              <div class="icon-box">📖</div>
              <span class="post-count">3 篇</span>
            </div>
            <h3>泛读思考与开源沉淀</h3>
            <p>前沿大模型学术论文阅读解析，以及诸如“垃圾分类图像识别系统”等实战项目开发文档归档。</p>
          </div>
        </a>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* === 整体容器布局 === */
.hub-wrapper {
  width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden; background-color: var(--vp-c-bg);
}

/* 动态氛围极光特效 */
.ambient-glow { position: absolute; border-radius: 50%; filter: blur(140px); opacity: 0.1; pointer-events: none; z-index: 0; animation: floatGlow 20s ease-in-out infinite alternate; }
.glow-blue { width: 500px; height: 500px; background: #00f2fe; top: -10%; left: -10%; }
.glow-purple { width: 600px; height: 600px; background: var(--vp-c-brand-1); bottom: -20%; right: -10%; animation-delay: -5s; }
@keyframes floatGlow { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(100px, 50px) scale(1.2); } }

.hub-container { width: 100%; max-width: 1200px; padding: 0 5%; position: relative; z-index: 1; display: flex; flex-direction: column; gap: 40px; }

/* === 头部统计中枢 === */
.hub-header { text-align: center; display: flex; flex-direction: column; align-items: center; }
.section-tag { font-family: monospace; font-size: 0.9rem; color: var(--vp-c-brand-1); margin-bottom: 12px; font-weight: 600; letter-spacing: 1px; }
.hub-header h2 { font-size: 3rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0 0 16px 0; letter-spacing: -0.5px; }
.subtitle { font-size: 1.05rem; color: var(--vp-c-text-2); max-width: 600px; line-height: 1.6; margin: 0 0 24px 0; }

.global-stats { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
.stat-pill { 
  display: flex; align-items: center; gap: 8px; padding: 8px 16px; 
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border); 
  border-radius: 20px; font-size: 0.9rem; font-weight: 600; color: var(--vp-c-text-1);
  box-shadow: var(--vp-shadow-1);
}

/* === Bento 知识网格布局 === */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 24px;
}

/* 卡片基础样式 */
.hub-card {
  text-decoration: none; display: flex; flex-direction: column; justify-content: space-between;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border);
  border-radius: 20px; padding: 28px; transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative; overflow: hidden; box-shadow: var(--vp-shadow-1);
}
.hub-card:hover { transform: translateY(-5px); border-color: var(--vp-c-brand-1); box-shadow: var(--vp-shadow-3); }

/* 横跨两列的主推卡片 */
.span-2 { grid-column: span 2; }

/* 英雄卡片的专属底层炫光 */
.hero-card .card-glow {
  position: absolute; right: -50px; bottom: -50px; width: 200px; height: 200px;
  background: radial-gradient(circle, var(--vp-c-brand-soft) 0%, transparent 70%);
  opacity: 0; transition: opacity 0.5s;
}
.hero-card:hover .card-glow { opacity: 1; }

.card-content { position: relative; z-index: 1; display: flex; flex-direction: column; height: 100%; }

/* 卡片内部排版 */
.card-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.icon-box { font-size: 1.8rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 12px; box-shadow: var(--vp-shadow-1); }
.post-count { font-family: monospace; font-size: 0.85rem; font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); padding: 4px 12px; border-radius: 12px; border: 1px solid rgba(var(--vp-c-brand-1), 0.2); }

.hub-card h3 { font-size: 1.3rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0 0 12px 0; }
.hub-card p { font-size: 0.95rem; color: var(--vp-c-text-2); line-height: 1.6; margin: 0; flex-grow: 1; }

/* 内部系列代码标签 */
.series-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.tag { font-family: monospace; font-size: 0.8rem; color: var(--vp-c-text-2); background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); padding: 4px 10px; border-radius: 8px; transition: color 0.3s, border-color 0.3s; }
.hub-card:hover .tag { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }

/* === 响应式降级 === */
@media (max-width: 1024px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
  .span-2 { grid-column: span 1; } /* 中屏取消跨列 */
}
@media (max-width: 768px) {
  .hub-wrapper { height: auto; padding: 100px 0 60px 0; }
  .bento-grid { grid-template-columns: 1fr; }
  .global-stats { flex-direction: column; align-items: center; gap: 12px; }
}
</style>