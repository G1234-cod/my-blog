<template>
  <div class="split-screen" id="timeline">
    
    <div class="left-board">
      
      <div class="cyber-rings">
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <div class="ring ring-3"></div>
      </div>

      <div class="board-content">
        <div class="section-tag">03 / HONORS & EXPERIENCE</div>
        <h2 class="board-title">荣誉轨迹<br><span class="highlight">& 实践基石</span></h2>
        
        <p class="board-desc">
          奖项是工程能力的试金石，实践是连接象牙塔与工业界的桥梁。用扎实的底层基础与持续的创新力构建极客壁垒。
        </p>

        <div class="highlight-stats">
          <div class="h-stat">
            <h4>2 <span>项</span></h4>
            <p>国家软件著作权</p>
          </div>
          <div class="h-stat">
            <h4>5+<span>项</span></h4>
            <p>省级以上竞赛大奖</p>
          </div>
          <div class="h-stat">
            <h4>2 <span>年</span></h4>
            <p>国家励志奖学金</p>
          </div>
        </div>
      </div>
    </div>

    <div class="right-scroll">
      <div class="timeline-container">
        
        <div class="timeline-node honor-node">
          <div class="node-indicator"><div class="dot"></div></div>
          <div class="node-content glass-panel">
            <span class="year-badge">顶尖荣誉 & 奖学金</span>
            <h3>国家励志奖学金 (连续两年)</h3>
            <p>荣获 2023-2025 学年国家励志奖学金，并获评“河南省省级三好学生”。这是对品学兼优与持续自驱力的最高认可。</p>
          </div>
        </div>

        <div class="timeline-node algo-node">
          <div class="node-indicator"><div class="dot"></div></div>
          <div class="node-content glass-panel">
            <span class="year-badge">算法与学术先锋</span>
            <h3>ACM-ICPC & 数模竞赛</h3>
            <p>代表学校出战 ACM-ICPC 区域赛；斩获全国大学生数学建模竞赛省级三等奖、蓝桥杯省级三等奖。在极高强度的算法与数学建模竞技中证明硬实力。</p>
          </div>
        </div>

        <div class="timeline-node project-node">
          <div class="node-indicator"><div class="dot"></div></div>
          <div class="node-content glass-panel">
            <span class="year-badge">创新与工程落地</span>
            <h3>iCAN & 大学生创新大赛</h3>
            <p>包揽 iCAN 创新创业大赛省级二等奖、中国国际大学生创新大赛省级二等奖、计算机设计大赛省级三等奖。跳出纯理论，展现卓越的全栈商业级应用落地能力。</p>
          </div>
        </div>

        <div class="timeline-node cert-node">
          <div class="node-indicator"><div class="dot"></div></div>
          <div class="node-content glass-panel">
            <span class="year-badge">行业资质 & 知识产权</span>
            <h3>2 项国家软著 & 软件设计师</h3>
            <p>独立/带队研发系统并斩获 2 项国家版权局软件著作权。一次性通过国家软考（软件设计师中级），具备标准的系统架构分析与复杂业务建模能力。普通话二级甲等。</p>
          </div>
        </div>

        <div class="timeline-node exp-node">
          <div class="node-indicator"><div class="dot"></div></div>
          <div class="node-content glass-panel">
            <span class="year-badge">工业实践 & 领导力</span>
            <h3>编程猫实习 & 班团核心骨干</h3>
            <p>于“编程猫”深入企业级项目实习，积累真实工业界敏捷开发与协同经验。在校期间担任班长与团委部长，具备出色的团队管理、跨部门沟通与项目统筹推进能力。</p>
          </div>
        </div>

        <div class="timeline-node academic-node">
          <div class="node-indicator"><div class="dot"></div></div>
          <div class="node-content glass-panel">
            <span class="year-badge">底层内功极值</span>
            <h3>单学期均分 91.67 & 核心高分</h3>
            <p>单学期平均成绩高达 91.67 分。深入计算机科学深水区，在《算法设计与分析》(94分)、《计算机网络》(93分) 等核心底层课程中斩获极高分，拒绝成为 API 调用工程师。</p>
          </div>
        </div>
        
        <div class="scroll-spacer"></div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* === 整体双栏布局 === */
.split-screen { width: 100%; height: 100vh; display: flex; background-color: var(--vp-c-bg); overflow: hidden; }

/* === 左侧固定看板 === */
.left-board { 
  width: 42%; height: 100%; display: flex; align-items: center; justify-content: center; 
  border-right: 1px solid var(--vp-c-divider); position: relative; overflow: hidden;
}

/* 纯 CSS 赛博星环动画 */
.cyber-rings { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 600px; z-index: 0; opacity: 0.15; pointer-events: none; }
.ring { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; border: 1px dashed var(--vp-c-brand-1); }
.ring-1 { animation: spin 30s linear infinite; }
.ring-2 { width: 80%; height: 80%; top: 10%; left: 10%; border: 1px solid var(--vp-c-text-2); animation: spin-reverse 20s linear infinite; }
.ring-3 { width: 60%; height: 60%; top: 20%; left: 20%; border: 2px dotted var(--vp-c-brand-1); animation: spin 15s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }
@keyframes spin-reverse { 100% { transform: rotate(-360deg); } }

.board-content { width: 75%; position: relative; z-index: 1; }
.section-tag { font-family: monospace; font-size: 0.9rem; color: var(--vp-c-brand-1); margin-bottom: 20px; font-weight: 600; letter-spacing: 1px; }
.board-title { font-size: 3rem; font-weight: 800; line-height: 1.2; color: var(--vp-c-text-1); margin-bottom: 24px; letter-spacing: -0.5px; }
.board-title .highlight { color: var(--vp-c-brand-1); }
.board-desc { font-size: 1.05rem; color: var(--vp-c-text-2); line-height: 1.7; margin-bottom: 40px; }

/* 左侧高光数据锚点 */
.highlight-stats { display: flex; gap: 30px; border-top: 1px solid var(--vp-c-divider); padding-top: 30px; }
.h-stat h4 { font-size: 1.8rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0 0 5px 0; font-family: var(--vp-font-family-base); }
.h-stat h4 span { font-size: 1rem; color: var(--vp-c-text-3); font-weight: 600; }
.h-stat p { font-size: 0.85rem; color: var(--vp-c-text-2); margin: 0; font-weight: 600; }

/* === 右侧滚动时间轴 === */
.right-scroll { 
  width: 58%; height: 100%; overflow-y: auto; padding: 120px 8% 0 8%; 
  scrollbar-width: none; scroll-behavior: smooth;
}
.right-scroll::-webkit-scrollbar { display: none; }

.timeline-container { position: relative; display: flex; flex-direction: column; gap: 40px; }
.timeline-container::before {
  content: ''; position: absolute; left: 19px; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(to bottom, transparent, var(--vp-c-divider) 5%, var(--vp-c-divider) 95%, transparent);
}

.timeline-node { position: relative; padding-left: 60px; display: flex; flex-direction: column; }

/* 节点指示器圆点与色彩系统 */
.node-indicator { position: absolute; left: 12px; top: 24px; width: 16px; height: 16px; border-radius: 50%; background: var(--vp-c-bg); border: 3px solid var(--vp-c-brand-1); z-index: 2; box-shadow: 0 0 10px var(--vp-c-brand-1); }

.honor-node .node-indicator { border-color: #ff0844; box-shadow: 0 0 10px rgba(255,8,68,0.5); }
.algo-node .node-indicator { border-color: #b0f; box-shadow: 0 0 10px rgba(187,0,255,0.5); }
.project-node .node-indicator { border-color: #00f2fe; box-shadow: 0 0 10px rgba(0,242,254,0.5); }
.cert-node .node-indicator { border-color: #f5a623; box-shadow: 0 0 10px rgba(245,166,35,0.5); }
.exp-node .node-indicator { border-color: #0ba360; box-shadow: 0 0 10px rgba(11,163,96,0.5); }
.academic-node .node-indicator { border-color: var(--vp-c-brand-1); }

/* 时间轴卡片 */
.glass-panel {
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border);
  border-radius: 16px; padding: 30px; transition: all 0.3s ease;
  box-shadow: var(--vp-shadow-1);
}
.glass-panel:hover { border-color: var(--vp-c-brand-1); transform: translateX(5px); box-shadow: var(--vp-shadow-3); }

.year-badge { display: inline-block; font-size: 0.8rem; font-family: monospace; font-weight: 600; color: var(--vp-c-bg); background: var(--vp-c-text-1); padding: 4px 12px; border-radius: 12px; margin-bottom: 16px; }
.timeline-node h3 { font-size: 1.3rem; font-weight: 700; color: var(--vp-c-text-1); margin: 0 0 12px 0; }
.timeline-node p { font-size: 0.95rem; color: var(--vp-c-text-2); margin: 0; line-height: 1.6; }

.scroll-spacer { height: 30vh; }

@media (max-width: 1024px) {
  .split-screen { flex-direction: column; overflow-y: auto; height: auto; }
  .left-board { width: 100%; height: auto; padding: 80px 5% 40px 5%; border-right: none; border-bottom: 1px solid var(--vp-c-divider); }
  .board-content { width: 100%; }
  .cyber-rings { display: none; } 
  .highlight-stats { flex-wrap: wrap; }
  .right-scroll { width: 100%; padding: 60px 5% 0 5%; overflow-y: visible; }
  .timeline-container::before { left: 19px; }
}
</style>