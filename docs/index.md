---
layout: home

hero:
  name: "DevPortal"
  text: "关运祥 | AI 应用与后端架构"
  tagline: "深耕底层逻辑，从算法设计到云原生 CI/CD 的全链路工程实践者。"
  # 如果你在 public/ 目录下放了一张正方形的个人头像 avatar.png，可以解开下面三行的注释
  # image:
  #   src: /avatar.png
  #   alt: 关运祥
  actions:
    - theme: brand
      text: 🤖 获取 AI 方向履历 (PDF)
      link: /Guanyunxiang_Resume_AI.pdf
    - theme: brand
      text: ⚙️ 获取后端方向履历 (PDF)
      link: /Guanyunxiang_Resume_Backend.pdf
    - theme: alt
      text: 📚 探索技术沉淀
      link: /ai-journey/

features:
  - title: 🚀 双引擎个人技术门户
    details: 抛弃传统模板，基于 VitePress 与 GitHub Actions 构建。实现底层多仓库数据解耦与云端全自动化 CI/CD 流水线拼装。
    link: /build-journal/关于简历与博客架构连通
    linkText: 查看架构图纸
  - title: 🔒 基于双重验证的社区交互系统
    details: 独立研发多模态安全准入体系，主导前后端联调与多级环境部署。项目完成闭环交付，已成功落地软件著作权保护。
  - title: 🧠 RAG 知识库与本地大模型
    details: 具备 Ollama、AnythingLLM 的本地化部署调优实战经验。深入探索检索模块机制与模型调用的工程化规范。
    link: /ai-journey/
    linkText: 阅读 AI 笔记
  - title: 🏆 顶尖学业与底层算法功底
    details: GPA 3.74 (专业前 5%)，持有软件设计师（中级）国家级认证。斩获全国大学生数学建模竞赛及蓝桥杯等多项大奖。
---

<br><br>

<div class="contact-footer">
  <p>✉️ 19562523965@163.com &nbsp; | &nbsp; 📱 19562523965</p>
  <p class="sub-text">专注架构解耦 · 拥抱云原生 · 追求极致性能</p>
</div>

<style>
/* --- 极客风美化 CSS --- */

/* 1. 首页渐变背景光晕 */
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
}

/* 2. Bento Box 卡片悬浮呼吸灯动效 */
.VPFeature {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  border: 1px solid transparent;
  background-color: var(--vp-c-bg-soft);
}

.VPFeature:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand-light);
}

/* 3. 暗黑模式下悬浮卡片的荧光效果 */
.dark .VPFeature:hover {
  box-shadow: 0 0 20px rgba(65, 209, 255, 0.15);
  border-color: rgba(65, 209, 255, 0.3);
}

/* 4. 底部联系方式排版优化 */
.contact-footer {
  text-align: center;
  color: var(--vp-c-text-1);
  font-weight: 500;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.contact-footer .sub-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
  letter-spacing: 1px;
}
</style>