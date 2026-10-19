<template>
  <header class="ed-hero">
    <p class="hero-kicker mono">GUAN YUNXIANG · 全栈开发 / AI 工程</p>
    <h1 class="hero-title">
      把复杂的算法逻辑，<br />落成<span class="em">优雅的自动化流水线</span>。
    </h1>
    <p class="hero-lead">
      我是关运祥，来自洛阳理工学院的软件工程学生。专注全栈应用研发与大模型本地化落地，
      崇尚「知其然更知其所以然」。这里沉淀我的项目作品、技术写作与思考。
    </p>
    <div class="hero-cta">
      <a class="btn-primary" href="#selected-work">浏览精选作品</a>
      <a class="btn-ghost mono" href="/Guanyunxiang_Resume_AI.pdf" target="_blank">在线简历 ↗</a>
    </div>
    <p class="hero-note mono">正在寻找全栈开发 / AI 落地方向的实习机会</p>
  </header>
</template>

<style scoped>
/* 编辑部 Hero：衬线大标题 + 大留白，无光斑/无玻璃 */
.ed-hero {
  padding: clamp(56px, 10vh, 120px) 0 clamp(48px, 8vh, 96px);
  border-bottom: 1px solid var(--vp-c-divider);
}
.hero-kicker {
  margin: 0 0 22px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: var(--vp-c-brand-1);
}
.hero-title {
  margin: 0;
  max-width: 18em;
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 5.2vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.18;
  color: var(--vp-c-text-1);
}
.hero-title .em {
  color: var(--vp-c-brand-1);
}
.hero-lead {
  margin: 26px 0 0;
  max-width: 60ch;
  font-size: 1.06rem;
  line-height: 1.85;
  color: var(--vp-c-text-2);
}
.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}
.btn-primary,
.btn-ghost {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 22px;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}
.btn-primary {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}
.btn-primary:hover {
  background: var(--vp-c-brand-2);
}
.btn-primary:active {
  transform: scale(0.97);
}
.btn-ghost {
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
}
.btn-ghost:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.btn-primary:focus-visible,
.btn-ghost:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.hero-note {
  margin: 26px 0 0;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
}
@media (max-width: 768px) {
  .ed-hero {
    padding: 40px 0 44px;
  }
}
</style>
