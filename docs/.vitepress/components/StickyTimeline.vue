<script setup>
import { ref } from 'vue'

const achievements = ref([
  {
    year: '2024',
    title: 'AI Application Engineer',
    description: 'Developed enterprise-level RAG systems and LLM applications',
    icon: '🤖',
    highlight: true
  },
  {
    year: '2023',
    title: 'Full-Stack Architect',
    description: 'Designed and implemented scalable microservices architecture',
    icon: '🏗️',
    highlight: false
  },
  {
    year: '2022',
    title: 'Cloud Native Expert',
    description: 'Deployed production-grade Kubernetes clusters on AWS',
    icon: '☁️',
    highlight: true
  },
  {
    year: '2021',
    title: 'DevOps Engineer',
    description: 'Built CI/CD pipelines and automated infrastructure',
    icon: '🔧',
    highlight: false
  },
  {
    year: '2020',
    title: 'Open Source Contributor',
    description: 'Contributed to multiple popular GitHub projects',
    icon: '💻',
    highlight: true
  },
  {
    year: '2019',
    title: 'Software Developer',
    description: 'Started professional career in web development',
    icon: '🚀',
    highlight: false
  }
])

const awards = ref([
  { name: 'Codeforces', rank: 'Expert', rating: '1890' },
  { name: 'LeetCode', rank: 'Master', rating: '2200+' },
  { name: 'GitHub', rank: 'Star', stars: '1.2K+' }
])
</script>

<template>
  <div class="timeline-container">
    <h2 class="section-title">
      <span class="title-icon">⏱️</span>
      CAREER TIMELINE
    </h2>

    <div class="timeline-wrapper">
      <!-- 左侧固定面板 -->
      <div class="timeline-sidebar">
        <div class="sidebar-card glass-effect">
          <h3 class="sidebar-title">ACHIEVEMENTS</h3>
          <div class="award-list">
            <div class="award-item" v-for="award in awards" :key="award.name">
              <div class="award-header">
                <span class="award-name">{{ award.name }}</span>
                <span class="award-rank">{{ award.rank }}</span>
              </div>
              <div class="award-value">{{ award.rating || award.stars }}</div>
            </div>
          </div>
        </div>

        <div class="sidebar-card glass-effect">
          <h3 class="sidebar-title">CERTIFICATIONS</h3>
          <div class="cert-list">
            <div class="cert-item">AWS Solutions Architect</div>
            <div class="cert-item">Google Cloud Professional</div>
            <div class="cert-item">CKA Certified Kubernetes</div>
            <div class="cert-item">Azure Developer Associate</div>
          </div>
        </div>
      </div>

      <!-- 右侧滚动时间轴 -->
      <div class="timeline-scroll">
        <div class="timeline-line"></div>
        <div 
          class="timeline-item" 
          v-for="(item, index) in achievements" 
          :key="item.year"
          :class="{ 'timeline-highlight': item.highlight }"
        >
          <div class="timeline-dot"></div>
          <div class="timeline-content glass-effect">
            <div class="timeline-header">
              <span class="timeline-year">{{ item.year }}</span>
              <span class="timeline-icon">{{ item.icon }}</span>
            </div>
            <h3 class="timeline-title">{{ item.title }}</h3>
            <p class="timeline-desc">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-container {
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

.timeline-wrapper {
  display: flex;
  gap: 2rem;
}

.timeline-sidebar {
  position: sticky;
  top: 80px;
  width: 40%;
  max-width: 320px;
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

.award-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.award-item {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.award-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.award-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.award-name {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.award-rank {
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
  background: rgba(37, 99, 235, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
}

.award-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.cert-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cert-item {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
}

/* 右侧时间轴 */
.timeline-scroll {
  flex: 1;
  position: relative;
  padding-left: 2rem;
}

.timeline-line {
  position: absolute;
  left: 0.5rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--vp-c-brand-1), transparent);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.timeline-item:hover {
  transform: translateX(10px);
}

.timeline-dot {
  position: absolute;
  left: -1.75rem;
  top: 1rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  border: 3px solid var(--vp-c-bg);
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.5);
  box-shadow: 0 0 10px var(--vp-c-brand-1);
}

.timeline-content {
  border-radius: 1rem;
  padding: 1.5rem;
}

.timeline-highlight .timeline-content {
  border-color: rgba(37, 99, 235, 0.3);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.timeline-year {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.timeline-icon {
  font-size: 1.5rem;
}

.timeline-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem;
}

.timeline-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .timeline-wrapper {
    flex-direction: column;
  }
  
  .timeline-sidebar {
    position: static;
    width: 100%;
    max-width: 100%;
  }
  
  .timeline-scroll {
    padding-left: 1.5rem;
  }
}
</style>