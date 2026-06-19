<template>
  <div class="split-screen" id="projects">
    
    <div class="left-board">
      
      <div class="lab-blueprint">
        <div class="blueprint-grid"></div>
        <div class="blueprint-box"></div>
      </div>

      <div class="board-content">
        <div class="section-tag">04 / LABS & ARCHITECTURE</div>
        <h2 class="board-title">全栈架构<br><span class="highlight">& AI 探索</span></h2>
        <p class="board-desc">
          深耕系统底层与工程化落地。从自动化流水线的零干预部署，到私有化大模型知识库的本地拉起，用代码构建真实世界的数字孪生。
        </p>

        <div class="highlight-stats">
          <div class="h-stat">
            <div class="icon-box">🧠</div>
            <div>
              <h4>AI 深度赋能</h4>
              <p>DeepSeek-R1 / RAG</p>
            </div>
          </div>
          <div class="h-stat">
            <div class="icon-box">⚙️</div>
            <div>
              <h4>全栈自动化</h4>
              <p>Jamstack / CI/CD</p>
            </div>
          </div>
          <div class="h-stat">
            <div class="icon-box">🛡️</div>
            <div>
              <h4>底层强基建</h4>
              <p>系统架构 / 算法调优</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="right-scroll">
      <div class="projects-container">
        
        <div class="project-card glass-panel">
          <div class="card-header">
            <div class="project-icon">🏭</div>
            <h3>智眸探微：工业轴承故障诊断系统</h3>
          </div>
          <div class="tech-tags">
            <span class="tag brand">DeepSeek-R1</span>
            <span class="tag">CNN 模型</span>
            <span class="tag">预知性维护</span>
          </div>
          <p class="project-desc">
            一个集实时监测、预知性维护与智能决策于一体的工业解决方案。通过轻量化 CNN 模型与 DeepSeek-R1 大模型联动，实现了轴承异常的早期预警与自动化维护闭环，大幅降低了非计划停机损失。
          </p>
        </div>

        <div class="project-card glass-panel">
          <div class="card-header">
            <div class="project-icon">☁️</div>
            <h3>云原生个人门户系统</h3>
          </div>
          <div class="tech-tags">
            <span class="tag brand">Jamstack</span>
            <span class="tag">VitePress</span>
            <span class="tag">GitHub Actions</span>
            <span class="tag">CI/CD</span>
          </div>
          <p class="project-desc">
            基于 Jamstack 架构的全栈部署实践。通过 GitHub Actions 构建自动化流水线，实现了代码多仓库聚合、VitePress 自动编译与阿里云服务器的零宕机发布，构建了从本地写作到云端发布的闭环运维体系。
          </p>
        </div>

        <div class="project-card glass-panel">
          <div class="card-header">
            <div class="project-icon">♻️</div>
            <h3>基于深度学习的垃圾分类识别系统</h3>
          </div>
          <div class="tech-tags">
            <span class="tag brand">PyTorch</span>
            <span class="tag">长尾分布处理</span>
            <span class="tag">工厂设计模式</span>
          </div>
          <p class="project-desc">
            利用 PyTorch 构建的高精度图像识别底座。系统解决了 40 类垃圾图像的长尾分布痛点，通过工厂设计模式实现了多种主流网络架构的一键切换与评估，为智慧城市环卫场景提供了核心算法支持。
          </p>
        </div>

        <div class="project-card glass-panel">
          <div class="card-header">
            <div class="project-icon">📚</div>
            <h3>基于 AnythingLLM 的本地私有化知识库</h3>
          </div>
          <div class="tech-tags">
            <span class="tag brand">RAG 架构</span>
            <span class="tag">WSL2</span>
            <span class="tag">Docker</span>
            <span class="tag">Ollama 7B</span>
          </div>
          <p class="project-desc">
            一套部署于个人终端的私有化 RAG（检索增强生成）系统。通过解耦 Ollama 模型底座与 AnythingLLM 应用层，实现了完全本地化、数据不出内网的文档切片、向量检索与大模型智能问答服务。
          </p>
        </div>

        <div class="project-card glass-panel">
          <div class="card-header">
            <div class="project-icon">🛡️</div>
            <h3>基于双重验证机制的社区互动系统</h3>
          </div>
          <div class="tech-tags">
            <span class="tag brand">Web 安全</span>
            <span class="tag">双重验证引擎</span>
            <span class="tag">原子化结算</span>
          </div>
          <p class="project-desc">
            一个高安全性的 Web 交互平台。核心采用多模态双重验证引擎与全局拦截器架构，不仅保障了内容交互的安全，还内置了原子化积分结算引擎，确保了用户资产的安全性与数据记录的可追溯性。
          </p>
        </div>

        <div class="project-card glass-panel">
          <div class="card-header">
            <div class="project-icon">📝</div>
            <h3>在线考试管理系统</h3>
          </div>
          <div class="tech-tags">
            <span class="tag brand">RBAC 权限</span>
            <span class="tag">自动化阅卷</span>
            <span class="tag">数据可视化</span>
          </div>
          <p class="project-desc">
            一款校园场景下的考务自动化平台。实现了角色权限分离、题库增删维护、自动阅卷与深度统计分析。系统具备严密的防作弊逻辑，能一键提取考生成绩极值与违纪率，为教学评估提供数据支撑。
          </p>
        </div>

        <div class="project-card glass-panel">
          <div class="card-header">
            <div class="project-icon">🎨</div>
            <h3>多功能图形工具集系统</h3>
          </div>
          <div class="tech-tags">
            <span class="tag brand">Python</span>
            <span class="tag">Turtle + Pygame</span>
            <span class="tag">模块化解耦</span>
          </div>
          <p class="project-desc">
            一款集成益智游戏、图形绘制与教育应用的桌面系统。采用四层模块化解耦设计，通过融合 turtle 与 pygame 的跨库渲染技术，在极低系统资源占用下提供了丰富的跨模块交互娱乐功能。
          </p>
        </div>

        <div class="scroll-spacer"></div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* === 整体布局 === */
.split-screen { width: 100%; height: 100vh; display: flex; background-color: var(--vp-c-bg); overflow: hidden; }

/* === 左侧看板 === */
.left-board { 
  width: 42%; height: 100%; display: flex; align-items: center; justify-content: center; 
  border-right: 1px solid var(--vp-c-divider); position: relative; overflow: hidden;
}

/* 左侧实验室图纸背景 */
.lab-blueprint { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.05; z-index: 0; }
.blueprint-grid { width: 100%; height: 100%; background-image: linear-gradient(var(--vp-c-text-1) 1px, transparent 1px), linear-gradient(90deg, var(--vp-c-text-1) 1px, transparent 1px); background-size: 40px 40px; }
.blueprint-box { position: absolute; top: 20%; right: -50px; width: 300px; height: 300px; border: 2px dashed var(--vp-c-text-1); border-radius: 40px; transform: rotate(45deg); }

.board-content { width: 75%; position: relative; z-index: 1; }
.section-tag { font-family: monospace; font-size: 0.9rem; color: var(--vp-c-brand-1); margin-bottom: 20px; font-weight: 600; letter-spacing: 1px; }

/* 强制指定 line-height 彻底解决重叠 Bug */
.board-title { font-size: 3rem; font-weight: 800; line-height: 1.25; color: var(--vp-c-text-1); margin-bottom: 24px; letter-spacing: -0.5px; }
.board-title .highlight { color: var(--vp-c-brand-1); }
.board-desc { font-size: 1.05rem; color: var(--vp-c-text-2); line-height: 1.7; margin-bottom: 40px; }

/* 左侧能力矩阵锚点 */
.highlight-stats { display: flex; flex-direction: column; gap: 20px; border-top: 1px solid var(--vp-c-divider); padding-top: 30px; }
.h-stat { display: flex; align-items: center; gap: 16px; }
.icon-box { width: 42px; height: 42px; border-radius: 10px; background: var(--vp-c-default-soft); border: 1px solid var(--vp-c-border); display: flex; justify-content: center; align-items: center; font-size: 1.2rem; }
.h-stat h4 { font-size: 1.05rem; font-weight: 700; color: var(--vp-c-text-1); margin: 0 0 4px 0; }
.h-stat p { font-size: 0.85rem; color: var(--vp-c-text-2); margin: 0; font-family: monospace; }

/* === 右侧项目滚动区 === */
.right-scroll { 
  width: 58%; height: 100%; overflow-y: auto; padding: 100px 6% 0 6%; 
  scrollbar-width: none; scroll-behavior: smooth;
}
.right-scroll::-webkit-scrollbar { display: none; }

.projects-container { display: flex; flex-direction: column; gap: 32px; }

/* 项目卡片 */
.glass-panel {
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border);
  border-radius: 16px; padding: 32px; transition: all 0.3s ease;
  box-shadow: var(--vp-shadow-1); display: flex; flex-direction: column; gap: 16px;
  position: relative; overflow: hidden;
}
/* 卡片悬浮特效：向上轻微浮动，边框亮起品牌色 */
.glass-panel:hover { transform: translateY(-4px); border-color: var(--vp-c-brand-1); box-shadow: var(--vp-shadow-3); }
/* 底部隐约的品牌色光带 */
.glass-panel::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 3px; background: transparent; transition: background 0.3s ease; }
.glass-panel:hover::after { background: var(--vp-c-brand-1); }

/* 卡片头部 */
.card-header { display: flex; align-items: center; gap: 16px; }
.project-icon { font-size: 1.8rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); border-radius: 12px; width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; box-shadow: var(--vp-shadow-1); }
.card-header h3 { font-size: 1.4rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0; }

/* 技术栈标签 */
.tech-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 4px; }
.tag { font-size: 0.8rem; font-family: monospace; font-weight: 600; color: var(--vp-c-text-2); background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); padding: 4px 12px; border-radius: 20px; transition: all 0.2s; }
.tag.brand { color: var(--vp-c-brand-1); border-color: var(--vp-c-brand-soft); background: var(--vp-c-brand-soft); }
.glass-panel:hover .tag { border-color: var(--vp-c-text-3); }

/* 项目描述 */
.project-desc { font-size: 0.95rem; color: var(--vp-c-text-2); line-height: 1.7; margin: 0; }

.scroll-spacer { height: 20vh; }

/* === 移动端适配 === */
@media (max-width: 1024px) {
  .split-screen { flex-direction: column; overflow-y: auto; height: auto; }
  .left-board { width: 100%; height: auto; padding: 80px 5% 40px 5%; border-right: none; border-bottom: 1px solid var(--vp-c-divider); }
  .board-content { width: 100%; }
  .highlight-stats { flex-direction: row; flex-wrap: wrap; }
  .right-scroll { width: 100%; padding: 40px 5% 0 5%; overflow-y: visible; }
}
@media (max-width: 640px) {
  .card-header { flex-direction: column; align-items: flex-start; gap: 12px; }
}
</style>