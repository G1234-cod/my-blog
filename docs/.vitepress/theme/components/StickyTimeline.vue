<template>
  <div class="split-screen" id="timeline">
    
    <!-- === 左侧：悬浮仪表盘看板 (Option B) === -->
    <div class="left-board">
      <div class="board-content">
        <div class="section-tag">03 / HONORS & EXPERIENCE</div>
        <h2 class="board-title">荣誉轨迹<br><span class="highlight">& 实践基石</span></h2>
        <p class="board-desc">
          奖项是工程能力的试金石，实践是连接象牙塔与工业界的桥梁。用扎实的底层基础与持续的创新力构建极客壁垒。
        </p>

        <!-- 玻璃仪表盘 (Bento Box 风格) -->
        <div class="dashboard-grid">
          <div class="dash-card">
            <div class="dash-icon">🎓</div>
            <div class="dash-data"><h4>2 <span>年</span></h4><p>国家励志奖学金</p></div>
          </div>
          <div class="dash-card">
            <div class="dash-icon">🏆</div>
            <div class="dash-data"><h4>5+ <span>项</span></h4><p>省级以上竞赛大奖</p></div>
          </div>
          <div class="dash-card wide-card">
            <div class="dash-icon">💻</div>
            <div class="dash-data"><h4>2 <span>项</span></h4><p>国家版权局软件著作权研发与登记</p></div>
          </div>
        </div>
      </div>
    </div>

    <!-- === 右侧：主题里程碑轨道 === -->
    <div class="right-scroll">
      <div class="timeline-container">
        
        <!-- 节点 1：荣誉与奖学金 -->
        <div class="timeline-node">
          <div class="node-icon">🏅</div>
          <div class="node-card glass-panel">
            <div class="card-left">
              <h3>顶尖荣誉 & 奖学金</h3>
              <p>连续两学年保持专业头部梯队，荣获国家级奖学金及省级三好学生称号，是对品学兼优与持续自驱力的最高认可。</p>
            </div>
            <div class="card-right">
              <div class="mini-badge"><span class="b-icon">🥇</span><span class="b-text">国家励志奖学金 (24-25)</span></div>
              <div class="mini-badge"><span class="b-icon">🥇</span><span class="b-text">国家励志奖学金 (23-24)</span></div>
              <div class="mini-badge"><span class="b-icon">🎖️</span><span class="b-text">河南省省级三好学生</span></div>
            </div>
          </div>
        </div>

        <!-- 节点 2：算法与底层内功 -->
        <div class="timeline-node">
          <div class="node-icon">🧠</div>
          <div class="node-card glass-panel">
            <div class="card-left">
              <h3>算法竞技 & 底层内功</h3>
              <p>代表学校出战 ACM-ICPC 区域赛。在极高强度的算法与数学建模竞技中证明代码硬实力，同时在计算机底层核心课程中斩获极值高分。</p>
            </div>
            <div class="card-right">
              <div class="mini-badge score-badge"><span class="b-icon">💯</span><span class="b-text">离散数学 97分 / 算法 94分</span></div>
              <div class="mini-badge"><span class="b-icon">🥈</span><span class="b-text">蓝桥杯全国大赛 (国二/省一)</span></div>
              <div class="mini-badge"><span class="b-icon">🥉</span><span class="b-text">全国大学生数学建模 (省三)</span></div>
            </div>
          </div>
        </div>

        <!-- 节点 3：创新与工程落地 -->
        <div class="timeline-node">
          <div class="node-icon">🚀</div>
          <div class="node-card glass-panel">
            <div class="card-left">
              <h3>创新与全栈工程落地</h3>
              <p>跳出纯理论象牙塔，致力于解决真实业务痛点。在多项国家级创新创业与计算机设计大赛中，展现卓越的全栈商业级应用研发能力。</p>
            </div>
            <div class="card-right">
              <div class="mini-badge"><span class="b-icon">🥈</span><span class="b-text">iCAN 创新创业大赛 (省二)</span></div>
              <div class="mini-badge"><span class="b-icon">🥈</span><span class="b-text">中国国际大创大赛 (省二)</span></div>
              <div class="mini-badge"><span class="b-icon">🥉</span><span class="b-text">中国计算机设计大赛 (省三)</span></div>
            </div>
          </div>
        </div>

        <!-- 节点 4：行业资质与知识产权 -->
        <div class="timeline-node">
          <div class="node-icon">📜</div>
          <div class="node-card glass-panel">
            <div class="card-left">
              <h3>行业资质 & 知识产权</h3>
              <p>独立或带队研发复杂系统，具备标准的软件工程设计、系统架构分析与复杂业务建模能力，已获国家版权局及国家软考资质认证。</p>
            </div>
            <div class="card-right">
              <div class="mini-badge ip-badge"><span class="b-icon">🪪</span><span class="b-text">2 项 国家计算机软件著作权</span></div>
              <div class="mini-badge"><span class="b-icon">💻</span><span class="b-text">软件设计师 (国家软考中级)</span></div>
              <div class="mini-badge"><span class="b-icon">🗣️</span><span class="b-text">普通话水平测试 (二级甲等)</span></div>
            </div>
          </div>
        </div>

        <!-- 节点 5：工业实践与领导力 -->
        <div class="timeline-node">
          <div class="node-icon">💼</div>
          <div class="node-card glass-panel">
            <div class="card-left">
              <h3>工业实践 & 领导力</h3>
              <p>于“编程猫”深入企业级项目研发实习，积累工业界敏捷开发经验。在校担任班长与团委部长，具备出色的团队管理与跨部门协同推进能力。</p>
            </div>
            <div class="card-right">
              <div class="mini-badge exp-badge"><span class="b-icon">🏢</span><span class="b-text">编程猫 (企业级研发实习)</span></div>
              <div class="mini-badge"><span class="b-icon">👨‍✈️</span><span class="b-text">班长 & 团委部长</span></div>
            </div>
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

/* === 左侧：仪表盘看板 === */
.left-board { 
  width: 40%; height: 100%; display: flex; align-items: center; justify-content: center; 
  border-right: 1px solid var(--vp-c-divider); position: relative;
  /* 左侧加入极其微弱的网格背景增加极客感 */
  background-image: radial-gradient(var(--vp-c-divider) 1px, transparent 1px); background-size: 24px 24px;
}
.board-content { width: 75%; position: relative; z-index: 1; }
.section-tag { font-family: monospace; font-size: 0.9rem; color: var(--vp-c-brand-1); margin-bottom: 16px; font-weight: 600; letter-spacing: 1px; }
.board-title { font-size: 2.8rem; font-weight: 800; line-height: 1.2; color: var(--vp-c-text-1); margin-bottom: 24px; letter-spacing: -0.5px; }
.board-title .highlight { color: var(--vp-c-brand-1); }
.board-desc { font-size: 1.05rem; color: var(--vp-c-text-2); line-height: 1.6; margin-bottom: 40px; }

/* 玻璃仪表盘网格 (Bento Box) */
.dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.dash-card { 
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border); border-radius: 16px; 
  padding: 20px; display: flex; flex-direction: column; gap: 12px;
  box-shadow: var(--vp-shadow-1); transition: transform 0.3s ease, border-color 0.3s ease;
}
.dash-card:hover { transform: translateY(-3px); border-color: var(--vp-c-brand-1); box-shadow: var(--vp-shadow-3); }
.wide-card { grid-column: 1 / -1; flex-direction: row; align-items: center; gap: 20px; }
.dash-icon { font-size: 2rem; background: var(--vp-c-default-soft); width: 48px; height: 48px; display: flex; justify-content: center; align-items: center; border-radius: 12px; }
.dash-data h4 { font-size: 1.6rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0; font-family: var(--vp-font-family-base); }
.dash-data h4 span { font-size: 0.9rem; color: var(--vp-c-text-3); font-weight: 600; }
.dash-data p { font-size: 0.85rem; color: var(--vp-c-text-2); margin: 4px 0 0 0; font-weight: 600; }

/* === 右侧：图标轨道时间轴 === */
.right-scroll { 
  width: 60%; height: 100%; overflow-y: auto; padding: 100px 6% 0 6%; 
  scrollbar-width: none; scroll-behavior: smooth;
}
.right-scroll::-webkit-scrollbar { display: none; }

.timeline-container { position: relative; display: flex; flex-direction: column; gap: 40px; }
/* 轨道线 */
.timeline-container::before {
  content: ''; position: absolute; left: 24px; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(to bottom, transparent, var(--vp-c-border) 5%, var(--vp-c-border) 95%, transparent);
}

.timeline-node { position: relative; padding-left: 70px; display: flex; flex-direction: column; }

/* 轨道上的大图标 */
.node-icon { 
  position: absolute; left: 6px; top: 20px; width: 38px; height: 38px; border-radius: 50%; 
  background: var(--vp-c-bg-soft); border: 2px solid var(--vp-c-border); z-index: 2; 
  display: flex; justify-content: center; align-items: center; font-size: 1.1rem;
  box-shadow: 0 0 15px rgba(0,0,0,0.2); transition: all 0.3s ease;
}
.timeline-node:hover .node-icon { border-color: var(--vp-c-brand-1); transform: scale(1.1); }

/* 时间轴卡片 */
.glass-panel {
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border); border-radius: 16px; 
  padding: 28px; transition: all 0.3s ease; box-shadow: var(--vp-shadow-1);
  /* 核心布局：60:40 左右切分 */
  display: flex; gap: 30px; align-items: center;
}
.glass-panel:hover { border-color: var(--vp-c-brand-1); box-shadow: var(--vp-shadow-3); }

/* 卡片内部左侧叙事区 */
.card-left { flex: 1.3; } /* 约占 55-60% */
.card-left h3 { font-size: 1.3rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0 0 12px 0; letter-spacing: 0.5px;}
.card-left p { font-size: 0.95rem; color: var(--vp-c-text-2); margin: 0; line-height: 1.6; }

/* 卡片内部右侧数据标签区 */
.card-right { flex: 1; display: flex; flex-direction: column; gap: 10px; border-left: 1px dashed var(--vp-c-border); padding-left: 20px; }

/* 精美的右侧小栏框 (Mini Badges) */
.mini-badge {
  display: flex; align-items: center; gap: 8px; padding: 8px 12px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); border-radius: 8px;
  font-size: 0.85rem; font-weight: 600; color: var(--vp-c-text-1); transition: border-color 0.2s ease;
}
.mini-badge:hover { border-color: var(--vp-c-text-2); }
.b-icon { font-size: 1rem; }
.b-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* 特定高亮标签颜色 */
.score-badge { border-color: rgba(0, 242, 254, 0.4); color: #00f2fe; }
.ip-badge { border-color: rgba(187, 0, 255, 0.4); color: #b0f; }
.exp-badge { border-color: rgba(11, 163, 96, 0.4); color: #0ba360; }

.scroll-spacer { height: 30vh; }

/* === 移动端适配 === */
@media (max-width: 1024px) {
  .split-screen { flex-direction: column; overflow-y: auto; height: auto; }
  .left-board { width: 100%; height: auto; padding: 80px 5% 40px 5%; border-right: none; border-bottom: 1px solid var(--vp-c-divider); }
  .board-content { width: 100%; }
  .right-scroll { width: 100%; padding: 60px 5% 0 5%; overflow-y: visible; }
  /* 移动端卡片内部改为上下堆叠 */
  .glass-panel { flex-direction: column; gap: 20px; align-items: flex-start; }
  .card-right { width: 100%; border-left: none; border-top: 1px dashed var(--vp-c-border); padding-left: 0; padding-top: 20px; }
}
</style>