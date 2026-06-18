<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    title: 'AI Content Generator',
    subtitle: 'LLM-Powered Writing Assistant',
    description: 'An intelligent content generation platform leveraging GPT-4 and open-source LLMs for automated content creation.',
    tags: ['Python', 'LangChain', 'FastAPI', 'React'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    stats: { commits: '284', stars: '156', forks: '42' },
    github: 'https://github.com/G1234-cod',
    demo: '#'
  },
  {
    id: 2,
    title: 'Smart Dashboard',
    subtitle: 'Real-time Analytics Platform',
    description: 'A comprehensive data visualization dashboard with real-time updates and customizable widgets.',
    tags: ['Vue.js', 'TypeScript', 'ECharts', 'WebSocket'],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    stats: { commits: '192', stars: '89', forks: '23' },
    github: 'https://github.com/G1234-cod',
    demo: '#'
  },
  {
    id: 3,
    title: 'Cloud Storage Gateway',
    subtitle: 'Unified Storage Solution',
    description: 'A microservices-based storage gateway supporting multiple cloud providers with automatic failover.',
    tags: ['Go', 'Docker', 'Kubernetes', 'AWS S3'],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    stats: { commits: '312', stars: '234', forks: '67' },
    github: 'https://github.com/G1234-cod',
    demo: '#'
  },
  {
    id: 4,
    title: 'Garbage Classification',
    subtitle: 'AI Image Recognition System',
    description: 'Deep learning based garbage classification model with 98% accuracy across 4 categories.',
    tags: ['PyTorch', 'ResNet', 'TensorFlow', 'OpenCV'],
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    stats: { commits: '145', stars: '67', forks: '18' },
    github: 'https://github.com/G1234-cod/garbage-classification-model',
    demo: '#'
  }
])

const activeProject = ref(null)
</script>

<template>
  <div class="projects-container">
    <h2 class="section-title">
      <span class="title-icon">💻</span>
      PROJECT SHOWCASE
    </h2>

    <div class="projects-wrapper">
      <!-- 左侧固定面板 -->
      <div class="projects-sidebar">
        <div class="sidebar-card glass-effect">
          <h3 class="sidebar-title">PORTFOLIO STATS</h3>
          <div class="stats-grid">
            <div class="stat-box">
              <span class="stat-num">48</span>
              <span class="stat-label">Projects</span>
            </div>
            <div class="stat-box">
              <span class="stat-num">2.8K</span>
              <span class="stat-label">Commits</span>
            </div>
            <div class="stat-box">
              <span class="stat-num">520</span>
              <span class="stat-label">Stars</span>
            </div>
            <div class="stat-box">
              <span class="stat-num">127</span>
              <span class="stat-label">Forks</span>
            </div>
          </div>
        </div>

        <div class="sidebar-card glass-effect">
          <h3 class="sidebar-title">TECH STACK</h3>
          <div class="tech-cloud">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">Vue.js</span>
            <span class="tech-tag">Go</span>
            <span class="tech-tag">Docker</span>
            <span class="tech-tag">AWS</span>
            <span class="tech-tag">LLM</span>
            <span class="tech-tag">React</span>
            <span class="tech-tag">PostgreSQL</span>
          </div>
        </div>
      </div>

      <!-- 右侧项目卡片 -->
      <div class="projects-grid">
        <div 
          class="project-card glass-effect"
          v-for="project in projects"
          :key="project.id"
          @mouseenter="activeProject = project.id"
          @mouseleave="activeProject = null"
        >
          <!-- 项目封面 -->
          <div class="project-cover" :style="{ background: project.gradient }">
            <div class="cover-icon">
              <span>⚡</span>
            </div>
            <div class="cover-overlay"></div>
          </div>

          <!-- 项目信息 -->
          <div class="project-info">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-subtitle">{{ project.subtitle }}</p>
            <p class="project-desc">{{ project.description }}</p>

            <!-- 标签 -->
            <div class="project-tags">
              <span 
                class="project-tag" 
                v-for="tag in project.tags" 
                :key="tag"
              >
                {{ tag }}
              </span>
            </div>

            <!-- 统计信息 -->
            <div class="project-stats">
              <span class="stat-item">
                <span class="stat-icon">📝</span>
                {{ project.stats.commits }}
              </span>
              <span class="stat-item">
                <span class="stat-icon">⭐</span>
                {{ project.stats.stars }}
              </span>
              <span class="stat-item">
                <span class="stat-icon">🔀</span>
                {{ project.stats.forks }}
              </span>
            </div>

            <!-- 操作按钮 -->
            <div class="project-actions">
              <a class="action-btn btn-github" :href="project.github || '#'">
                <span>📦 GitHub</span>
              </a>
              <a class="action-btn btn-demo" :href="project.demo || '#'">
                <span>🚀 Demo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-container {
  width: 100%;
  padding: 2rem 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 0.1em;
}

.title-icon {
  margin-right: 0.5rem;
}

.projects-wrapper {
  display: flex;
  gap: 2rem;
}

.projects-sidebar {
  position: sticky;
  top: 80px;
  width: 30%;
  max-width: 280px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar-card {
  border-radius: 1rem;
  padding: 1.5rem;
}

.sidebar-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin: 0 0 1rem;
  letter-spacing: 0.05em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-box {
  text-align: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
}

.stat-num {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.tech-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.375rem 0.75rem;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 0.5rem;
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
}

/* 项目卡片网格 */
.projects-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-card {
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 0 30px rgba(37, 99, 235, 0.1);
}

.project-cover {
  position: relative;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-icon {
  font-size: 3rem;
  z-index: 2;
  position: relative;
}

.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
}

.project-info {
  padding: 1.25rem;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
}

.project-subtitle {
  font-size: 0.875rem;
  color: var(--vp-c-brand-1);
  margin: 0 0 0.75rem;
}

.project-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 1rem;
}

.project-tag {
  padding: 0.25rem 0.625rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 0.5rem;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.project-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.stat-icon {
  font-size: 0.75rem;
}

.project-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  text-decoration: none;
  text-align: center;
  display: inline-block;
}

.btn-github {
  background: rgba(0, 0, 0, 0.2);
  color: var(--vp-c-text-1);
}

.btn-github:hover {
  background: rgba(0, 0, 0, 0.3);
}

.btn-demo {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-demo:hover {
  background: var(--vp-c-brand-2);
}

@media (max-width: 768px) {
  .projects-wrapper {
    flex-direction: column;
  }
  
  .projects-sidebar {
    position: static;
    width: 100%;
    max-width: 100%;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>