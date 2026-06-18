<template>
  <div class="contact-wrapper" id="contact">
    <div class="contact-box">
      <h2>> Initiate_Connection()</h2>
      <p>寻找全栈开发、AI 落地实习机会，或单纯的技术交流。</p>
      <div class="actions">
        <a href="mailto:admin@example.com" class="btn primary">@ 发送邮件</a>
        <a href="https://github.com/" target="_blank" class="btn secondary">GitHub 主页 ↗</a>
      </div>
    </div>
    <div class="footer-text">
      <p>© 2026 关运祥. Designed & Built with Native Code.</p>
    </div>
  </div>
</template>

<style scoped>
.contact-wrapper { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; }
.contact-box { text-align: center; max-width: 600px; }
.contact-box h2 { font-size: 2.2rem; color: var(--vp-c-text-1); font-family: monospace; margin: 0 0 20px 0; }
.contact-box p { color: var(--vp-c-text-2); font-size: 1.1rem; margin-bottom: 40px; }
.actions { display: flex; gap: 20px; justify-content: center; }
.btn { padding: 12px 30px; border-radius: 8px; font-weight: 600; text-decoration: none; transition: all 0.2s ease; }
.primary { background: var(--vp-c-brand-1); color: var(--vp-c-bg); }
.primary:hover { opacity: 0.9; transform: scale(1.05); }
.secondary { background: transparent; color: var(--vp-c-text-1); border: 1px solid var(--vp-c-border); }
.secondary:hover { background: var(--vp-c-bg-soft); border-color: var(--vp-c-text-1); }
.footer-text { position: absolute; bottom: 30px; font-size: 0.8rem; color: var(--vp-c-text-3); font-family: monospace; }
</style>