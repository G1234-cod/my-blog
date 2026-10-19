<template>
  <section class="ed-section" id="about">
    <SectionHead
      tag="04 / ABOUT"
      title="关于我"
      sub="奖项是工程能力的试金石，实践是连接象牙塔与工业界的桥梁。"
    />

    <!-- 数字带：mono 等宽数字，一条横带交代关键事实 -->
    <ul class="stat-strip">
      <li v-for="s in stats" :key="s.label" class="stat-cell">
        <span class="stat-num mono">{{ s.value }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </li>
    </ul>

    <!-- 精简履历：年份 mono + 标题 + 一行摘要 + 标签 -->
    <ol class="track-list">
      <li v-for="t in track" :key="t.title" class="track-row">
        <div class="track-head">
          <h3 class="track-title">{{ t.title }}</h3>
          <p class="track-desc">{{ t.desc }}</p>
        </div>
        <ul class="track-tags">
          <li v-for="b in t.items" :key="b" class="track-tag mono">{{ b }}</li>
        </ul>
      </li>
    </ol>

    <p class="more-link">
      <a href="/about/">完整履历与经历 →</a>
      <a class="alt mono" href="/Guanyunxiang_Resume_AI.pdf" target="_blank">在线简历 PDF ↗</a>
    </p>
  </section>
</template>

<script setup>
import SectionHead from './SectionHead.vue'

const stats = [
  { value: 'Top 5%', label: '专业综合排名' },
  { value: '32', label: '篇技术博客沉淀' },
  { value: '3', label: '项国家级奖项' },
  { value: '3', label: '项软件著作权' },
  { value: '2', label: '年国家励志奖学金' }
]

const track = [
  {
    title: '荣誉与奖学金',
    desc: '连续两学年保持专业头部梯队，品学兼优与持续自驱力的印证。',
    items: ['国家励志奖学金 ×2', '河南省省级三好学生']
  },
  {
    title: '算法竞技与底层内功',
    desc: '代表学校出战 ACM-ICPC 区域赛，在算法与数学建模竞技中证明代码硬实力。',
    items: ['ACM-ICPC 区域赛', '蓝桥杯省三', '数模省三', '离散数学 97 / 算法 94']
  },
  {
    title: '创新与全栈工程落地',
    desc: '解决真实业务痛点，在多项国家级创新创业与计算机设计竞赛中完成商业级应用研发。',
    items: ['iCAN 省二', '大创省二', '计算机设计大赛省三']
  },
  {
    title: '资质与知识产权',
    desc: '独立或带队研发复杂系统，具备软件工程设计与系统架构分析能力。',
    items: ['3 项软件著作权', '软件设计师（软考中级）']
  },
  {
    title: '工业实践与领导力',
    desc: '企业级项目研发实习 + 校园团队管理，跨部门协同推进落地。',
    items: ['编程猫研发实习', '班长 & 团委部长']
  }
]
</script>

<style scoped>
.ed-section {
  padding: 64px 0;
}
/* 数字带：一条横带，细分隔，mono 数字 */
.stat-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  margin: 0 0 44px;
  padding: 22px 0;
  list-style: none;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}
.stat-cell {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 28px;
  border-left: 1px solid var(--vp-c-divider);
}
.stat-cell:first-child {
  padding-left: 4px;
  border-left: none;
}
.stat-num {
  font-family: var(--vp-font-family-mono);
  font-size: 1.55rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
  color: var(--vp-c-text-1);
}
.stat-label {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
}
/* 精简履历 */
.track-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--vp-c-divider);
}
.track-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 28px;
  padding: 20px 4px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.track-head {
  min-width: 0;
}
.track-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.track-desc {
  margin: 6px 0 0;
  max-width: 58ch;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
.track-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
  max-width: 320px;
}
.track-tag {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  letter-spacing: 0.03em;
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 2px 9px;
  white-space: nowrap;
}
.more-link {
  display: flex;
  align-items: baseline;
  gap: 22px;
  margin: 26px 0 0;
}
.more-link a {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.more-link a:hover {
  text-decoration: underline;
}
.more-link a.alt {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
@media (max-width: 768px) {
  .ed-section {
    padding: 44px 0;
  }
  .stat-cell {
    padding: 4px 16px;
  }
  .stat-num {
    font-size: 1.25rem;
  }
  .track-row {
    flex-direction: column;
    gap: 12px;
  }
  .track-tags {
    justify-content: flex-start;
    max-width: none;
  }
}
</style>
