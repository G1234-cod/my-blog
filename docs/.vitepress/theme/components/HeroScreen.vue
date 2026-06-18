<template>
  <div class="hero-wrapper" id="hero">
    
    <div class="bg-glow glow-1"></div>
    <div class="bg-glow glow-2"></div>

    <div class="hero-card">
      
      <div class="gradient-overlay">
        
        <div class="text-content">
          <div class="tag">🌐 关于我</div>
          <h1 class="main-title">嘿，我是关运祥 👋</h1>
          <p class="description">
            来自洛阳理工学院的软件工程拔尖学生，致力于开发全栈应用、AI 本地化落地解决方案，并推动技术边界的真实工程产出。
          </p>

          <div class="mission-card">
            <div class="mission-title">🚀 我的使命</div>
            <p class="mission-text">
              弥合底层逻辑与工程落地之间的鸿沟：创造力与功能性交汇，用严谨的自动化流水线推动系统进步。
            </p>
            <div class="mission-footer">
              <em>继续前进，不要妥协。</em> 🌌
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="bottom-stats">
      <div class="stat-item"><span class="icon">⭐</span><span class="stat-num">3+</span><span class="stat-desc">核心架构系统</span></div>
      <div class="stat-item"><span class="icon">🚀</span><span class="stat-num">1000+</span><span class="stat-desc">调试工时</span></div>
      <div class="stat-item"><span class="icon">📦</span><span class="stat-num">10+</span><span class="stat-desc">容器部署节点</span></div>
      <div class="stat-item"><span class="icon">🏆</span><span class="stat-num">3项</span><span class="stat-desc">国家/省级竞赛奖项</span></div>
    </div>

  </div>
</template>

<style scoped>
.hero-wrapper {
  width: 100%; height: 100vh; display: flex; flex-direction: column; 
  justify-content: center; align-items: center; position: relative; 
  overflow: hidden; background-color: var(--vp-c-bg);
}

.bg-glow { position: absolute; border-radius: 50%; z-index: 0; filter: blur(120px); opacity: 0.15; pointer-events: none; }
.glow-1 { top: -10%; left: 5%; width: 600px; height: 600px; background: var(--vp-c-brand-1); }
.glow-2 { bottom: -10%; right: 10%; width: 500px; height: 500px; background: #00f2fe; }

.hero-card {
  width: 90%; max-width: 1400px; min-height: 520px;
  position: relative; z-index: 1; border-radius: 24px; overflow: hidden;
  background-image: url('/background.jpg'); 
  background-size: cover; background-position: right center; background-repeat: no-repeat;
  box-shadow: var(--vp-shadow-3);
  transform: translateZ(0); will-change: transform;
  border: 1px solid var(--vp-c-border);
  transition: border-color 0.3s ease;
}
.hero-card:hover { border-color: var(--vp-c-brand-1); }

/* 核心优化：全覆盖的柔和渐变层，彻底消灭分界线 */
.gradient-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  padding: 60px 50px; display: flex; flex-direction: column; justify-content: center;
  /* 渐变魔法：左侧 0-40% 是纯背景色，向右缓慢渐变，75% 处完全透明 */
  background: linear-gradient(to right, var(--vp-c-bg) 0%, var(--vp-c-bg) 40%, transparent 75%);
}

.text-content { width: 55%; } /* 约束文字范围 */

.tag { font-family: monospace; font-size: 0.9rem; color: var(--vp-c-text-2); margin-bottom: 20px; }
.main-title { font-size: 3.2rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0 0 20px 0; line-height: 1.2; letter-spacing: -0.5px; }
.description { font-size: 1.05rem; color: var(--vp-c-text-2); line-height: 1.7; margin: 0 0 30px 0; max-width: 90%; }

.mission-card { background: var(--vp-c-default-soft); border: 1px solid var(--vp-c-border); border-radius: 16px; padding: 24px; max-width: 95%; }
.mission-title { font-size: 0.9rem; font-weight: 700; color: var(--vp-c-text-1); margin-bottom: 12px; }
.mission-text { font-size: 0.95rem; color: var(--vp-c-text-2); line-height: 1.6; margin: 0 0 16px 0; }
.mission-footer { font-size: 0.85rem; color: var(--vp-c-text-3); font-style: italic; }

.bottom-stats { margin-top: 40px; display: flex; gap: 40px; justify-content: center; align-items: center; z-index: 1; flex-wrap: wrap; }
.stat-item { display: flex; align-items: center; gap: 10px; font-family: var(--vp-font-family-base); }
.stat-item .icon { font-size: 1.1rem; }
.stat-num { font-size: 1.1rem; font-weight: 800; color: var(--vp-c-text-1); font-family: monospace; }
.stat-desc { font-size: 0.9rem; font-weight: 600; color: var(--vp-c-text-2); letter-spacing: 0.5px; }

@media (max-width: 900px) {
  .hero-card { min-height: 600px; background-position: 70% center; }
  .gradient-overlay { background: linear-gradient(to top, var(--vp-c-bg) 0%, var(--vp-c-bg) 50%, transparent 90%); padding: 120px 30px 40px 30px; justify-content: flex-end; }
  .text-content { width: 100%; }
  .main-title { font-size: 2.2rem; }
  .description { max-width: 100%; }
  .bottom-stats { gap: 20px; margin-top: 30px; }
}
</style>