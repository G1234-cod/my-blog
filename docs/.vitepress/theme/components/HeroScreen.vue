<template>
  <div class="hero-wrapper" id="hero">
    
    <div class="hero-card">
      <div class="image-section">
       <img src="/profile-img2.png" alt="关运祥" class="profile-img" />
       <div class="image-overlay"></div>
      </div>

      <div class="text-section">
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

    <div class="bottom-stats">
      <div class="stat-item">⭐ 3+ 核心架构系统</div>
      <div class="stat-item">🚀 1000+ 调试工时</div>
      <div class="stat-item">📦 10+ 容器部署节点</div>
      <div class="stat-item">💡 3项 国家/省级竞赛奖项</div>
    </div>

  </div>
</template>

<style scoped>
/* 最外层容器：依然保持全屏吸附与呼吸感 */
.hero-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  /* 极简网格底纹 */
  background-image: 
    linear-gradient(var(--vp-c-divider) 1px, transparent 1px),
    linear-gradient(90deg, var(--vp-c-divider) 1px, transparent 1px);
  background-size: 40px 40px;
  padding: 0 5%;
}

/* 核心大卡片 */
.hero-card {
  width: 100%;
  max-width: 1100px;
  min-height: 500px;
  display: flex;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  box-shadow: var(--vp-shadow-3);
  transition: border-color 0.3s ease;
}
.hero-card:hover {
  border-color: var(--vp-c-brand-1);
}

/* === 左侧文本区 === */
.text-section {
  width: 55%;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
}
.tag {
  font-family: monospace;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
}
.main-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin: 0 0 20px 0;
  line-height: 1.2;
}
.description {
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 40px 0;
}

/* 内部嵌套的使命卡片 (完美还原参考图里的内嵌玻璃框) */
.mission-card {
  background: var(--vp-c-default-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  padding: 24px;
  position: relative;
}
.mission-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}
.mission-text {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 16px 0;
}
.mission-footer {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}

/* === 右侧人像区 === */
.image-section {
  width: 45%;
  position: relative;
  /* 增加一个极其微弱的品牌色极光背景，用来烘托人像 */
  background: radial-gradient(circle at center, var(--vp-c-brand-soft) 0%, transparent 70%);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center; /* 证件照偏上对齐 */
  
  /* 【核心魔法】：利用 CSS 遮罩，让照片左侧和底部柔和地融入卡片，掩盖证件照的死板边缘 */
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 30%), linear-gradient(to top, transparent 0%, black 20%);
  -webkit-mask-composite: source-in;
  mask-image: linear-gradient(to right, transparent 0%, black 30%), linear-gradient(to top, transparent 0%, black 20%);
  mask-composite: intersect;
  
  /* 如果你的照片是白底的，在夜间模式下可以用 multiply 正片叠底强行压暗白底 (可选) */
  /* mix-blend-mode: multiply; */
}

/* 叠加一层渐变，防止照片过亮抢走文本焦点 */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, var(--vp-c-bg-soft) 0%, transparent 40%);
  pointer-events: none;
}

/* === 底部状态栏 === */
.bottom-stats {
  margin-top: 40px;
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
}
.stat-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-family: monospace;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* === 响应式处理 === */
@media (max-width: 900px) {
  .hero-card { flex-direction: column-reverse; }
  .text-section { width: 100%; padding: 40px 30px; }
  .image-section { width: 100%; height: 300px; }
  .profile-img { object-position: center 20%; -webkit-mask-image: linear-gradient(to top, transparent 0%, black 30%); }
  .image-overlay { background: linear-gradient(to top, var(--vp-c-bg-soft) 0%, transparent 40%); }
  .bottom-stats { flex-wrap: wrap; gap: 20px; margin-top: 30px; }
}
</style>
