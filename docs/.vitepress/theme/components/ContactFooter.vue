<template>
  <div class="contact-wrapper" id="contact">
    
    <!-- 底部全息氛围底光，稳住页面重心 -->
    <div class="bottom-glow"></div>

    <div class="contact-container">
      
      <!-- 核心数字名片卡 -->
      <div class="contact-card glass-panel">
        
        <!-- 顶部状态指示灯 -->
        <div class="status-badge">
          <span class="pulse-dot"></span>
          <span class="status-text">AVAILABLE FOR NEW OPPORTUNITIES</span>
        </div>

        <!-- 极客风格的现代大标题 -->
        <h2 class="title">Initiate_Connection<span class="blink">_</span></h2>
        
        <p class="desc">
          寻找全栈开发、AI 落地实习机会，或单纯的技术交流。<br>
          代码构筑边界，交流打破壁垒。随时欢迎与我探讨下一步的可能。
        </p>

        <!-- 触控级巨型按钮组 -->
        <div class="action-group">
          
          <!-- 主按钮：发送邮件 (高亮品牌色) -->
          <a href="mailto:19562523965@163.com" class="action-card primary-action">
            <div class="action-icon">✉️</div>
            <div class="action-text">
              <span class="main-txt">发送邮件</span>
              <span class="sub-txt">Drop me a line</span>
            </div>
          </a>

          <!-- 副按钮：GitHub 主页 (玻璃态) -->
          <a href="https://github.com/G1234-cod" target="_blank" class="action-card secondary-action">
            <div class="action-icon">🐙</div>
            <div class="action-text">
              <span class="main-txt">GitHub 主页</span>
              <span class="sub-txt">Explore my code</span>
            </div>
          </a>

        </div>
      </div>

    </div>

    <!-- 重新打磨的精美页脚 -->
    <footer class="footer">
      <p>© 2026 关运祥. Designed & Built with Native Code.</p>
    </footer>

  </div>
</template>

<style scoped>
/* === 基础容器 === */
.contact-wrapper {
  width: 100%; height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; position: relative;
  overflow: hidden; background-color: var(--vp-c-bg);
}

/* 底部压舱石光晕 */
.bottom-glow {
  position: absolute; bottom: -20%; left: 50%; transform: translateX(-50%);
  width: 80vw; height: 50vh; background: radial-gradient(ellipse, var(--vp-c-brand-soft) 0%, transparent 70%);
  filter: blur(100px); opacity: 0.5; pointer-events: none; z-index: 0;
}

.contact-container {
  width: 100%; max-width: 800px; padding: 0 5%;
  position: relative; z-index: 1; display: flex; justify-content: center;
}

/* === 核心数字名片卡 === */
.contact-card {
  width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border);
  border-radius: 32px; padding: 60px 40px; box-shadow: var(--vp-shadow-3);
  transition: border-color 0.3s ease;
}
.contact-card:hover { border-color: var(--vp-c-brand-1); }

/* 状态指示灯 */
.status-badge {
  display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); border-radius: 20px;
  margin-bottom: 30px;
}
.pulse-dot { width: 10px; height: 10px; background-color: #0ba360; border-radius: 50%; box-shadow: 0 0 10px #0ba360; animation: pulse 2s infinite; }
.status-text { font-family: var(--vp-font-family-base); font-size: 0.8rem; font-weight: 700; color: var(--vp-c-text-2); letter-spacing: 1px; }

@keyframes pulse { 0% { transform: scale(0.9); opacity: 0.7; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(0.9); opacity: 0.7; } }

/* 标题与闪烁光标 */
.title { font-size: 3.5rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0 0 20px 0; font-family: var(--vp-font-family-base); letter-spacing: -1px; }
.blink { font-family: monospace; color: var(--vp-c-brand-1); animation: blinkCursor 1s step-end infinite; }
@keyframes blinkCursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.desc { font-size: 1.1rem; color: var(--vp-c-text-2); line-height: 1.8; margin: 0 0 40px 0; max-width: 85%; }

/* === 巨型按钮组 === */
.action-group { display: flex; gap: 24px; width: 100%; justify-content: center; flex-wrap: wrap; }

.action-card {
  display: flex; align-items: center; gap: 16px; padding: 16px 32px;
  border-radius: 20px; text-decoration: none; transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  min-width: 240px;
}
.action-card:hover { transform: translateY(-5px); box-shadow: var(--vp-shadow-2); }

.action-icon { font-size: 1.8rem; display: flex; justify-content: center; align-items: center; }
.action-text { display: flex; flex-direction: column; align-items: flex-start; text-align: left; }
.main-txt { font-size: 1.1rem; font-weight: 800; font-family: var(--vp-font-family-base); }
.sub-txt { font-size: 0.8rem; font-weight: 600; opacity: 0.8; font-family: var(--vp-font-family-base); }

/* 主按钮：品牌色高亮 */
.primary-action { background: var(--vp-c-brand-1); border: 1px solid var(--vp-c-brand-1); color: var(--vp-c-bg) !important; }
.primary-action:hover { background: var(--vp-c-brand-2); box-shadow: 0 10px 20px rgba(var(--vp-c-brand-1), 0.3); }
.primary-action .main-txt, .primary-action .sub-txt { color: var(--vp-c-bg) !important; }

/* 副按钮：玻璃态 */
.secondary-action { background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); color: var(--vp-c-text-1) !important; }
.secondary-action:hover { border-color: var(--vp-c-brand-1); }

/* === 页脚 === */
.footer { position: absolute; bottom: 30px; left: 0; width: 100%; text-align: center; z-index: 1; }
.footer p { font-family: monospace; font-size: 0.85rem; color: var(--vp-c-text-3); margin: 0; letter-spacing: 0.5px; }

/* === 移动端适配 === */
@media (max-width: 768px) {
  .title { font-size: 2.2rem; }
  .desc { max-width: 100%; font-size: 1rem; }
  .contact-card { padding: 40px 20px; border-radius: 24px; }
  .action-group { flex-direction: column; gap: 16px; width: 100%; }
  .action-card { width: 100%; justify-content: center; }
}
</style>