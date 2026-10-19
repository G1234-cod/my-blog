<template>
  <section class="ed-section" id="honors">
    <SectionHead
      tag="02 / HONORS & AWARDS"
      title="荣誉与奖项"
      sub="奖项是工程能力的试金石——连续两学年国家励志奖学金、国家级竞赛与软著沉淀。"
    />

    <!-- 数字带：mono 等宽数字，一条横带交代关键事实 -->
    <ul class="stat-strip">
      <li v-for="s in stats" :key="s.label" class="stat-cell">
        <span class="stat-num mono">{{ s.value }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </li>
    </ul>

    <!-- 奖项明细：两列分组，全部可见 -->
    <div class="honor-grid">
      <div v-for="g in groups" :key="g.title" class="honor-group">
        <h3 class="honor-title">{{ g.title }}</h3>
        <ul class="honor-list">
          <li v-for="item in g.items" :key="item" class="honor-item">
            <span class="honor-dot" aria-hidden="true"></span>{{ item }}
          </li>
        </ul>
      </div>
    </div>

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

const groups = [
  {
    title: '奖学金与称号',
    items: ['国家励志奖学金（2023–2024）', '国家励志奖学金（2024–2025）', '河南省省级三好学生']
  },
  {
    title: '学科竞赛',
    items: [
      'ACM-ICPC 国际大学生程序设计竞赛区域赛',
      'iCAN 创新创业大赛（省二）',
      '中国国际大学生创新大赛（省二）',
      '中国计算机设计大赛（省三）',
      '蓝桥杯全国大赛（省三）',
      '全国大学生数学建模竞赛（省三）'
    ]
  },
  {
    title: '资质与知识产权',
    items: ['国家计算机软件著作权 ×3', '软件设计师（国家软考中级）', '普通话水平测试（二级甲等）']
  },
  {
    title: '工业实践',
    items: ['编程猫 · 企业级研发实习', '班长 & 团委部长（团队管理与跨部门协同）']
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
  margin: 0 0 40px;
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
/* 奖项两列分组 */
.honor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px 48px;
}
.honor-title {
  margin: 0 0 12px;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.honor-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--vp-c-divider);
}
.honor-item {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 9px 2px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.94rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
.honor-dot {
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: var(--vp-c-brand-1);
  transform: translateY(-2px);
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
  .honor-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
