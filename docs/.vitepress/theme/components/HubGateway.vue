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
          <div class="stat-pill">SYSTEM STATUS: ONLINE</div>
        </div>
      </div>

      <div class="hologram-stage">
        <div class="carousel-3d">
          
          <a href="/ai-journey/" class="panel panel-1">
            <div class="panel-header">
              <div class="p-icon">🤖</div>
              <div class="p-count">15 篇</div>
            </div>
            <h3 class="p-title">大模型与 AI 演进</h3>
            <p class="p-desc">专注于私有化大模型的本地落地。涵盖 RAG 知识库部署、Agent 探索、LangChain 链路搭建及 API 底层调用记录。</p>
            <div class="p-tags">
              <span>#Phase2-RAG</span>
              <span>#AI-Basics</span>
            </div>
          </a>

          <a href="/tech-note/" class="panel panel-2">
            <div class="panel-header">
              <div class="p-icon">⚙️</div>
              <div class="p-count">13 篇</div>
            </div>
            <h3 class="p-title">全栈架构与工程运维</h3>
            <p class="p-desc">从服务器搭建到自动化流水线落地。记录 Docker 容器化实录、CI/CD 构建与前端 VitePress 深度配置踩坑笔记。</p>
            <div class="p-tags">
              <span>#Jamstack</span>
              <span>#Docker</span>
              <span>#CI/CD</span>
            </div>
          </a>

          <a href="/leetcode/" class="panel panel-3">
            <div class="panel-header">
              <div class="p-icon">💡</div>
              <div class="p-count">3 篇</div>
            </div>
            <h3 class="p-title">计算机底层与算法</h3>
            <p class="p-desc">拒绝做调包侠，回归计算机科学底层底座。LeetCode 刷题笔记、哈希算法专题与核心数据结构思想提炼。</p>
            <div class="p-tags">
              <span>#LeetCode</span>
              <span>#Algorithms</span>
            </div>
          </a>

          <a href="/reading/" class="panel panel-4">
            <div class="panel-header">
              <div class="p-icon">📚</div>
              <div class="p-count">3 篇</div>
            </div>
            <h3 class="p-title">泛读思考与开源随笔</h3>
            <p class="p-desc">前沿大模型学术论文解析、垃圾分类等开源实战项目开发文档归档，以及 Typora 效率工作流的日常随笔。</p>
            <div class="p-tags">
              <span>#Projects</span>
              <span>#Reading</span>
            </div>
          </a>

        </div>
      </div>

      <div class="interaction-hint">
        <span>[ HOVER TO INTERCEPT DATA ]</span>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* === 基础布局 === */
.hub-wrapper {
  width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden; background-color: var(--vp-c-bg);
}

.ambient-glow { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.15; pointer-events: none; }
.glow-1 { top: 10%; left: 10%; width: 400px; height: 400px; background: var(--vp-c-brand-1); }
.glow-2 { bottom: 10%; right: 10%; width: 500px; height: 500px; background: #00f2fe; }

.hub-container { width: 100%; display: flex; flex-direction: column; align-items: center; z-index: 1; }

/* === 头部看板 === */
.hub-header { text-align: center; margin-bottom: 40px; display: flex; flex-direction: column; align-items: center; }
.section-tag { font-family: var(--vp-font-family-base); font-size: 0.9rem; color: var(--vp-c-brand-1); margin-bottom: 12px; font-weight: 700; letter-spacing: 1px; }
.hub-header h2 { font-size: 3.2rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0 0 16px 0; letter-spacing: -0.5px; }
.subtitle { font-size: 1.05rem; color: var(--vp-c-text-2); max-width: 650px; line-height: 1.6; margin: 0 0 24px 0; }

.global-stats { display: flex; gap: 16px; }
.stat-pill { 
  display: flex; align-items: center; gap: 10px; padding: 6px 16px; 
  background: var(--vp-c-default-soft); border: 1px solid var(--vp-c-border); 
  border-radius: 8px; font-size: 0.85rem; font-weight: 700; color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-base); letter-spacing: 0.5px;
}
.pulse-dot { width: 8px; height: 8px; background-color: var(--vp-c-brand-1); border-radius: 50%; box-shadow: 0 0 10px var(--vp-c-brand-1); animation: pulse 2s infinite; }
@keyframes pulse { 0% { transform: scale(0.9); opacity: 0.7; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(0.9); opacity: 0.7; } }

/* === 3D 全息终端核心魔法 === */
.hologram-stage {
  /* 开启 3D 摄像机景深 */
  perspective: 1200px;
  width: 100%; height: 420px; 
  display: flex; justify-content: center; align-items: center;
}

.carousel-3d {
  position: relative; width: 340px; height: 400px;
  /* 声明这是一个 3D 物体空间 */
  transform-style: preserve-3d;
  /* 稍微俯视 (-5deg)，开启 Y 轴匀速旋转 */
  animation: spinCarousel 25s infinite linear;
}
/* 鼠标悬浮时，像黑客拦截数据一样停止自转 */
.carousel-3d:hover { animation-play-state: paused; }

@keyframes spinCarousel {
  from { transform: rotateX(-5deg) rotateY(0deg); }
  to { transform: rotateX(-5deg) rotateY(360deg); }
}

/* 3D 浮空面板通用样式 */
.panel {
  position: absolute; top: 0; left: 0; width: 340px; height: 400px;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border);
  border-radius: 20px; padding: 32px; display: flex; flex-direction: column;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-decoration: none; transition: all 0.3s ease;
  /* 开启毛玻璃，增加全息质感 */
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
}
.panel:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 30px rgba(var(--vp-c-brand-1), 0.2);
  background: var(--vp-c-bg); /* 悬浮时变实，提高阅读清晰度 */
}

/* 空间站位：把四个面板推到 3D 空间的四个方向 */
/* translateZ 控制旋转半径，280px 让它们之间有空隙 */
.panel-1 { transform: rotateY(0deg) translateZ(280px); }
.panel-2 { transform: rotateY(90deg) translateZ(280px); }
.panel-3 { transform: rotateY(180deg) translateZ(280px); }
.panel-4 { transform: rotateY(270deg) translateZ(280px); }

/* 面板内部排版 */
.panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.p-icon { font-size: 2rem; background: var(--vp-c-default-soft); width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; border-radius: 14px; border: 1px solid var(--vp-c-border); }
.p-count { font-size: 0.9rem; font-weight: 700; color: var(--vp-c-text-inverse-1); background: var(--vp-c-text-1); padding: 6px 14px; border-radius: 20px; }

.p-title { font-size: 1.4rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0 0 16px 0; }
.p-desc { font-size: 0.95rem; color: var(--vp-c-text-2); line-height: 1.6; margin: 0; flex-grow: 1; }

.p-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; border-top: 1px solid var(--vp-c-divider); padding-top: 20px; }
.p-tags span { font-size: 0.8rem; font-weight: 600; color: var(--vp-c-text-2); padding: 4px 10px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); border-radius: 8px; transition: color 0.3s; }
.panel:hover .p-tags span { color: var(--vp-c-brand-1); border-color: var(--vp-c-brand-soft); }

/* 底部极客提示语 */
.interaction-hint { margin-top: 40px; font-family: var(--vp-font-family-base); font-size: 0.8rem; font-weight: 700; color: var(--vp-c-text-3); letter-spacing: 2px; }

/* === 移动端降级处理 === */
/* 手机屏幕太小无法展示 3D 旋转，自动降级为高级卡片流 */
@media (max-width: 900px) {
  .hub-wrapper { height: auto; padding: 100px 0; }
  .hologram-stage { perspective: none; height: auto; }
  .carousel-3d { width: 100%; height: auto; transform-style: flat; animation: none; display: flex; flex-direction: column; gap: 24px; padding: 0 5%; }
  .carousel-3d:hover { animation-play-state: running; }
  .panel { position: relative; width: 100%; height: auto; transform: none !important; backdrop-filter: none; }
  .interaction-hint { display: none; }
}
</style>