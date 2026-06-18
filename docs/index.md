---
layout: doc
---

<div class="universe-grid"></div>
<div class="universe-container" id="universe-container">

  <!-- 全局导航栏 -->
  <DynamicNavbar />

  <!-- 第一屏：巨幕系统开场 -->
  <section class="universe-screen" id="screen-hero">
    <div class="universe-content">
      <HeroScreen />
    </div>
  </section>

  <!-- 第二屏：数据与技能透视 -->
  <section class="universe-screen" id="screen-stats">
    <div class="universe-content">
      <StatsBento />
    </div>
  </section>

  <!-- 第三屏：荣誉里程碑 -->
  <section class="universe-screen" id="screen-timeline">
    <div class="universe-content">
      <StickyTimeline />
    </div>
  </section>

  <!-- 第四屏：工程实战大厅 -->
  <section class="universe-screen" id="screen-projects">
    <div class="universe-content">
      <ProjectShowcase />
    </div>
  </section>

  <!-- 第五屏：博客分流卡片 -->
  <section class="universe-screen" id="screen-hub">
    <div class="universe-content">
      <HubGateway />
    </div>
  </section>

  <!-- 第六屏：联系面板 -->
  <section class="universe-screen" id="screen-contact">
    <div class="universe-content">
      <ContactFooter />
    </div>
  </section>

</div>