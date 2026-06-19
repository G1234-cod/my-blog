<template>
  <div class="hub-wrapper" id="hub">
    
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>

    <div class="hub-container">
      
      <div class="hub-header">
        <div class="section-tag">05 / KNOWLEDGE HUB</div>
        <h2>全息知识中枢</h2>
        <p class="subtitle">打通从本地沉浸写作到云端自动发布的闭环。所有碎片化的技术探索，都在此归档为体系化的结构基盘。</p>
        
        <div class="global-stats">
          <div class="stat-pill"><span class="pulse-dot"></span> TOTAL: 31 POSTS</div>
        </div>
      </div>

      <div class="flat-grid">
        
        <a href="/ai-journey/" class="flat-card theme-ai">
          <div class="card-glow"></div>
          <div class="card-top">
            <div class="c-icon">🤖</div>
            <div class="c-count">15 篇</div>
          </div>
          <h3 class="c-title">大模型与 AI 演进</h3>
          <p class="c-desc">专注于私有化大模型的本地落地。涵盖 RAG 知识库部署、Agent 探索、LangChain 链路搭建及 API 底层调用记录。</p>
          <div class="c-tags">
            <span>#Phase2-RAG</span>
            <span>#AI-Basics</span>
          </div>
        </a>

        <a href="/tech-note/" class="flat-card theme-ops">
          <div class="card-glow"></div>
          <div class="card-top">
            <div class="c-icon">⚙️</div>
            <div class="c-count">13 篇</div>
          </div>
          <h3 class="c-title">全栈架构与工程运维</h3>
          <p class="c-desc">从服务器搭建到自动化流水线落地。记录 Docker 容器化实录、CI/CD 构建与前端 VitePress 深度配置踩坑笔记。</p>
          <div class="c-tags">
            <span>#Jamstack</span>
            <span>#Docker</span>
            <span>#CI/CD</span>
          </div>
        </a>

        <a href="/leetcode/" class="flat-card theme-cs">
          <div class="card-glow"></div>
          <div class="card-top">
            <div class="c-icon">💡</div>
            <div class="c-count">3 篇</div>
          </div>
          <h3 class="c-title">计算机底层与算法</h3>
          <p class="c-desc">拒绝做调包侠，回归计算机科学底层底座。LeetCode 刷题笔记、哈希算法专题与核心数据结构思想提炼。</p>
          <div class="c-tags">
            <span>#LeetCode</span>
            <span>#Algorithms</span>
          </div>
        </a>

        <a href="/reading/" class="flat-card theme-read">
          <div class="card-glow"></div>
          <div class="card-top">
            <div class="c-icon">📚</div>
            <div class="c-count">3 篇</div>
          </div>
          <h3 class="c-title">泛读思考与开源随笔</h3>
          <p class="c-desc">前沿大模型学术论文解析、实战项目开发文档归档，以及打造极客专属 Typora 效率工作流的日常随笔。</p>
          <div class="c-tags">
            <span>#Projects</span>
            <span>#Reading</span>
          </div>
        </a>

      </div>

    </div>
  </div>
</template>

<style scoped>
/* === 基础布局 === */
.hub-wrapper {
  width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden; background-color: var(--vp-c-bg); padding: 80px 0;
}

.ambient-glow { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.1; pointer-events: none; }
.glow-1 { top: 0; left: 10%; width: 500px; height: 500px; background: var(--vp-c-brand-1); }
.glow-2 { bottom: 0; right: 10%; width: 400px; height: 400px; background: #00f2fe; }

.hub-container { width: 100%; max-width: 1100px; display: flex; flex-direction: column; align-items: center; z-index: 1; padding: 0 5%; }

/* === 头部看板 === */
.hub-header { text-align: center; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center; }
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
  border-radius: 20px; padding: 32px; transition: all 0.3s ease;
  overflow: hidden; box-shadow: var(--vp-shadow-1);
}

/* 悬浮上浮效果 */
.flat-card:hover { transform: translateY(-4px); box-shadow: var(--vp-shadow-3); z-index: 2; }

/* === 定义四大主题色变量 === */
.theme-ai { --card-accent: #b0f; --card-accent-soft: rgba(187, 0, 255, 0.1); }
.theme-ops { --card-accent: #00f2fe; --card-accent-soft: rgba(0, 242, 254, 0.1); }
.theme-cs { --card-accent: #0ba360; --card-accent-soft: rgba(11, 163, 96, 0.1); }
.theme-read { --card-accent: #f5a623; --card-accent-soft: rgba(245, 166, 35, 0.1); }

/* 应用主题色发光边框 */
.flat-card:hover { border-color: var(--card-accent); }

/* 卡片角落的专属颜色柔光 */
.card-glow {
  position: absolute; right: -60px; top: -60px; width: 180px; height: 180px;
  background: radial-gradient(circle, var(--card-accent-soft) 0%, transparent 70%);
  opacity: 0.5; transition: opacity 0.3s ease; pointer-events: none;
}
.flat-card:hover .card-glow { opacity: 1; transform: scale(1.1); }

/* 卡片内部排版 */
.card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; position: relative; z-index: 1; }
/* 图标背景应用专属主题色 */
.c-icon { font-size: 1.8rem; background: var(--card-accent-soft); width: 48px; height: 48px; display: flex; justify-content: center; align-items: center; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
.c-count { font-size: 0.85rem; font-weight: 700; color: var(--vp-c-text-2); background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); padding: 4px 12px; border-radius: 8px; }

.c-title { font-size: 1.35rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0 0 12px 0; position: relative; z-index: 1; letter-spacing: 0.5px;}
.c-desc { font-size: 0.95rem; color: var(--vp-c-text-2); line-height: 1.6; margin: 0; flex-grow: 1; position: relative; z-index: 1; }

/* 底部标签应用专属主题色 */
.c-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; position: relative; z-index: 1; }
.c-tags span { font-size: 0.8rem; font-weight: 600; color: var(--vp-c-text-2); background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); padding: 4px 10px; border-radius: 6px; transition: all 0.2s; }
.flat-card:hover .c-tags span { color: var(--card-accent); border-color: var(--card-accent); background: var(--card-accent-soft); }

/* === 移动端降级 === */
@media (max-width: 900px) {
  .flat-grid { grid-template-columns: 1fr; }
}
</style>