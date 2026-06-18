<template>
  <div class="bento-wrapper" id="stats">
    <div class="bento-grid">
      <div class="bento-card profile-card">
        <div class="avatar-ring"><div class="avatar-placeholder">👨‍💻</div></div>
        <h2>关运祥</h2>
        <p class="role-badge">全栈开发 / AI 探索者</p>
        <p class="desc">专注于底层架构设计与大模型本地化工程部署。致力于将复杂的算法逻辑转化为优雅的自动化流水线。</p>
      </div>
      <div class="right-column">
        <div class="stats-grid">
          <div class="bento-card stat-item"><h3>1000+</h3><p>本地调试工时</p></div>
          <div class="bento-card stat-item"><h3>3+</h3><p>全栈架构系统</p></div>
          <div class="bento-card stat-item"><h3>10+</h3><p>容器部署节点</p></div>
          <div class="bento-card stat-item"><h3>100W+</h3><p>沉淀(字)</p></div>
        </div>
        <div class="bento-card skills-card">
          <h3 class="card-title">核心内功基石</h3>
          <div class="skill-list">
            <div class="skill-item"><div class="skill-info"><span>算法设计与分析</span><span class="score">94%</span></div><div class="progress-track"><div class="progress-bar" style="width: 94%"></div></div></div>
            <div class="skill-item"><div class="skill-info"><span>计算机网络</span><span class="score">93%</span></div><div class="progress-track"><div class="progress-bar" style="width: 93%"></div></div></div>
            <div class="skill-item"><div class="skill-info"><span>Web 程序设计</span><span class="score">92%</span></div><div class="progress-track"><div class="progress-bar" style="width: 92%"></div></div></div>
            <div class="skill-item"><div class="skill-info"><span>数据结构</span><span class="score">90%</span></div><div class="progress-track"><div class="progress-bar" style="width: 90%"></div></div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="marquee-container">
      <div class="marquee-content">
        <span class="tech-tag" v-for="i in 20" :key="i">WSL2 / Docker / Vue3 / Ollama / CI/CD / Java </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bento-wrapper { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 0 5%; box-sizing: border-box; }
.bento-grid { display: grid; grid-template-columns: 300px 1fr; gap: 24px; width: 100%; max-width: 1100px; }
.bento-card {
  background: var(--vp-c-bg-soft); backdrop-filter: blur(12px);
  border: 1px solid var(--vp-c-border); border-radius: 20px; padding: 30px;
  transition: transform 0.3s ease, border-color 0.3s ease;
}
.bento-card:hover { border-color: var(--vp-c-brand-1); transform: translateY(-2px); }
.profile-card { display: flex; flex-direction: column; }
.avatar-ring { width: 80px; height: 80px; border-radius: 50%; background: var(--vp-c-brand-1); padding: 2px; margin-bottom: 20px; }
.avatar-placeholder { width: 100%; height: 100%; background: var(--vp-c-bg-alt); border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 2rem; }
.profile-card h2 { margin: 0 0 8px 0; font-size: 1.8rem; color: var(--vp-c-text-1); }
.role-badge { font-size: 0.85rem; color: var(--vp-c-brand-1); background: var(--vp-c-default-soft); padding: 4px 12px; border-radius: 12px; margin: 0 0 20px 0; font-family: monospace; }
.desc { font-size: 0.95rem; color: var(--vp-c-text-2); line-height: 1.6; margin: 0; }
.right-column { display: flex; flex-direction: column; gap: 24px; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.stat-item { text-align: center; padding: 24px 10px; }
.stat-item h3 { margin: 0 0 8px 0; font-size: 2rem; font-weight: 800; color: var(--vp-c-brand-1); }
.stat-item p { margin: 0; font-size: 0.8rem; color: var(--vp-c-text-2); font-family: monospace; }
.skills-card { flex-grow: 1; }
.card-title { margin: 0 0 20px 0; font-size: 1.2rem; color: var(--vp-c-text-1); }
.skill-list { display: flex; flex-direction: column; gap: 18px; }
.skill-info { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem; color: var(--vp-c-text-1); }
.score { font-family: monospace; color: var(--vp-c-text-3); }
.progress-track { width: 100%; height: 6px; background: var(--vp-c-default-soft); border-radius: 4px; overflow: hidden; }
.progress-bar { height: 100%; border-radius: 4px; background: var(--vp-c-brand-1); }
.marquee-container { width: 100%; max-width: 1100px; overflow: hidden; margin-top: 40px; padding: 10px 0; }
.marquee-content { display: inline-flex; gap: 40px; white-space: nowrap; animation: scrollMarquee 20s linear infinite; }
.tech-tag { font-size: 1rem; font-weight: 600; color: var(--vp-c-text-3); font-family: monospace; }
@keyframes scrollMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 20px)); } }
</style>