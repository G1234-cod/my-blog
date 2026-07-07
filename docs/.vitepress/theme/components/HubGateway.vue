<template>
  <div class="hub-wrapper" id="hub">
    
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>

    <div class="hub-container">
      
      <div class="hub-header">
        <div class="section-tag">05 / KNOWLEDGE HUB</div>
        <h2>全息知识中枢</h2>
        <p class="subtitle">打通从本地 Typora 沉淀到云端自动化发布的工程流。拒绝凌乱的碎片化平铺，在此构建结构化的工程师能力基盘。</p>
        
        <div class="global-stats">
          <div class="stat-pill"><span class="pulse-dot"></span> TOTAL: 31 ARCHIVED POSTS</div>
        </div>
      </div>

      <div class="flat-grid">
        
        <a href="/hub/ai-agent" class="flat-card theme-ai">
          <div class="card-glow"></div>
          <div class="card-top">
            <div class="c-icon">🤖</div>
            <div class="c-count">16 篇</div>
          </div>
          <h3 class="c-title">大模型与智能体工程</h3>
          <p class="c-desc">聚焦于大语言模型本地工程化落地。包含 LangChain 生态定位、私有化 RAG 知识库检索增强、Agent 代理体系以及大模型前沿论文的阅读沉淀。</p>
          <div class="c-tags">
            <span>#Phase2-RAG-KnowledgeBase</span>
            <span>#Phase1-API-Basics</span>
          </div>
        </a>

        <a href="/hub/cloud-devops" class="flat-card theme-ops">
          <div class="card-glow"></div>
          <div class="card-top">
            <div class="c-icon">⚙️</div>
            <div class="c-count">6 篇</div>
          </div>
          <h3 class="c-title">架构演进与云原生运维</h3>
          <p class="c-desc">从物理服务器安全加固到自动化部署实践。涵盖阿里云环境搭建、Docker 容器化隔离、CI/CD 流水线自动化上线以及长效运维架构避坑指南。</p>
          <div class="c-tags">
            <span>#Build-Journal</span>
            <span>#CI-CD-Pipeline</span>
          </div>
        </a>

        <a href="/hub/workflow" class="flat-card theme-read">
          <div class="card-glow"></div>
          <div class="card-top">
            <div class="c-icon">✨</div>
            <div class="c-count">5 篇</div>
          </div>
          <h3 class="c-title">效能工具与现代工作流</h3>
          <p class="c-desc">探索极致高效的开发者生产力环境。打通 Typora + PicGo + GitHub 的工业级自动化图床管理体系，以及本地 Trae 开发环境调优。 </p>
          <div class="c-tags">
            <span>#Typora-PicGo</span>
            <span>#AnythingLLM-Local</span>
          </div>
        </a>

        <a href="/hub/algorithm" class="flat-card theme-cs">
          <div class="card-glow"></div>
          <div class="card-top">
            <div class="c-icon">🧠</div>
            <div class="c-count">4 篇</div>
          </div>
          <h3 class="c-title">计算机科学与算法精修</h3>
          <p class="c-desc">回归计算机科学核心底座，拒绝做流于表面的技术调包侠。总结 LeetCode 经典题解，深挖哈希等核心算法数据结构设计思想。</p>
          <div class="c-tags">
            <span>#LeetCode-Hash</span>
            <span>#CS-Basics</span>
          </div>
        </a>

      </div>

    </div>
  </div>
</template>

<style scoped>
/* === 基础布局 === */
.hub-wrapper {
  width: 100%; min-height: 100%; display: flex; align-items: flex-start; justify-content: center;
  position: relative; overflow: hidden; background-color: var(--vp-c-bg); padding: 20px 0 40px 0;
}

.ambient-glow { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.1; pointer-events: none; }
.glow-1 { top: 0; left: 10%; width: 500px; height: 500px; background: var(--vp-c-brand-1); }
.glow-2 { bottom: 0; right: 10%; width: 400px; height: 400px; background: #00f2fe; }

.hub-container { width: 100%; max-width: 1400px; display: flex; flex-direction: column; align-items: center; z-index: 1; padding: 0 3%; }

/* === 头部看板 === */
.hub-header { text-align: center; margin-bottom: 30px; display: flex; flex-direction: column; align-items: center; }
.section-tag { font-family: var(--vp-font-family-base); font-size: 0.9rem; color: var(--vp-c-brand-1); margin-bottom: 16px; font-weight: 700; letter-spacing: 1px; }
.hub-header h2 { font-size: 3.2rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0 0 16px 0; letter-spacing: -0.5px; }
.subtitle { font-size: 1.05rem; color: var(--vp-c-text-2); max-width: 650px; line-height: 1.6; margin: 0 0 24px 0; }

.global-stats { display: flex; justify-content: center; }
.stat-pill { 
  display: flex; align-items: center; gap: 10px; padding: 6px 16px; 
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border); 
  border-radius: 8px; font-size: 0.85rem; font-weight: 700; color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-base); letter-spacing: 0.5px; box-shadow: var(--vp-shadow-1);
}
.pulse-dot { width: 8px; height: 8px; background-color: #0ba360; border-radius: 50%; box-shadow: 0 0 10px #0ba360; animation: pulse 2s infinite; }
@keyframes pulse { 0% { transform: scale(0.9); opacity: 0.7; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(0.9); opacity: 0.7; } }

/* === 2x2 平铺矩阵 === */
.flat-grid {
  width: 100%; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;
}

/* 基础卡片样式 */
.flat-card {
  position: relative; display: flex; flex-direction: column; text-decoration: none;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border);
  border-radius: 16px; padding: 22px; transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: hidden; box-shadow: var(--vp-shadow-1);
}

/* 悬浮轻微上浮 */
.flat-card:hover { transform: translateY(-4px); box-shadow: var(--vp-shadow-3); z-index: 2; }

/* === 严格定义四大主题色彩变量 === */
.theme-ai { --card-accent: #b0f; --card-accent-soft: rgba(187, 0, 255, 0.08); }
.theme-ops { --card-accent: #00f2fe; --card-accent-soft: rgba(0, 242, 254, 0.08); }
.theme-cs { --card-accent: #0ba360; --card-accent-soft: rgba(11, 163, 96, 0.08); }
.theme-read { --card-accent: #f5a623; --card-accent-soft: rgba(245, 166, 35, 0.08); }

/* 应用主题色悬浮边框 */
.flat-card:hover { border-color: var(--card-accent); }

/* 角落流光晕 */
.card-glow {
  position: absolute; right: -60px; top: -60px; width: 180px; height: 180px;
  background: radial-gradient(circle, var(--card-accent-soft) 0%, transparent 70%);
  opacity: 0.5; transition: opacity 0.3s ease; pointer-events: none;
}
.flat-card:hover .card-glow { opacity: 1; transform: scale(1.1); }

/* 内部排版：全面清洗丑陋字体 */
.card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; position: relative; z-index: 1; }
.c-icon { font-size: 1.8rem; background: var(--card-accent-soft); width: 48px; height: 48px; display: flex; justify-content: center; align-items: center; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
.c-count { font-size: 0.85rem; font-weight: 700; color: var(--vp-c-text-2); background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); padding: 4px 12px; border-radius: 8px; font-family: var(--vp-font-family-base); }

.c-title { font-size: 1.4rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0 0 12px 0; position: relative; z-index: 1; letter-spacing: 0.5px;}
.c-desc { font-size: 0.95rem; color: var(--vp-c-text-2); line-height: 1.6; margin: 0; flex-grow: 1; position: relative; z-index: 1; }

/* 底部系列高亮标签 */
.c-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; position: relative; z-index: 1; }
.c-tags span { font-size: 0.8rem; font-weight: 600; color: var(--vp-c-text-2); background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); padding: 4px 10px; border-radius: 8px; transition: all 0.2s; font-family: var(--vp-font-family-base); }
.flat-card:hover .c-tags span { color: var(--card-accent); border-color: var(--card-accent); background: var(--card-accent-soft); }

/* === 移动端优雅自适应 === */
@media (max-width: 768px) {
  .hub-wrapper {
    padding: 80px 0;
    min-height: auto;
  }
  
  .hub-container {
    padding: 0 20px;
  }
  
  .section-tag { font-size: 0.85rem; }
  
  .hub-header h2 {
    font-size: 2.1rem;
    line-height: 1.2;
  }
  
  .subtitle {
    font-size: 0.95rem;
    max-width: 100%;
    line-height: 1.6;
  }
  
  .flat-grid { 
    grid-template-columns: 1fr;
    gap: 18px;
  }
  
  .flat-card {
    padding: 22px;
  }
  
  .c-title {
    font-size: 1.25rem;
    line-height: 1.3;
  }
  
  .c-desc {
    font-size: 0.92rem;
    line-height: 1.6;
  }
  
  .c-icon {
    width: 44px;
    height: 44px;
    font-size: 1.5rem;
  }
  
  .c-count {
    font-size: 0.82rem;
    padding: 4px 11px;
  }
  
  .c-tags {
    margin-top: 16px;
  }
  
  .c-tags span {
    font-size: 0.78rem;
    padding: 4px 9px;
  }
  
  .card-glow {
    width: 150px;
    height: 150px;
    right: -45px;
    top: -45px;
  }
}

@media (max-width: 480px) {
  .hub-wrapper {
    padding: 70px 0;
  }
  
  .hub-container {
    padding: 0 16px;
  }
  
  .hub-header h2 {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
  }
  
  .flat-card {
    padding: 18px;
  }
  
  .c-title {
    font-size: 1.15rem;
  }
  
  .c-desc {
    font-size: 0.88rem;
  }
  
  .c-icon {
    width: 38px;
    height: 38px;
    font-size: 1.3rem;
  }
  
  .c-count {
    font-size: 0.78rem;
    padding: 3px 9px;
  }
  
  .card-top {
    margin-bottom: 14px;
  }
  
  .c-tags {
    flex-wrap: wrap;
    gap: 6px;
  }
  
  .c-tags span {
    font-size: 0.75rem;
    padding: 3px 8px;
  }
  
  .card-glow {
    width: 120px;
    height: 120px;
    right: -30px;
    top: -30px;
  }
}
</style>