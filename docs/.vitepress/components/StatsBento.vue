<template>
  <div class="bento-wrapper" id="stats">
    
    <div class="bento-grid">
      
      <div class="bento-card profile-card">
        <div class="avatar-ring">
          <div class="avatar-placeholder">👨‍💻</div>
        </div>
        <h2>关运祥</h2>
        <p class="role-badge">全栈开发 / AI 探索者</p>
        <p class="desc">
          专注于底层架构设计与大模型本地化工程部署。<br><br>
          崇尚“知其然更知其所以然”的极客哲学，致力于将复杂的算法逻辑转化为优雅的自动化流水线。
        </p>
      </div>

      <div class="right-column">
        
        <div class="stats-grid">
          <div class="bento-card stat-item">
            <h3 class="gradient-text">1000+</h3>
            <p>本地调试工时</p>
          </div>
          <div class="bento-card stat-item">
            <h3 class="gradient-text">3+</h3>
            <p>全栈架构系统</p>
          </div>
          <div class="bento-card stat-item">
            <h3 class="gradient-text">10+</h3>
            <p>容器部署节点</p>
          </div>
          <div class="bento-card stat-item">
            <h3 class="gradient-text">100W+</h3>
            <p>知识库沉淀(字)</p>
          </div>
        </div>

        <div class="bento-card skills-card">
          <h3 class="card-title">核心内功基石</h3>
          
          <div class="skill-list">
            <div class="skill-item">
              <div class="skill-info"><span>算法设计与分析</span><span class="score">94%</span></div>
              <div class="progress-track"><div class="progress-bar cyan-purple" style="width: 94%"></div></div>
            </div>
            
            <div class="skill-item">
              <div class="skill-info"><span>计算机网络</span><span class="score">93%</span></div>
              <div class="progress-track"><div class="progress-bar blue-cyan" style="width: 93%"></div></div>
            </div>
            
            <div class="skill-item">
              <div class="skill-info"><span>Web 程序设计</span><span class="score">92%</span></div>
              <div class="progress-track"><div class="progress-bar purple-pink" style="width: 92%"></div></div>
            </div>

            <div class="skill-item">
              <div class="skill-info"><span>数据结构</span><span class="score">90%</span></div>
              <div class="progress-track"><div class="progress-bar green-cyan" style="width: 90%"></div></div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="marquee-container">
      <div class="marquee-content">
        <span class="tech-tag">WSL2</span>
        <span class="tech-tag">Docker</span>
        <span class="tech-tag">Vue 3</span>
        <span class="tech-tag">VitePress</span>
        <span class="tech-tag">Ollama 7B</span>
        <span class="tech-tag">AnythingLLM</span>
        <span class="tech-tag">Nginx</span>
        <span class="tech-tag">CI/CD</span>
        <span class="tech-tag">Java</span>
        <span class="tech-tag">Python</span>
        <span class="tech-tag">WSL2</span>
        <span class="tech-tag">Docker</span>
        <span class="tech-tag">Vue 3</span>
        <span class="tech-tag">VitePress</span>
        <span class="tech-tag">Ollama 7B</span>
        <span class="tech-tag">AnythingLLM</span>
        <span class="tech-tag">Nginx</span>
        <span class="tech-tag">CI/CD</span>
        <span class="tech-tag">Java</span>
        <span class="tech-tag">Python</span>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* 整个第二屏的包裹器，限制最大宽度以保证视觉呼吸感 */
.bento-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 5%;
  box-sizing: border-box;
}

/* 核心网格布局：左 320px，右边自适应 */
.bento-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
  width: 100%;
  max-width: 1100px;
}

/* 统一的毛玻璃卡片底座 */
.bento-card {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 30px;
  transition: transform 0.3s ease, border-color 0.3s ease;
}
.bento-card:hover {
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

/* 左侧：个人简介区特定样式 */
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.avatar-ring {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00f2fe, #4facfe);
  padding: 2px;
  margin-bottom: 20px;
}
.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: #18181b;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
}
.profile-card h2 {
  margin: 0 0 8px 0;
  font-size: 1.8rem;
  color: #fff;
}
.role-badge {
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
  background: rgba(120, 80, 255, 0.1);
  padding: 4px 12px;
  border-radius: 12px;
  margin: 0 0 20px 0;
  font-family: monospace;
}
.desc {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin: 0;
}

/* 右侧：上下两部分拆分布局 */
.right-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 右上：四宫格数据 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 10px;
}
.stat-item h3 {
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: 800;
}
.stat-item p {
  margin: 0;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  font-family: monospace;
}
.gradient-text {
  background: linear-gradient(90deg, #b0f, #0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 右下：内功进度条 */
.skills-card {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.card-title {
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  color: #fff;
}
.skill-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}
.skill-info .score {
  font-family: monospace;
  color: rgba(255, 255, 255, 0.5);
}
.progress-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  border-radius: 4px;
  /* 初始设为0，结合动画可以做滑入效果，这里为极简直接铺满 */
}
/* 定义几种极客渐变色 */
.cyan-purple { background: linear-gradient(90deg, #00f2fe, #4facfe); }
.blue-cyan { background: linear-gradient(90deg, #4facfe, #00f2fe); }
.purple-pink { background: linear-gradient(90deg, #b0f, #ff0844); }
.green-cyan { background: linear-gradient(90deg, #0ba360, #3cba92); }

/* 底部：纯 CSS 无限滚动走马灯 */
.marquee-container {
  width: 100%;
  max-width: 1100px;
  overflow: hidden;
  margin-top: 40px;
  padding: 10px 0;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
.marquee-content {
  display: inline-flex;
  gap: 40px;
  white-space: nowrap;
  animation: scrollMarquee 20s linear infinite;
}
.tech-tag {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.3);
  font-family: monospace;
  transition: color 0.3s ease;
}
.tech-tag:hover {
  color: #fff;
}

@keyframes scrollMarquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 20px)); }
}
</style>