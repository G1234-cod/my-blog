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
  <div class="stats-outer">
    <h2 class="section-title">
      <span class="title-icon">📊</span>
      DATA INSIGHTS
    </h2>

    <!-- 主 Grid：左侧固定 300px，右侧自适应 -->
    <div class="bento-main">
      <!-- 左侧简介卡片 -->
      <div class="bento-profile glass-effect">
        <div class="profile-header">
          <span class="profile-icon">👤</span>
          <h3 class="profile-h3">CYBERDEV_PROFILE</h3>
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

      <!-- 右侧面板：上下分区 -->
      <div class="bento-right">
        <!-- 上半部分：四宫格数据 -->
        <div class="bento-stats glass-effect">
          <div class="stat-item" v-for="(stat, index) in stats" :key="stat.label">
            <span class="stat-icon">{{ stat.icon }}</span>
            <div class="stat-info">
              <span class="stat-value">{{ formatNumber(counters[index]) }}+</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <!-- 下半部分：技能进度条 -->
        <div class="bento-skills glass-effect">
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
/* ========== 最外层容器：80% 宽度居中，带呼吸感 ========== */
.stats-outer {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
}

/* ========== 标题 ========== */
.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 0.1em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title-icon {
  margin-right: 0.5rem;
}

/* ========== 主 Grid：左 300px + 右自适应 ========== */
.bento-main {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
}

/* ========== 右侧面板：上四宫格 + 下技能条 ========== */
.bento-right {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ========== 通用卡片圆角/内边距 ========== */
.bento-profile,
.bento-stats,
.bento-skills {
  border-radius: 1rem;
  padding: 1.5rem;
  overflow: hidden;
}

/* ========== 左侧简介卡片 ========== */
.profile-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.profile-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.profile-h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-desc {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0 0 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ========== 四宫格数据面板 ========== */
.bento-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  overflow: hidden;
}

.stat-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ========== 技能进度条面板 ========== */
.skills-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin: 0 0 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.skill-item {
  margin-bottom: 1rem;
}

.skill-item:last-child {
  margin-bottom: 0;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.skill-percent {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
  margin-left: 0.5rem;
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

/* ========== 跑马灯（修复溢出） ========== */
.marquee-container {
  margin-top: 2rem;
  overflow: hidden;
  padding: 1rem 0;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 20s linear infinite;
  white-space: nowrap;
}

@keyframes marquee {
  0%   { transform: translateX(0); }
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
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
}

.marquee-tag + .marquee-tag {
  margin-left: 1rem;
}

/* ========== 响应式：小屏改为上下堆叠 ========== */
@media (max-width: 768px) {
  .stats-outer {
    width: 94%;
  }

  .bento-main {
    grid-template-columns: 1fr;
  }

  .bento-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
