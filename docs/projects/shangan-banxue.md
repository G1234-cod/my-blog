---
title: 上岸伴学小程序
aside: true
outline: deep
---

<script setup>
import ProjectHero from '../.vitepress/theme/components/ProjectHero.vue'
</script>

<ProjectHero 
  title="上岸伴学：考公备考激励小程序"
  subtitle="SHANGAN BANXUE · EXAM-COACHING MINI PROGRAM"
  date="2026.09 - 2026.10"
  role="全栈开发 & 产品设计（三端）"
  :honors="[
    '微信小程序已上线（搜索「上岸伴学」）',
    '三端体系：小程序 + FastAPI + 管理后台',
    '18 个功能页面全量交付'
  ]"
/>

## 一、项目概述

考公是一场长周期的孤独拉锯：计划列了却难坚持、状态起伏无人共情、琐事挤占复习节奏。**上岸伴学**不做题库，而是围绕备考生活的「**督促 + 激励 + 事务**」管家——把倒计时、打卡、奖励、记账、待办、碎片素材沉淀整合为一个每天都要打开的小程序，用「任务 → 达成 → 奖券」的正反馈循环替代意志力消耗。

产品已上线微信小程序平台，搜索「上岸伴学」即可体验。

## 二、三端架构

由旧版单用户 PWA 演进为多用户小程序三端体系，一次开发覆盖三类角色：

| 端 | 技术栈 | 职责 |
|---|---|---|
| **C 端小程序** | Taro 4 + React 18 | 18 个功能页：倒计时督促、打卡、奖券激励、生活管理；正式用户数据全量上云，游客走本地沙盒 |
| **后端服务** | FastAPI + SQLite | 静默登录建档、AppData 18 域同步、任务/奖券中枢、天气/AI/一言外部服务代理 |
| **B 端管理后台** | Vue 3（静态托管） | 用户统计看板、任务发布、奖券发放、数据备份导入 |

```
┌─ C 端 小程序（Taro 4 + React）────┐      ┌─ 后端 FastAPI + SQLite ──────────┐      ┌─ B 端 Vue 3（静态托管）─┐
│ 试玩 / 正式开始 二选一             │ HTTP │  /auth/login   静默登录+建档      │      │  统计看板               │
│ 正式用户：数据全量上云（乐观更新） │◄────►│  /data/*       AppData 18 域同步 │◄────►│  任务发布 / 发券         │
│ 游客：本地沙盒，转正时打包上传     │      │  /proxy/*      天气/AI/一言 代理  │      │  备份 / 数据导入         │
└───────────────────────────────────┘      │  API Key 全部仅存后端 env        │      └─────────────────────────┘
                                            └──────────────────────────────────┘
```

## 三、核心功能

### 1. 今日总览：一屏管住一天

首屏聚合四级/国考倒计时、天气、三餐与喝水提醒、今日复习闪卡与打卡，打开即知「今天该干什么」。

<figure style="margin:24px 0;text-align:center;">
  <img src="./shangan-banxue.assets/今日页.jpg" alt="今日页" style="width:100%;max-width:320px;border-radius:16px;box-shadow:0 8px 24px rgba(0, 0, 0, 0.15);" />
  <figcaption style="color:var(--vp-c-text-2);font-size:0.85em;margin-top:8px;">图 1：今日页——倒计时、天气、三餐喝水与复习闪卡一站式总览</figcaption>
</figure>

### 2. 课程与考试：节点驱动的进度督促

考试节点模板自动识别（打印准考证/笔试/成绩发布/报名），录播课进度落后自动标红提醒，把「长期目标」拆成看得见的节点。

<figure style="margin:24px 0;text-align:center;">
  <img src="./shangan-banxue.assets/课程页.jpg" alt="课程与考试" style="width:100%;max-width:320px;border-radius:16px;box-shadow:0 8px 24px rgba(0, 0, 0, 0.15);" />
  <figcaption style="color:var(--vp-c-text-2);font-size:0.85em;margin-top:8px;">图 2：课程与考试——节点倒计时与录播课进度督促</figcaption>
</figure>

### 3. 打卡与奖券：激励闭环的核心卖点

父子打卡项 + 热力图三档可视化，坚持被看见；达成任务发放奖券（奶茶自由券、懒觉保护券……），集满触发惊喜盲盒——用确定的小奖励对抗备考的长反馈周期。

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px;margin:24px 0;">
  <figure style="margin:0;text-align:center;">
    <img src="./shangan-banxue.assets/打卡页-热力图.jpg" alt="打卡热力图" style="width:100%;max-width:320px;border-radius:16px;box-shadow:0 8px 24px rgba(0, 0, 0, 0.15);" />
    <figcaption style="color:var(--vp-c-text-2);font-size:0.85em;margin-top:8px;">图 3：打卡热力图——习惯养成的可视化反馈</figcaption>
  </figure>
  <figure style="margin:0;text-align:center;">
    <img src="./shangan-banxue.assets/打卡页-奖券袋.jpg" alt="奖券袋" style="width:100%;max-width:320px;border-radius:16px;box-shadow:0 8px 24px rgba(0, 0, 0, 0.15);" />
    <figcaption style="color:var(--vp-c-text-2);font-size:0.85em;margin-top:8px;">图 4：奖券袋与惊喜盲盒——「任务→达成→奖券」正反馈循环</figcaption>
  </figure>
</div>

### 4. 学习工具组：错题、番茄钟、时政收集

错题池/待复习/已掌握三态管理配合刷题闭环；「种花番茄钟」把专注时长可视化为成长；时政素材标签化沉淀（时政/素材/心得/金句），碎片时间的输入不再流失。

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px;margin:24px 0;">
  <figure style="margin:0;text-align:center;">
    <img src="./shangan-banxue.assets/错题练习.jpg" alt="错题练习" style="width:100%;max-width:320px;border-radius:16px;box-shadow:0 8px 24px rgba(0, 0, 0, 0.15);" />
    <figcaption style="color:var(--vp-c-text-2);font-size:0.85em;margin-top:8px;">图 5：错题练习——错题池到刷题的复习闭环</figcaption>
  </figure>
  <figure style="margin:0;text-align:center;">
    <img src="./shangan-banxue.assets/种花番茄钟.jpg" alt="种花番茄钟" style="width:100%;max-width:320px;border-radius:16px;box-shadow:0 8px 24px rgba(0, 0, 0, 0.15);" />
    <figcaption style="color:var(--vp-c-text-2);font-size:0.85em;margin-top:8px;">图 6：种花番茄钟——专注计时与番茄统计</figcaption>
  </figure>
</div>

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px;margin:24px 0;">
  <figure style="margin:0;text-align:center;">
    <img src="./shangan-banxue.assets/时政收集.jpg" alt="时政收集" style="width:100%;max-width:320px;border-radius:16px;box-shadow:0 8px 24px rgba(0, 0, 0, 0.15);" />
    <figcaption style="color:var(--vp-c-text-2);font-size:0.85em;margin-top:8px;">图 7：时政收集——碎片素材的标签化沉淀</figcaption>
  </figure>
  <figure style="margin:0;text-align:center;">
    <img src="./shangan-banxue.assets/AI对话.jpg" alt="智能助手" style="width:100%;max-width:320px;border-radius:16px;box-shadow:0 8px 24px rgba(0, 0, 0, 0.15);" />
    <figcaption style="color:var(--vp-c-text-2);font-size:0.85em;margin-top:8px;">图 8：智能助手——「帮我选」式场景化 AI 对话</figcaption>
  </figure>
</div>

### 5. 生活管理：记账本与事务提醒

收支/预算/趋势图/分类占比的轻记账，配合待办、周期提醒（给家里打电话/理发/买水果）、重要日期管理与「吃什么」转盘抽签，把生活琐事从复习时间里剥离出去。

<figure style="margin:24px 0;text-align:center;">
  <img src="./shangan-banxue.assets/记账本.jpg" alt="记账本" style="width:100%;max-width:320px;border-radius:16px;box-shadow:0 8px 24px rgba(0, 0, 0, 0.15);" />
  <figcaption style="color:var(--vp-c-text-2);font-size:0.85em;margin-top:8px;">图 9：记账本——收支预算与每日支出趋势</figcaption>
</figure>

## 四、关键设计决策

- **游客沙盒 + 数据上云双轨**：陌生人打开走「试玩」，业务数据只存本地沙盒、永不落库；转正时由用户主动决定是否带走数据。正式用户写入走**乐观更新 + 队列重试**，断网可用、联网补传，云端是唯一权威。
- **API Key 只存后端**：大模型 Key 全部收敛到服务端 env，用户端零暴露。
- **合规与体验克制**：小程序 UI 文案统一管控敏感词以通过平台审核；外部服务（天气/AI/一言）失败一律静默降级，绝不阻塞主流程；自研 DatePicker 规避原生控件在 Windows 缩放下的模糊问题。
- **发放权在 B 端**：任务与奖池由管理后台统一发布发放，用户端只读展示，保证激励体系的可信度。

## 五、立即体验

微信扫描下方小程序码，或在微信搜一搜「**上岸伴学**」直达：

<figure style="margin:24px 0;text-align:center;">
  <img src="./shangan-banxue.assets/小程序码.jpg" alt="上岸伴学小程序码" style="width:100%;max-width:300px;border-radius:16px;box-shadow:0 8px 24px rgba(0, 0, 0, 0.15);" />
  <figcaption style="color:var(--vp-c-text-2);font-size:0.85em;margin-top:8px;">图 10：微信扫码直达「上岸伴学」小程序</figcaption>
</figure>
