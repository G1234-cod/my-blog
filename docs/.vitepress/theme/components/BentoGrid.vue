<template>
  <div class="bento-grid">
    <div class="bento-card large-card hover-effect">
      <div class="card-content">
        <div class="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="local-svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3>社区交互系统 (双重验证)</h3>
        <p>独立撰写项目手册并完成软件著作权登记认证的系统级工程实践。</p>
        <span class="tech-badge">系统工程</span>
      </div>
    </div>

    <div class="bento-card hover-effect">
      <div class="card-content">
        <div class="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="local-svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
        </div>
        <h3>云服务器自动化部署</h3>
        <p>基于 Nginx 与 SSL 证书的手动配置，结合 GitHub Actions 实现 CI/CD 自动化流水线。</p>
      </div>
    </div>

    <div class="bento-card small-card hover-effect">
      <div class="card-content centered">
        <h2>Top 5%</h2>
        <p>专业学业排名</p>
        <p class="sub-text">软件设计师(中级)</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.bento-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.large-card {
  grid-column: span 2;
}

@media (max-width: 768px) {
  .large-card { grid-column: span 1; }
}

.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.icon-wrapper { margin-bottom: 1rem; }
.local-svg { width: 32px; height: 32px; color: var(--vp-c-brand-1); }
h3 { margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600; color: var(--vp-c-text-1); }
p { color: var(--vp-c-text-2); font-size: 0.9rem; line-height: 1.5; margin: 0 0 1rem 0; }
.sub-text { font-size: 0.8rem; color: var(--vp-c-text-3); margin-top: 0.5rem; }

.centered {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.centered h2 { font-size: 2.5rem; margin: 0; color: var(--vp-c-brand-1); }

.tech-badge {
  font-size: 0.75rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 2px 8px;
  border-radius: 12px;
  font-family: var(--vp-font-family-mono);
}
</style>