<template>
  <div class="split-screen" id="projects">
    
    <div class="left-board">
      
      <div class="lab-blueprint">
        <div class="blueprint-grid"></div>
      </div>

      <div class="board-content">
        <div class="section-tag">04 / LABS & ARCHITECTURE</div>
        <h2 class="board-title">全栈架构<br><span class="highlight">& AI 探索</span></h2>
        <p class="board-desc">
          右侧实验室产出的系统，已接受工业界与学术界的双重检验，斩获多项省级创新大奖并取得国家软件著作权。从自动化流水线的零干预部署，到私有化大模型知识库的本地拉起，用代码构建真实世界的数字孪生。
        </p>

        <div class="highlight-stats">
          <div class="h-stat">
            <div class="icon-box">🧠</div>
            <div class="stat-text">
              <h4>大模型与算法驱动</h4>
              <p>实现轻量化 CNN 与 DeepSeek 深度联动，打通私有化 RAG 知识库落地闭环。</p>
            </div>
          </div>
          <div class="h-stat">
            <div class="icon-box">☁️</div>
            <div class="stat-text">
              <h4>云原生架构与运维</h4>
              <p>基于 Jamstack 与 Docker 容器化，构建从 GitHub Actions 到阿里云的零宕机发布流水线。</p>
            </div>
          </div>
          <div class="h-stat">
            <div class="icon-box">🛡️</div>
            <div class="stat-text">
              <h4>安全校验与底层重构</h4>
              <p>设计多模态双重验证引擎，底层模块高度解耦，获多项国家版权局软著认证。</p>
            </div>
          </div>
        </div>

      </div>

      <div class="system-status">
        <div class="pulse-dot"></div>
        <span>SYSTEM.ONLINE / {{ projects.length }} LAB NODES ACTIVE</span>
      </div>
    </div>

    <div class="right-scroll">
      <div class="projects-container">
        
        <a
          v-for="p in projects"
          :key="p.slug"
          :href="`/projects/${p.slug}`"
          class="project-card glass-panel"
        >
          <div class="card-header">
            <h3>{{ p.title }}</h3>
            <div v-if="p.badge" class="title-badge" :class="`${p.badge.type}-badge`">
              <span class="b-icon">{{ p.badge.icon }}</span> {{ p.badge.text }}
            </div>
          </div>
          <div class="tech-tags">
            <span
              v-for="(tag, i) in p.tags"
              :key="tag"
              class="tag"
              :class="{ brand: i === 0 }"
            >{{ tag }}</span>
          </div>
          <p class="project-desc">{{ p.desc }}</p>
        </a>

        <div class="scroll-spacer"></div>
      </div>
    </div>

  </div>
</template>

<script setup>
// 项目卡片数据源：新增项目只需追加 projects.mjs + 新建同名详情页，此处无需改动
import { projects } from '../projects.mjs'
</script>

<style scoped>
/* === 整体布局 === */
.split-screen { width: 100%; height: calc(100vh - 80px); display: flex; background-color: var(--vp-c-bg); overflow: hidden; }

/* === 左侧看板：向左侧靠拢 === */
.left-board {
  width: 45%; height: 100%;
  /* 纵向 flex：system-status 用 margin-top:auto 贴底，内容变高时自动下移，不再压字 */
  display: flex; flex-direction: column; align-items: flex-start;
  justify-content: flex-start;
  /* 死像素 120px → 流式：窄屏笔记本自动收缩，宽屏保持原有留白 */
  padding-left: clamp(24px, 6vw, 120px);
  padding-right: 40px;
  padding-top: 40px;
  padding-bottom: 40px;
  border-right: 1px solid var(--vp-c-divider); position: relative;
  /* 矮屏内容超高时左侧内部滚动，避免被裁 */
  overflow-x: hidden; overflow-y: auto;
}

.lab-blueprint { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.05; z-index: 0; }
.blueprint-grid { width: 100%; height: 100%; background-image: linear-gradient(var(--vp-c-text-1) 1px, transparent 1px), linear-gradient(90deg, var(--vp-c-text-1) 1px, transparent 1px); background-size: 40px 40px; }

.board-content { width: 100%; max-width: 520px; position: relative; z-index: 1; flex-shrink: 0; }
.section-tag { font-family: monospace; font-size: 0.85rem; color: var(--vp-c-brand-1); margin-bottom: 20px; font-weight: 600; letter-spacing: 1px; }

.board-title { font-size: clamp(1.35rem, 1.15rem + 1vw, 1.6rem); font-weight: 700; line-height: 1.25; color: var(--vp-c-text-1); margin-bottom: 24px; letter-spacing: -0.5px; }
.board-title .highlight { color: var(--vp-c-brand-1); }
.board-desc { font-size: 0.95rem; color: var(--vp-c-text-2); line-height: 1.7; margin-bottom: 40px; }

.highlight-stats { display: flex; flex-direction: column; gap: 24px; border-top: 1px solid var(--vp-c-divider); padding-top: 30px; }
.h-stat { display: flex; align-items: flex-start; gap: 16px; }
.icon-box { width: 42px; height: 42px; border-radius: 12px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border); display: flex; justify-content: center; align-items: center; font-size: 1.05rem; flex-shrink: 0; box-shadow: var(--vp-shadow-1); }
.stat-text h4 { font-size: 1.05rem; font-weight: 700; color: var(--vp-c-text-1); margin: 0 0 6px 0; font-family: var(--vp-font-family-base); }
.stat-text p { font-size: 0.85rem; color: var(--vp-c-text-2); margin: 0; line-height: 1.5; font-weight: 500;}

/* 文档流贴底：内容不满一屏时沉底，内容变高时随之下移（绝不压字） */
.system-status { display: flex; align-items: center; gap: 10px; margin-top: auto; padding-top: 28px; flex-shrink: 0; }
.pulse-dot { width: 8px; height: 8px; background-color: #0ba360; border-radius: 50%; box-shadow: none; }
.system-status span { font-family: monospace; font-size: 0.75rem; color: var(--vp-c-text-3); font-weight: 600; letter-spacing: 1px; }

.right-scroll { 
  width: 55%; height: 100%; overflow-y: auto; 
  padding: 40px 10% 40px 60px;
  scrollbar-width: none; scroll-behavior: smooth;
}
.right-scroll::-webkit-scrollbar { display: none; }

.projects-container { display: flex; flex-direction: column; gap: 32px; }

.glass-panel {
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border);
  border-radius: 16px; padding: 32px; transition: all 0.3s ease;
  box-shadow: var(--vp-shadow-1); display: flex; flex-direction: column; gap: 14px;
  position: relative; overflow: hidden;
}
.glass-panel:hover { transform: translateX(4px); border-color: var(--vp-c-brand-1); box-shadow: var(--vp-shadow-3); }
.glass-panel::after { content: ''; position: absolute; left: 0; top: 0; width: 4px; height: 100%; background: transparent; transition: background 0.3s ease; }
.glass-panel:hover::after { background: var(--vp-c-brand-1); }

.card-header { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
.card-header h3 { font-size: 1.25rem; font-weight: 600; color: var(--vp-c-text-1); margin: 0; line-height: 1.3;}

.title-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; border: 1px solid transparent; }
.gold-badge { color: #f5a623; background: rgba(245, 166, 35, 0.1); border-color: rgba(245, 166, 35, 0.3); }
.purple-badge { color: #b0f; background: rgba(187, 0, 255, 0.1); border-color: rgba(187, 0, 255, 0.3); }
.cyan-badge { color: #00f2fe; background: rgba(0, 242, 254, 0.1); border-color: rgba(0, 242, 254, 0.3); }
.gray-badge { color: var(--vp-c-text-2); background: var(--vp-c-default-soft); border-color: var(--vp-c-border); }
.amber-badge { color: #f59e0b; background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.3); }
.emerald-badge { color: #10b981; background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.3); }

.tech-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 2px; }
.tag { 
  font-size: 0.75rem; font-family: var(--vp-font-family-base); font-weight: 600;
  color: var(--vp-c-text-2); background: transparent; 
  border: 1px solid var(--vp-c-border); padding: 4px 12px; border-radius: 8px; transition: all 0.2s; 
}
.tag.brand { color: var(--vp-c-brand-1); border-color: var(--vp-c-brand-soft); background: var(--vp-c-brand-soft); }
.glass-panel:hover .tag { border-color: var(--vp-c-text-3); }

.project-desc { font-size: 0.85rem; color: var(--vp-c-text-2); line-height: 1.7; margin: 0; }

.scroll-spacer { height: 60px; }

a.project-card {
  text-decoration: none !important; 
  color: inherit; 
  cursor: pointer; 
  display: flex; 
}
a.project-card:hover {
  text-decoration: none !important; 
}

@media (max-width: 768px) {
  .split-screen { 
    flex-direction: column; 
    overflow-y: visible; 
    height: auto; 
    min-height: calc(100vh - 80px);
  }
  
  .left-board { 
    width: 100%; 
    min-height: auto; 
    height: auto; 
    padding: 40px 20px 35px 20px; 
    justify-content: flex-start; 
    border-right: none; 
    border-bottom: 1px solid var(--vp-c-divider);
  }
  
  .board-content { 
    max-width: 100%; 
  }
  
  .section-tag { font-size: 0.75rem; }
  
  .board-title {
    font-size: 1.6rem;
    line-height: 1.2;
  }
  
  .board-desc {
    font-size: 0.85rem;
    line-height: 1.6;
  }
  
  .highlight-stats {
    gap: 18px;
    padding-top: 22px;
  }
  
  .h-stat {
    gap: 14px;
  }
  
  .icon-box {
    width: 40px;
    height: 40px;
    font-size: 1.05rem;
    flex-shrink: 0;
  }
  
  .stat-text h4 {
    font-size: 0.95rem;
    margin-bottom: 4px;
  }
  
  .stat-text p {
    font-size: 0.75rem;
    line-height: 1.5;
  }
  
  .system-status {
    margin-top: 20px;
  }
  
  .right-scroll { 
    width: 100%; 
    padding: 40px 20px 0 20px; 
    overflow-y: visible;
    /* 手机上禁用内部容器平滑滚动，改由页面自然滚动 */
    scroll-behavior: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .projects-container {
    gap: 22px;
  }
  
  .glass-panel {
    padding: 22px;
    gap: 12px;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .glass-panel:active {
    transform: scale(0.99);
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .card-header h3 {
    font-size: 1.05rem;
    line-height: 1.35;
  }
  
  .title-badge {
    font-size: 0.75rem;
    padding: 4px 10px;
    align-self: flex-start;
  }
  
  .tech-tags {
    gap: 8px;
    margin-top: 0;
    flex-wrap: wrap;
  }
  
  .tag {
    font-size: 0.75rem;
    padding: 4px 11px;
  }
  
  .project-desc {
    font-size: 0.85rem;
    line-height: 1.6;
  }

  /* 移动端触控目标尺寸 & 去除点击高亮 */
  a.project-card,
  .glass-panel,
  .tag {
    -webkit-tap-highlight-color: transparent;
  }
}

@media (max-width: 480px) {
  .left-board {
    padding: 70px 16px 30px 16px;
  }
  
  .right-scroll {
    padding: 35px 16px 0 16px;
  }
  
  .board-title {
    font-size: 1.25rem;
  }
  
  .board-desc {
    font-size: 0.85rem;
  }
  
  .highlight-stats {
    gap: 14px;
  }
  
  .icon-box {
    width: 36px;
    height: 36px;
    font-size: 0.95rem;
  }
  
  .stat-text h4 {
    font-size: 0.85rem;
  }
  
  .stat-text p {
    font-size: 0.75rem;
  }
  
  .glass-panel {
    padding: 18px;
  }
  
  .card-header h3 {
    font-size: 0.95rem;
    line-height: 1.3;
  }
  
  .title-badge {
    font-size: 0.75rem;
    padding: 3px 8px;
  }
  
  .tag {
    font-size: 0.75rem;
    padding: 3px 9px;
  }
  
  .project-desc {
    font-size: 0.75rem;
  }
}
</style>