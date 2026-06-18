<template>
  <div class="split-screen" id="timeline">
    <div class="left-board">
      <div class="board-content">
        <h2 class="board-title">荣誉轨迹<br>& 内功基石</h2>
        <p class="board-desc">
          从底层数据结构到全栈工程实践。<br>
          斩获 3 项国家/省级竞赛奖项，攻克 5 门 90+ 核心专业壁垒。
        </p>
        <div class="cyber-ring"></div>
      </div>
    </div>

    <div class="right-scroll">
      <div class="timeline-container">
        
        <div class="timeline-node honor">
          <div class="node-dot"></div>
          <div class="node-content">
            <span class="year">国家级荣誉</span>
            <h3>iCAN 创新创业大赛</h3>
            <p>荣获全国二等奖，展现全栈创新落地能力。</p>
          </div>
        </div>

        <div class="timeline-node academic">
          <div class="node-dot"></div>
          <div class="node-content">
            <span class="year">底层算法壁垒</span>
            <h3>《算法设计与分析》 94分</h3>
            <p>深入探讨算法复杂度与动态规划内核，高分结课。</p>
          </div>
        </div>

        <div class="timeline-node honor">
          <div class="node-dot"></div>
          <div class="node-content">
            <span class="year">专业竞赛</span>
            <h3>第十五届蓝桥杯</h3>
            <p>荣获省赛一等奖、国赛二等奖，验证扎实代码功底。</p>
          </div>
        </div>

        <div class="timeline-node academic">
          <div class="node-dot"></div>
          <div class="node-content">
            <span class="year">网络与系统架构</span>
            <h3>《计算机网络》93分 | 《操作系统》90分</h3>
            <p>深入理解 TCP/IP 协议栈与系统调度机制，夯实全栈基础。</p>
          </div>
        </div>

        <div class="timeline-node cert">
          <div class="node-dot"></div>
          <div class="node-content">
            <span class="year">行业资质</span>
            <h3>软件设计师（中级）</h3>
            <p>一次性通过国家软考，具备标准软件工程设计与系统架构能力。</p>
          </div>
        </div>
        
        <div style="height: 100px;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.split-screen {
  width: 100%;
  height: 100%;
  display: flex;
}
.left-board {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
}
.board-content {
  width: 70%;
  position: relative;
  z-index: 2;
}
.board-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #fff;
  margin-bottom: 20px;
}
.board-desc {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
}
.cyber-ring {
  position: absolute;
  top: -50px;
  left: -50px;
  width: 200px;
  height: 200px;
  border: 1px dashed rgba(120, 80, 255, 0.3);
  border-radius: 50%;
  z-index: -1;
  animation: spin 20s linear infinite;
}
@keyframes spin { 100% { transform: rotate(360deg); } }

/* 右侧滚动区设置 */
.right-scroll {
  width: 60%;
  height: 100%;
  overflow-y: auto;
  padding: 100px 8%;
  scrollbar-width: none; /* Firefox 隐藏滚动条 */
}
.right-scroll::-webkit-scrollbar { display: none; }

.timeline-container {
  border-left: 2px solid rgba(255, 255, 255, 0.1);
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}
.timeline-node { position: relative; }
.node-dot {
  position: absolute;
  left: -47px;
  top: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 10px var(--vp-c-brand-1);
}
.honor .node-dot { background: #ff0844; box-shadow: 0 0 10px #ff0844; }
.academic .node-dot { background: #00f2fe; box-shadow: 0 0 10px #00f2fe; }

.node-content .year {
  font-size: 0.8rem;
  font-family: monospace;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
  display: inline-block;
}
.node-content h3 {
  font-size: 1.4rem;
  color: #fff;
  margin: 0 0 10px 0;
}
.node-content p {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.5;
}
</style>