<template>
  <div class="bento-wrapper" id="stats">
    
    <div class="bento-grid">
      
      <div class="bento-card profile-card">
        <div class="avatar-ring">
          <img src="/photo.jpg" alt="关运祥" class="avatar-img" />
        </div>
        
        <h2>关运祥</h2>
        
        <div class="role-badge-container">
          <span class="role-badge">💻 全栈开发</span>
          <span class="role-badge">🤖 AI 探索者</span>
        </div>
        
        <p class="desc">
          专注于底层架构设计与大模型本地化工程部署。<br><br>
          崇尚“知其然更知其所以然”的极客哲学，致力于将复杂的算法逻辑转化为优雅的自动化流水线。
        </p>

        <a href="/Guanyunxiang_Resume_AI.pdf" target="_blank" class="resume-btn">
          📄 查看在线简历 ↗
        </a>
      </div>

      <div class="right-column">
        
        <div class="stats-grid">
          <div class="bento-card stat-item">
            <h3>Top 5%</h3>
            <p>专业综合排名</p>
          </div>
          <div class="bento-card stat-item">
            <h3>31 篇</h3>
            <p>专业博客沉淀</p>
          </div>
          <div class="bento-card stat-item">
            <h3>3 项</h3>
            <p>国家级奖项</p>
          </div>
          <div class="bento-card stat-item">
            <h3>2 项</h3>
            <p>软件著作权</p>
          </div>
        </div>

        <div class="bento-card skills-card">
          <h3 class="card-title">核心技术掌握度</h3>
          
          <div class="skill-list">
            <div class="skill-item">
              <div class="skill-info"><span>前端开发与工程化 (Vue3 / VitePress)</span><span class="score">90%</span></div>
              <div class="progress-track"><div class="progress-bar cyan-purple" style="width: 90%"></div></div>
            </div>
            
            <div class="skill-item">
              <div class="skill-info"><span>后端架构与生态 (Java / Spring Boot)</span><span class="score">85%</span></div>
              <div class="progress-track"><div class="progress-bar blue-cyan" style="width: 85%"></div></div>
            </div>
            
            <div class="skill-item">
              <div class="skill-info"><span>容器化与自动化部署 (Docker / CI/CD)</span><span class="score">88%</span></div>
              <div class="progress-track"><div class="progress-bar purple-pink" style="width: 88%"></div></div>
            </div>

            <div class="skill-item">
              <div class="skill-info"><span>AI 本地化部署与 RAG (Ollama / WSL2)</span><span class="score">85%</span></div>
              <div class="progress-track"><div class="progress-bar green-cyan" style="width: 85%"></div></div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="marquee-container">
      
      <div class="marquee-track track-left">
        <div class="marquee-content">
          <div class="tech-pill" v-for="i in 2" :key="'L'+i">
            <span>⚙️ Java</span><span>⚡ Vue.js</span><span>🐍 Python</span><span>📘 TypeScript</span>
            <span>📦 MySQL</span><span>🍃 Spring Boot</span><span>🛠️ Git</span><span>🌐 Nginx</span>
          </div>
        </div>
      </div>

      <div class="marquee-track track-right">
        <div class="marquee-content right-animation">
          <div class="tech-pill" v-for="i in 2" :key="'R'+i">
            <span>🐳 Docker</span><span>🐧 WSL2</span><span>🤖 Ollama</span><span>🧠 AnythingLLM</span>
            <span>🚀 CI/CD</span><span>🔨 GitHub Actions</span><span>📝 Markdown</span><span>✨ VitePress</span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
/* 1. 整体容器：突破宽度限制，增大屏幕占比 */
.bento-wrapper {
  width: 100%; min-height: 100%; display: flex; flex-direction: column; 
  justify-content: center; align-items: center; padding: 60px 5%; box-sizing: border-box;
}

/* 布局网格扩大至 1400px */
.bento-grid {
  display: grid; grid-template-columns: 340px 1fr; gap: 32px; 
  width: 100%; max-width: 1400px; margin-bottom: 30px;
}

/* 统一毛玻璃卡片 */
.bento-card {
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border); 
  border-radius: 20px; padding: 36px; transition: all 0.3s ease;
  box-shadow: var(--vp-shadow-2);
}
.bento-card:hover { border-color: var(--vp-c-brand-1); box-shadow: var(--vp-shadow-3); transform: translateY(-2px); }

/* === 左侧：个人简介区 === */
.profile-card { display: flex; flex-direction: column; align-items: flex-start; }

/* 修复头像大小与裁切 */
.avatar-ring {
  width: 100px; height: 100px; border-radius: 50%; padding: 3px;
  background: linear-gradient(135deg, var(--vp-c-brand-1), #00f2fe);
  margin-bottom: 24px;
}
.avatar-img {
  width: 100%; height: 100%; object-fit: cover; border-radius: 50%;
  background: var(--vp-c-bg); /* 防止透明底出问题 */
}

.profile-card h2 { margin: 0 0 12px 0; font-size: 2rem; font-weight: 800; color: var(--vp-c-text-1); }

/* 美化后的身份标签：胶囊风格 */
.role-badge-container { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; }
.role-badge {
  font-size: 0.85rem; font-weight: 600; color: var(--vp-c-brand-1);
  background: var(--vp-c-default-soft); border: 1px solid var(--vp-c-border);
  padding: 6px 14px; border-radius: 20px; font-family: var(--vp-font-family-base);
}

.desc { font-size: 1rem; color: var(--vp-c-text-2); line-height: 1.7; margin: 0 0 30px 0; }

/* 简历跳转按钮 */
.resume-btn {
  display: inline-block; width: 100%; text-align: center; padding: 12px 0;
  background: var(--vp-c-brand-1); color: var(--vp-c-bg);
  font-weight: 700; border-radius: 12px; text-decoration: none;
  transition: all 0.2s ease; margin-top: auto;
}
.resume-btn:hover { opacity: 0.9; transform: scale(1.02); }

/* === 右侧：数据与内功 === */
.right-column { display: flex; flex-direction: column; gap: 32px; }

/* 字体美化后的四宫格 */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.stat-item { text-align: center; padding: 28px 10px; display: flex; flex-direction: column; justify-content: center; }
.stat-item h3 { 
  margin: 0 0 10px 0; font-size: 2.2rem; font-weight: 800; 
  color: var(--vp-c-text-1); font-family: var(--vp-font-family-base);
}
.stat-item p { margin: 0; font-size: 0.95rem; font-weight: 600; color: var(--vp-c-text-2); }

/* 内功技能条 */
.skills-card { flex-grow: 1; display: flex; flex-direction: column; justify-content: center; }
.card-title { margin: 0 0 24px 0; font-size: 1.4rem; font-weight: 700; color: var(--vp-c-text-1); }
.skill-list { display: flex; flex-direction: column; gap: 22px; }
.skill-info { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.95rem; font-weight: 600; color: var(--vp-c-text-1); }
.score { font-family: monospace; color: var(--vp-c-text-3); font-weight: normal; }
.progress-track { width: 100%; height: 8px; background: var(--vp-c-default-soft); border-radius: 4px; overflow: hidden; }
.progress-bar { height: 100%; border-radius: 4px; }
/* 渐变色系 */
.cyan-purple { background: linear-gradient(90deg, #00f2fe, var(--vp-c-brand-1)); }
.blue-cyan { background: linear-gradient(90deg, #4facfe, #00f2fe); }
.purple-pink { background: linear-gradient(90deg, var(--vp-c-brand-1), #ff0844); }
.green-cyan { background: linear-gradient(90deg, #0ba360, #3cba92); }

/* === 底部双轨走马灯 (完美还原图二的胶囊设计) === */
.marquee-container {
  width: 100%; max-width: 1400px; overflow: hidden; display: flex; flex-direction: column; gap: 16px;
  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}
.marquee-track { width: 100%; overflow: hidden; }
.marquee-content { display: flex; width: max-content; }

/* 图二风格的胶囊标签 */
.tech-pill { display: flex; gap: 16px; margin-right: 16px; }
.tech-pill span {
  display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border);
  border-radius: 12px; font-weight: 600; font-size: 0.95rem; color: var(--vp-c-text-1);
  box-shadow: var(--vp-shadow-1); white-space: nowrap; transition: border-color 0.3s;
}
.tech-pill span:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }

/* 动画速度调慢至 40s，加入双向逻辑 */
.track-left .marquee-content { animation: scrollLeft 40s linear infinite; }
.track-right .marquee-content { animation: scrollRight 40s linear infinite; }

@keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

/* 响应式适配 */
@media (max-width: 768px) {
  .bento-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .bento-wrapper { padding: 80px 20px 40px 20px; height: auto; min-height: 100vh; justify-content: flex-start; }
  
  .profile-card {
    align-items: center;
    text-align: center;
    padding: 30px 20px;
  }
  
  .avatar-ring {
    width: 85px;
    height: 85px;
  }
  
  .profile-card h2 {
    font-size: 1.7rem;
  }
  
  .role-badge-container {
    justify-content: center;
    gap: 8px;
  }
  
  .role-badge {
    font-size: 0.8rem;
    padding: 5px 12px;
  }
  
  .desc {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  .resume-btn {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
  
  .bento-card {
    padding: 20px;
  }
  
  .stat-item {
    padding: 18px 10px;
    text-align: center;
  }
  
  .stat-item h3 {
    font-size: 1.7rem;
  }
  
  .stat-item p {
    font-size: 0.85rem;
  }
  
  .skills-card {
    padding: 20px;
  }
  
  .card-title {
    font-size: 1.15rem;
  }
  
  .skill-list {
    gap: 14px;
  }
  
  .skill-info {
    font-size: 0.85rem;
  }
  
  .skill-info span:first-child {
    font-size: 0.8rem;
  }
  
  .tech-pill span {
    padding: 8px 14px;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .bento-wrapper {
    padding: 70px 16px 30px 16px;
  }
  
  .bento-card {
    padding: 16px;
  }
  
  .profile-card {
    padding: 24px 16px;
  }
  
  .avatar-ring {
    width: 75px;
    height: 75px;
  }
  
  .profile-card h2 {
    font-size: 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .stat-item {
    padding: 14px 8px;
  }
  
  .stat-item h3 {
    font-size: 1.4rem;
  }
  
  .stat-item p {
    font-size: 0.75rem;
  }
  
  .skill-info {
    font-size: 0.8rem;
    flex-wrap: wrap;
    gap: 4px;
  }
  
  .skill-info span:first-child {
    font-size: 0.75rem;
  }
  
  .tech-pill span {
    padding: 6px 10px;
    font-size: 0.75rem;
  }
  
  .marquee-container {
    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  }
}
</style>