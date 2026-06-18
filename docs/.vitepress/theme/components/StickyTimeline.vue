<template>
  <div class="split-screen" id="timeline">
    <div class="left-board">
      <div class="board-content">
        <h2 class="board-title">荣誉轨迹<br>& 内功基石</h2>
        <p class="board-desc">斩获 3 项国家/省级竞赛奖项，攻克 5 门 90+ 核心专业壁垒。</p>
      </div>
    </div>
    <div class="right-scroll">
      <div class="timeline-container">
        <div class="timeline-node">
          <div class="node-dot"></div>
          <div class="node-content">
            <span class="year">国家级荣誉</span>
            <h3>iCAN 创新创业大赛</h3>
            <p>荣获全国二等奖，展现全栈创新落地能力。</p>
          </div>
        </div>
        <div class="timeline-node">
          <div class="node-dot"></div>
          <div class="node-content">
            <span class="year">底层算法壁垒</span>
            <h3>《算法设计与分析》 94分</h3>
            <p>深入探讨算法复杂度与动态规划内核，高分结课。</p>
          </div>
        </div>
        <div style="height: 100px;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.split-screen { width: 100%; height: 100%; display: flex; }
.left-board { width: 40%; height: 100%; display: flex; align-items: center; justify-content: center; border-right: 1px solid var(--vp-c-divider); }
.board-content { width: 70%; }
.board-title { font-size: 2.5rem; font-weight: 800; line-height: 1.2; color: var(--vp-c-text-1); margin-bottom: 20px; }
.board-desc { font-size: 1rem; color: var(--vp-c-text-2); line-height: 1.6; }
.right-scroll { width: 60%; height: 100%; overflow-y: auto; padding: 100px 8%; scrollbar-width: none; }
.right-scroll::-webkit-scrollbar { display: none; }
.timeline-container { border-left: 2px solid var(--vp-c-divider); padding-left: 40px; display: flex; flex-direction: column; gap: 60px; }
.timeline-node { position: relative; }
.node-dot { position: absolute; left: -47px; top: 5px; width: 12px; height: 12px; border-radius: 50%; background: var(--vp-c-brand-1); box-shadow: 0 0 10px var(--vp-c-brand-1); }
.node-content .year { font-size: 0.8rem; font-family: monospace; color: var(--vp-c-text-3); margin-bottom: 8px; display: inline-block; }
.node-content h3 { font-size: 1.4rem; color: var(--vp-c-text-1); margin: 0 0 10px 0; }
.node-content p { font-size: 0.95rem; color: var(--vp-c-text-2); margin: 0; line-height: 1.5; }
</style>