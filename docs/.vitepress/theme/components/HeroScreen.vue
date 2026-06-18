<template>
  <div class="hero-wrapper" id="hero">
    <div class="glass-card">
      <div class="slogan-badge">> System.out.println("Hello, World.");</div>
      <h1 class="main-title">探索全栈架构，<br>进军 AI 应用开发。</h1>
      <p class="sub-title">洛阳理工学院 · 软件工程 | 2027 届</p>
    </div>
    <div class="scroll-indicator">
      <div class="mouse"></div>
      <span>向下滚动激活数字孪生体</span>
    </div>
  </div>
</template>

<style scoped>
.hero-wrapper {
  width: 100%; height: 100%; display: flex; flex-direction: column;
  justify-content: center; align-items: center; position: relative;
  /* 适应性赛博网格：使用 VitePress 的边界线变量绘制 */
  background-image: 
    linear-gradient(var(--vp-c-divider) 1px, transparent 1px),
    linear-gradient(90deg, var(--vp-c-divider) 1px, transparent 1px);
  background-size: 40px 40px;
}
.glass-card {
  width: 90%; max-width: 650px; padding: 50px 40px; border-radius: 20px;
  text-align: center; transform: translateY(-20px);
  background: var(--vp-c-bg-soft);
  backdrop-filter: blur(20px);
  border: 1px solid var(--vp-c-border);
  box-shadow: var(--vp-shadow-3);
}
.slogan-badge {
  display: inline-block; font-family: monospace; font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-default-soft);
  padding: 6px 16px; border-radius: 20px; margin-bottom: 24px;
}
.main-title { font-size: 2.8rem; font-weight: 800; color: var(--vp-c-text-1); line-height: 1.4; margin: 0 0 20px 0; }
.sub-title { font-size: 1.1rem; color: var(--vp-c-text-2); margin: 0; letter-spacing: 2px; }
.scroll-indicator { position: absolute; bottom: 6vh; display: flex; flex-direction: column; align-items: center; gap: 12px; animation: bounce 2s infinite ease-in-out; }
.scroll-indicator span { font-size: 0.75rem; color: var(--vp-c-text-2); letter-spacing: 2px; }
.mouse { width: 22px; height: 34px; border: 2px solid var(--vp-c-text-2); border-radius: 12px; position: relative; }
.mouse::before { content: ''; position: absolute; top: 6px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; background: var(--vp-c-text-2); border-radius: 50%; }
@keyframes bounce { 0%, 100% { transform: translateY(0); opacity: 0.5; } 50% { transform: translateY(10px); opacity: 1; } }
</style>