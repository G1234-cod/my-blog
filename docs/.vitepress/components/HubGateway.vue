<script setup>
import { ref } from 'vue'

const hubs = ref([
  {
    id: 1,
    title: 'AI Journey',
    subtitle: 'Machine Learning & LLM',
    description: 'Deep dive into artificial intelligence, machine learning models, and LLM applications.',
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    count: '42 articles',
    link: '/ai-journey/'
  },
  {
    id: 2,
    title: 'Tech Notes',
    subtitle: 'Technical Deep Dive',
    description: 'In-depth technical articles about system architecture, DevOps, and best practices.',
    icon: '📝',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    count: '28 articles',
    link: '/tech-note/'
  },
  {
    id: 3,
    title: 'Algorithm',
    subtitle: 'LeetCode Solutions',
    description: 'Algorithm problem solutions with detailed explanations and complexity analysis.',
    icon: '🧩',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    count: '156 problems',
    link: '/leetcode/'
  },
  {
    id: 4,
    title: 'Build Journal',
    subtitle: 'DevOps & Infrastructure',
    description: 'Journey of building and maintaining production infrastructure and CI/CD pipelines.',
    icon: '🏗️',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    count: '12 guides',
    link: '/build-journal/'
  },
  {
    id: 5,
    title: 'Reading',
    subtitle: 'Research & Insights',
    description: 'Notes and insights from research papers, books, and industry reports.',
    icon: '📚',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    count: '24 readings',
    link: '/reading/'
  },
  {
    id: 6,
    title: 'Env Setup',
    subtitle: 'Environment & Tools',
    description: 'Guides for setting up development environments and productivity tools.',
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    count: '8 tutorials',
    link: '/env-setup/'
  }
])
</script>

<template>
  <div class="hub-container">
    <h2 class="section-title">
      <span class="title-icon">🔗</span>
      CONTENT HUB
    </h2>

    <p class="hub-intro">
      Explore my knowledge base organized by topics. Click to dive into each section.
    </p>

    <div class="hub-grid">
      <a 
        v-for="hub in hubs" 
        :key="hub.id"
        :href="hub.link"
        class="hub-card glass-effect"
      >
        <div class="hub-icon" :style="{ background: hub.gradient }">
          <span>{{ hub.icon }}</span>
        </div>
        <div class="hub-content">
          <h3 class="hub-title">{{ hub.title }}</h3>
          <p class="hub-subtitle">{{ hub.subtitle }}</p>
          <p class="hub-desc">{{ hub.description }}</p>
          <div class="hub-footer">
            <span class="hub-count">{{ hub.count }}</span>
            <span class="hub-arrow">→</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.hub-container {
  width: 100%;
  padding: 2rem 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
  margin-bottom: 0.75rem;
  letter-spacing: 0.1em;
}

.title-icon {
  margin-right: 0.5rem;
}

.hub-intro {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  margin: 0 0 2rem;
}

.hub-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
}

.hub-card {
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem;
  border-radius: 1rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.hub-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 12px 24px rgba(0, 0, 0, 0.1),
    0 0 20px rgba(37, 99, 235, 0.1);
}

.hub-icon {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
}

.hub-content {
  flex: 1;
  min-width: 0;
}

.hub-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
}

.hub-subtitle {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  margin: 0 0 0.5rem;
}

.hub-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0 0 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hub-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hub-count {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.hub-arrow {
  font-size: 1rem;
  color: var(--vp-c-brand-1);
  transition: transform 0.3s ease;
}

.hub-card:hover .hub-arrow {
  transform: translateX(5px);
}

@media (max-width: 640px) {
  .hub-grid {
    grid-template-columns: 1fr;
  }
  
  .hub-card {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>