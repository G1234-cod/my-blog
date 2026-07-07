<template>
  <div class="split-screen" id="projects">
    
    <div class="left-board">
      
      <div class="lab-blueprint">
        <div class="blueprint-grid"></div>
      </div>

      <div class="board-content">
        <div class="section-tag">04 / LABS & ARCHITECTURE</div>
        <h2 class="board-title">全栈架构<br><span class="highlight">& AI 探索</span></h2>
        <p class="board-desc">
          右侧实验室产出的系统，已接受工业界与学术界的双重检验，斩获多项省级创新大奖并取得国家软件著作权。从自动化流水线的零干预部署，到私有化大模型知识库的本地拉起，用代码构建真实世界的数字孪生。
        </p>

        <div class="highlight-stats">
          <div class="h-stat">
            <div class="icon-box">🧠</div>
            <div class="stat-text">
              <h4>大模型与算法驱动</h4>
              <p>实现轻量化 CNN 与 DeepSeek 深度联动，打通私有化 RAG 知识库落地闭环。</p>
            </div>
          </div>
          <div class="h-stat">
            <div class="icon-box">☁️</div>
            <div class="stat-text">
              <h4>云原生架构与运维</h4>
              <p>基于 Jamstack 与 Docker 容器化，构建从 GitHub Actions 到阿里云的零宕机发布流水线。</p>
            </div>
          </div>
          <div class="h-stat">
            <div class="icon-box">🛡️</div>
            <div class="stat-text">
              <h4>安全校验与底层重构</h4>
              <p>设计多模态双重验证引擎，底层模块高度解耦，获多项国家版权局软著认证。</p>
            </div>
          </div>
        </div>

      </div>

      <div class="system-status">
        <div class="pulse-dot"></div>
        <span>SYSTEM.ONLINE / 8 LAB NODES ACTIVE</span>
      </div>
    </div>

    <div class="right-scroll">
      <div class="projects-container">
        
        <a href="/projects/bearing-diagnosis" class="project-card glass-panel">
          <div class="card-header">
            <h3>智眸探微：工业轴承故障诊断系统</h3>
            <div class="title-badge gold-badge"><span class="b-icon">🏆</span> 省级二等奖</div>
          </div>
          <div class="tech-tags">
            <span class="tag brand">DeepSeek-R1</span>
            <span class="tag">CNN 模型</span>
            <span class="tag">预知性维护</span>
          </div>
          <p class="project-desc">
            一个集实时监测、预知性维护与智能决策于一体的工业解决方案。通过轻量化 CNN 模型与 DeepSeek-R1 大模型联动，实现了轴承异常的早期预警与自动化维护闭环，大幅降低了非计划停机损失。
          </p>
        </a>

        <a href="/projects/market-transactions" class="project-card glass-panel">
          <div class="card-header">
            <h3>智能二手商品发布助手</h3>
            <div class="title-badge gold-badge"><span class="b-icon">🌟</span> AI 全栈应用</div>
          </div>
          <div class="tech-tags">
            <span class="tag brand">YOLOv8 + CLIP</span>
            <span class="tag">以图搜图</span>
            <span class="tag">AI 智能定价</span>
          </div>
          <p class="project-desc">
            一款面向二手商品交易的 AI 发布平台。用户只需上传一张商品照片，系统自动完成品类识别、市场查价、瑕疵检测、智能定价、流式文案生成，全流程仅需 3 次点击即可一键发布到商城。
          </p>
        </a>

        <a href="/projects/online-exam" class="project-card glass-panel">
          <div class="card-header">
            <h3>在线考试管理系统</h3>
            <div class="title-badge purple-badge"><span class="b-icon">🪪</span> 国家软著登记</div>
          </div>
          <div class="tech-tags">
            <span class="tag brand">RBAC 权限</span>
            <span class="tag">自动化阅卷</span>
            <span class="tag">极值数据分析</span>
          </div>
          <p class="project-desc">
            一款校园场景下的考务自动化平台。实现了角色权限分离、题库增删维护、自动阅卷与深度统计分析。系统具备严密的防作弊逻辑，能一键提取考生成绩极值与违纪率，为教学质量评估提供数据支撑。
          </p>
        </a>

        <a href="/projects/graphic-tools" class="project-card glass-panel">
          <div class="card-header">
            <h3>多功能图形工具集系统</h3>
            <div class="title-badge purple-badge"><span class="b-icon">🪪</span> 国家软著登记</div>
          </div>
          <div class="tech-tags">
            <span class="tag brand">Python</span>
            <span class="tag">Turtle + Pygame</span>
            <span class="tag">跨库渲染解耦</span>
          </div>
          <p class="project-desc">
            一款集成益智游戏、图形绘制与教育应用的桌面系统。采用四层模块化解耦设计，通过融合 turtle 与 pygame 的跨库渲染技术，在极低资源占用下提供了丰富的交互娱乐功能。便于对学生进行python教学。
          </p>
        </a>

        <a href="/projects/local-rag" class="project-card glass-panel">
          <div class="card-header">
            <h3>基于 AnythingLLM 的本地私有化知识库</h3>
            <div class="title-badge gray-badge"><span class="b-icon">🔒</span> 纯内网物理隔离</div>
          </div>
          <div class="tech-tags">
            <span class="tag brand">RAG 架构</span>
            <span class="tag">WSL2 / Docker</span>
            <span class="tag">AnythingLLM</span>
          </div>
          <p class="project-desc">
            一套部署于 WSL2 容器环境的私有化 RAG（检索增强生成）系统。通过解耦 Ollama 模型底座与 AnythingLLM 应用层，实现了完全本地化、数据不出内网的文档切片、向量检索与智能问答服务。
          </p>
        </a>

        <a href="/projects/community-forum" class="project-card glass-panel">
          <div class="card-header">
            <h3>基于双重验证机制的社区互动系统</h3>
            <div class="title-badge cyan-badge"><span class="b-icon">⏳</span> 软著审核中</div>
          </div>
          <div class="tech-tags">
            <span class="tag brand">Web 安全架构</span>
            <span class="tag">双重验证引擎</span>
            <span class="tag">原子化结算</span>
          </div>
          <p class="project-desc">
            一个高安全性的 Web 交互平台。核心采用了多模态双重验证引擎与全局拦截器架构，不仅保障了内容交互的安全，还内置了原子化积分结算引擎，确保了用户资产的安全性与数据记录的可追溯性。
          </p>
        </a>

        <a href="/projects/garbage-classification" class="project-card glass-panel">
          <div class="card-header">
            <h3>基于深度学习的垃圾分类识别系统</h3>
          </div>
          <div class="tech-tags">
            <span class="tag brand">PyTorch</span>
            <span class="tag">长尾分布对抗</span>
            <span class="tag">工厂设计模式</span>
          </div>
          <p class="project-desc">
            利用 PyTorch 构建的高精度图像识别底座。系统解决了 40 类垃圾图像的长尾分布痛点，通过工厂设计模式实现了多种主流网络架构的一键切换与评估，为智慧城市环卫场景提供了算法支持。
          </p>
        </a>

        <a href="/projects/cloud-portal" class="project-card glass-panel">
          <div class="card-header">
            <h3>云原生个人门户系统 (Jamstack + CI/CD)</h3>
          </div>
          <div class="tech-tags">
            <span class="tag brand">Jamstack</span>
            <span class="tag">VitePress</span>
            <span class="tag">GitHub Actions</span>
          </div>
          <p class="project-desc">
            基于 Jamstack 架构的个人知识库与作品集。通过 GitHub Actions 构建自动化流水线，实现了代码多仓库聚合、VitePress 自动编译与 阿里云服务器/GitHub Pages 双平台 的零宕机发布，构建了从本地写作到云端发布的闭环运维体系。
          </p>
        </a>

        <div class="scroll-spacer"></div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* === 整体布局 === */
.split-screen { width: 100%; height: 100%; display: flex; background-color: var(--vp-c-bg); overflow: hidden; }

/* === 左侧看板：向左侧靠拢 === */
.left-board { 
  width: 45%; height: 100%; 
  display: flex; align-items: center; 
  justify-content: flex-start;
  padding-left: 120px;
  padding-right: 40px;
  border-right: 1px solid var(--vp-c-divider); position: relative; overflow: hidden;
}

.lab-blueprint { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.05; z-index: 0; }
.blueprint-grid { width: 100%; height: 100%; background-image: linear-gradient(var(--vp-c-text-1) 1px, transparent 1px), linear-gradient(90deg, var(--vp-c-text-1) 1px, transparent 1px); background-size: 40px 40px; }

.board-content { width: 100%; max-width: 520px; position: relative; z-index: 1; }
.section-tag { font-family: monospace; font-size: 0.9rem; color: var(--vp-c-brand-1); margin-bottom: 20px; font-weight: 600; letter-spacing: 1px; }

.board-title { font-size: 3rem; font-weight: 800; line-height: 1.25; color: var(--vp-c-text-1); margin-bottom: 24px; letter-spacing: -0.5px; }
.board-title .highlight { color: var(--vp-c-brand-1); }
.board-desc { font-size: 1.05rem; color: var(--vp-c-text-2); line-height: 1.7; margin-bottom: 40px; }

.highlight-stats { display: flex; flex-direction: column; gap: 24px; border-top: 1px solid var(--vp-c-divider); padding-top: 30px; }
.h-stat { display: flex; align-items: flex-start; gap: 16px; }
.icon-box { width: 42px; height: 42px; border-radius: 12px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border); display: flex; justify-content: center; align-items: center; font-size: 1.2rem; flex-shrink: 0; box-shadow: var(--vp-shadow-1); }
.stat-text h4 { font-size: 1.1rem; font-weight: 700; color: var(--vp-c-text-1); margin: 0 0 6px 0; font-family: var(--vp-font-family-base); }
.stat-text p { font-size: 0.9rem; color: var(--vp-c-text-2); margin: 0; line-height: 1.5; font-weight: 500;}

.system-status { position: absolute; bottom: 30px; left: 40px; display: flex; align-items: center; gap: 10px; z-index: 2;}
.pulse-dot { width: 8px; height: 8px; background-color: #0ba360; border-radius: 50%; box-shadow: 0 0 10px #0ba360; animation: pulse 2s infinite; }
.system-status span { font-family: monospace; font-size: 0.75rem; color: var(--vp-c-text-3); font-weight: 600; letter-spacing: 1px; }
@keyframes pulse { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(11, 163, 96, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(11, 163, 96, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(11, 163, 96, 0); } }

.right-scroll { 
  width: 55%; height: 100%; overflow-y: auto; 
  padding: 100px 10% 0 60px;
  scrollbar-width: none; scroll-behavior: smooth;
}
.right-scroll::-webkit-scrollbar { display: none; }

.projects-container { display: flex; flex-direction: column; gap: 32px; }

.glass-panel {
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border);
  border-radius: 16px; padding: 32px; transition: all 0.3s ease;
  box-shadow: var(--vp-shadow-1); display: flex; flex-direction: column; gap: 14px;
  position: relative; overflow: hidden;
}
.glass-panel:hover { transform: translateX(4px); border-color: var(--vp-c-brand-1); box-shadow: var(--vp-shadow-3); }
.glass-panel::after { content: ''; position: absolute; left: 0; top: 0; width: 4px; height: 100%; background: transparent; transition: background 0.3s ease; }
.glass-panel:hover::after { background: var(--vp-c-brand-1); }

.card-header { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
.card-header h3 { font-size: 1.4rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0; line-height: 1.3;}

.title-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; border: 1px solid transparent; }
.gold-badge { color: #f5a623; background: rgba(245, 166, 35, 0.1); border-color: rgba(245, 166, 35, 0.3); }
.purple-badge { color: #b0f; background: rgba(187, 0, 255, 0.1); border-color: rgba(187, 0, 255, 0.3); }
.cyan-badge { color: #00f2fe; background: rgba(0, 242, 254, 0.1); border-color: rgba(0, 242, 254, 0.3); }
.gray-badge { color: var(--vp-c-text-2); background: var(--vp-c-default-soft); border-color: var(--vp-c-border); }

.tech-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 2px; }
.tag { 
  font-size: 0.85rem; font-family: var(--vp-font-family-base); font-weight: 600;
  color: var(--vp-c-text-2); background: transparent; 
  border: 1px solid var(--vp-c-border); padding: 4px 12px; border-radius: 8px; transition: all 0.2s; 
}
.tag.brand { color: var(--vp-c-brand-1); border-color: var(--vp-c-brand-soft); background: var(--vp-c-brand-soft); }
.glass-panel:hover .tag { border-color: var(--vp-c-text-3); }

.project-desc { font-size: 0.95rem; color: var(--vp-c-text-2); line-height: 1.7; margin: 0; }

.scroll-spacer { height: 20vh; }

a.project-card {
  text-decoration: none !important; 
  color: inherit; 
  cursor: pointer; 
  display: flex; 
}
a.project-card:hover {
  text-decoration: none !important; 
}

@media (max-width: 768px) {
  .split-screen { 
    flex-direction: column; 
    overflow-y: auto; 
    height: auto; 
  }
  
  .left-board { 
    width: 100%; 
    height: auto; 
    padding: 80px 20px 35px 20px; 
    justify-content: flex-start; 
    border-right: none; 
    border-bottom: 1px solid var(--vp-c-divider);
  }
  
  .board-content { 
    max-width: 100%; 
  }
  
  .section-tag { font-size: 0.85rem; }
  
  .board-title {
    font-size: 2.1rem;
    line-height: 1.2;
  }
  
  .board-desc {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  .highlight-stats {
    gap: 18px;
    padding-top: 22px;
  }
  
  .h-stat {
    gap: 14px;
  }
  
  .icon-box {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  
  .stat-text h4 {
    font-size: 1rem;
    margin-bottom: 4px;
  }
  
  .stat-text p {
    font-size: 0.85rem;
    line-height: 1.5;
  }
  
  .system-status { 
    position: relative; 
    bottom: 0; 
    left: 0; 
    margin-top: 28px; 
  }
  
  .right-scroll { 
    width: 100%; 
    padding: 40px 20px 0 20px; 
    overflow-y: visible; 
  }
  
  .projects-container {
    gap: 22px;
  }
  
  .glass-panel {
    padding: 22px;
    gap: 12px;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .card-header h3 {
    font-size: 1.15rem;
    line-height: 1.35;
  }
  
  .title-badge {
    font-size: 0.78rem;
    padding: 4px 10px;
    align-self: flex-start;
  }
  
  .tech-tags {
    gap: 8px;
    margin-top: 0;
    flex-wrap: wrap;
  }
  
  .tag {
    font-size: 0.82rem;
    padding: 4px 11px;
  }
  
  .project-desc {
    font-size: 0.9rem;
    line-height: 1.6;
  }
}

@media (max-width: 480px) {
  .left-board {
    padding: 70px 16px 30px 16px;
  }
  
  .right-scroll {
    padding: 35px 16px 0 16px;
  }
  
  .board-title {
    font-size: 1.8rem;
  }
  
  .board-desc {
    font-size: 0.9rem;
  }
  
  .highlight-stats {
    gap: 14px;
  }
  
  .icon-box {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
  
  .stat-text h4 {
    font-size: 0.95rem;
  }
  
  .stat-text p {
    font-size: 0.8rem;
  }
  
  .glass-panel {
    padding: 18px;
  }
  
  .card-header h3 {
    font-size: 1.05rem;
    line-height: 1.3;
  }
  
  .title-badge {
    font-size: 0.72rem;
    padding: 3px 8px;
  }
  
  .tag {
    font-size: 0.78rem;
    padding: 3px 9px;
  }
  
  .project-desc {
    font-size: 0.85rem;
  }
}
</style>