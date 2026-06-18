<script setup>
import { ref, onMounted } from 'vue'

const stats = ref([
  { label: 'GitHub Stars', value: '1,280', icon: '⭐' },
  { label: 'Projects', value: '32', icon: '📦' },
  { label: 'Commits', value: '2,847', icon: '📝' },
  { label: 'PRs Merged', value: '156', icon: '✅' }
])

const skills = ref([
  { name: 'Python', level: 95, color: '#3776AB' },
  { name: 'JavaScript', level: 90, color: '#F7DF1E' },
  { name: 'TypeScript', level: 85, color: '#3178C6' },
  { name: 'Vue.js', level: 88, color: '#4FC08D' },
  { name: 'Docker', level: 75, color: '#2496ED' },
  { name: 'AWS', level: 70, color: '#FF9900' }
])

const tags = ref([
  'Python', 'Vue.js', 'React', 'TypeScript', 'Node.js', 
  'Django', 'FastAPI', 'Docker', 'Kubernetes', 'AWS',
  'Git', 'CI/CD', 'LLM', 'RAG', 'LangChain',
  'PyTorch', 'TensorFlow', 'SQL', 'MongoDB', 'Redis'
])

const counters = ref(stats.value.map(() => 0))

onMounted(() => {
  animateCounters()
})

const animateCounters = () => {
  stats.value.forEach((stat, index) => {
    const target = parseInt(stat.value.replace(/,/g, ''))
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        counters.value[index] = target
        clearInterval(timer)
      } else {
        counters.value[index] = Math.floor(current)
      }
    }, duration / steps)
  })
}

const formatNumber = (num) => {
  return num.toLocaleString()
}
</script>

<template>
  <div class="stats-container">
    <h2 class="section-title">
      <span class="title-icon">📊</span>
      DATA INSIGHTS
    </h2>

    <!-- Bento Grid -->
    <div class="bento-grid">
      <!-- 左侧简介卡片 -->
      <div class="bento-item bento-profile glass-effect">
        <div class="profile-header">
          <span class="profile-icon">👤</span>
          <h3>CYBERDEV_PROFILE</h3>
        </div>
        <p class="profile-desc">
          Full-stack developer with 5+ years of experience building scalable applications and AI systems.
        </p>
        <div class="profile-tags">
          <span class="mini-tag">AI/ML</span>
          <span class="mini-tag">Cloud</span>
          <span class="mini-tag">DevOps</span>
        </div>
      </div>

      <!-- 右上四宫格 -->
      <div class="bento-item bento-stats glass-effect">
        <div class="stat-item" v-for="(stat, index) in stats" :key="stat.label">
          <span class="stat-icon">{{ stat.icon }}</span>
          <div class="stat-info">
            <span class="stat-value">{{ formatNumber(counters[index]) }}+</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <!-- 右下技能进度条 -->
      <div class="bento-item bento-skills glass-effect">
        <h3 class="skills-title">TECH STACK</h3>
        <div class="skill-item" v-for="skill in skills" :key="skill.name">
          <div class="skill-header">
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-percent">{{ skill.level }}%</span>
          </div>
          <div class="skill-bar-bg">
            <div 
              class="skill-bar-fill" 
              :style="{ width: skill.level + '%', background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 技能标签跑马灯 -->
    <div class="marquee-container">
      <div class="marquee-track">
        <span 
          v-for="(tag, index) in [...tags, ...tags]" 
          :key="index" 
          class="marquee-tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-container {
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

.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  height: 400px;
}

.bento-item {
  border-radius: 1rem;
  padding: 1.5rem;
}

.bento-profile {
  grid-column: span 4;
  grid-row: span 2;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.profile-icon {
  font-size: 1.5rem;
}

.profile-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin: 0;
}

.profile-desc {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0 0 1rem;
}

.profile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.mini-tag {
  padding: 0.25rem 0.75rem;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 0.5rem;
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
}

.bento-stats {
  grid-column: span 8;
  grid-row: span 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.bento-skills {
  grid-column: span 8;
  grid-row: span 1;
}

.skills-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin: 0 0 1rem;
}

.skill-item {
  margin-bottom: 1rem;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.skill-percent {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.skill-bar-bg {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1s ease-out;
}

/* 跑马灯效果 */
.marquee-container {
  margin-top: 2rem;
  overflow: hidden;
  padding: 1rem 0;
}

.marquee-track {
  display: flex;
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.marquee-tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 2rem;
  font-size: 0.875rem;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
  margin-right: 1rem;
}

@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    height: auto;
  }
  
  .bento-profile,
  .bento-stats,
  .bento-skills {
    grid-column: span 12;
    grid-row: span 1;
  }
  
  .bento-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>