<template>
  <div class="contact-wrapper" id="contact">
    <div class="ambient-glow"></div>

    <div class="bento-container">
      
      <div class="bento-left">
        <div class="main-contact-card shadow-hover">
          
          <div class="card-header">
            <h2 class="left-title">Initiate Connection.</h2>
            <p class="quote-text">
              弥合底层逻辑与工程落地之间的鸿沟。<br>
              寻找全栈开发、AI 落地实习机会，或单纯的技术交流。
            </p>
          </div>

          <div class="card-body">
            <form class="modern-form" @submit.prevent="submitForm">
              <div class="form-row">
                <div class="input-group">
                  <label for="name">发送人 / Name <span class="required">*</span></label>
                  <input id="name" type="text" v-model="formData.name" placeholder="您的称呼" required :disabled="isSubmitting" />
                </div>
                <div class="input-group">
                  <label for="email">邮箱号 / Email <span class="required">*</span></label>
                  <input id="email" type="email" v-model="formData.email" placeholder="name@example.com" required :disabled="isSubmitting" />
                </div>
              </div>

              <div class="input-group">
                <label for="message">信息 / Message <span class="required">*</span></label>
                <textarea id="message" v-model="formData.message" placeholder="Hello there, I would like to talk about..." rows="4" required :disabled="isSubmitting"></textarea>
              </div>

              <div v-if="sysMessage" :class="['sys-banner', sysStatus]">
                {{ sysMessage }}
              </div>

              <div class="form-footer">
                <button type="submit" class="submit-btn" :disabled="isSubmitting" :class="{ 'success-btn': sysStatus === 'success' }">
                  <span v-if="!isSubmitting && sysStatus !== 'success'">发送邮件 / Send Email</span>
                  <span v-else-if="isSubmitting" class="loading">正在发送... / Sending...</span>
                  <span v-else-if="sysStatus === 'success'">发送成功 / Sent Successfully ✓</span>
                </button>
                
                <div class="status-indicator">
                  <span class="status-dot"></span> SYSTEM ONLINE & READY
                </div>
              </div>
            </form>
          </div>
          
        </div>
      </div>

      <div class="bento-right">
        
        <div class="side-widget github-widget">
          <div class="widget-title">Explore Open Source</div>
          <a href="https://github.com/G1234-cod" target="_blank" class="m-card interactive">
            <span class="m-icon">🐙</span>
            <div class="m-text">
              <span class="m-main">GitHub 主页</span>
              <span class="m-sub">Explore my repositories ↗</span>
            </div>
          </a>
        </div>

        <div class="side-widget terminal-widget">
          <div class="widget-title">Server Live Status</div>
          <div class="m-card terminal-card">
            <div class="terminal-header">
              <div class="mac-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="title">health_probe.sh</span>
            </div>
            
            <div class="terminal-body" v-if="serverData">
              <p class="line"><span class="prompt">root@gyx:~#</span> ./status</p>
              <p class="line success">>> STATUS: {{ serverData.status || '200 OK' }}</p>
              <p class="line info">>> NODE: {{ serverData.nodeVersion || 'v18.x' }}</p>
              <p class="line info">>> RAM: {{ serverData.memory?.rss || 'Calculating...' }}</p>
              <p class="line info">>> UPTIME: {{ formattedUptime }}</p>
              <p class="line blink">_</p>
            </div>
            <div class="terminal-body" v-else>
              <p class="line warning">Booting Node.js engine...</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue'

const formData = reactive({ name: '', email: '', message: '' })
const isSubmitting = ref(false)
const sysStatus = ref('idle') 
const sysMessage = ref('')
const API_ENDPOINT = '/api/contact'

const submitForm = async () => {
  sysMessage.value = ''
  sysStatus.value = 'idle'
  isSubmitting.value = true

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message })
    })

    if (response.ok) {
      sysStatus.value = 'success'
      sysMessage.value = '' 
      formData.name = ''
      formData.email = ''
      formData.message = ''
    } else {
      const errData = await response.json().catch(() => ({}))
      sysStatus.value = 'error'
      sysMessage.value = `服务器返回错误: ${response.status} ${errData.message || ''}`
    }
  } catch (error) {
    sysStatus.value = 'error'
    sysMessage.value = `网络请求失败！请检查控制台。详细信息: ${error.message}`
  } finally {
    isSubmitting.value = false
    if (sysStatus.value === 'error') setTimeout(() => { sysMessage.value = '' }, 8000)
  }
}

const serverData = ref(null)
const fetchServerStatus = async () => {
  try {
    const res = await fetch('/api/health')
    if (res.ok) serverData.value = await res.json()
  } catch (error) {
    console.error('探针探测失败', error)
  }
}

const formattedUptime = computed(() => {
  if (!serverData.value || !serverData.value.uptime) return '0h 0m 0s'
  const totalSeconds = Math.floor(serverData.value.uptime)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${hours}h ${minutes}m ${seconds}s`
})

onMounted(() => { fetchServerStatus() })
</script>

<style scoped>
/* === 基础容器 === */
.contact-wrapper {
  width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden; background-color: var(--vp-c-bg); padding: 80px 0;
}

.ambient-glow {
  position: absolute; top: 20%; left: 50%; transform: translateX(-50%);
  width: 80vw; height: 60vh; background: radial-gradient(ellipse, rgba(0, 242, 254, 0.08) 0%, transparent 60%);
  filter: blur(100px); pointer-events: none; z-index: 0;
}

/* === 便当盒 (Bento Box) 网格系统 === */
.bento-container {
  width: 100%; 
  max-width: 1350px; /* 🚀 变长：大幅拓宽最大宽度，填补屏幕空旷感 */
  display: grid;
  grid-template-columns: 2.3fr 1fr; /* 🚀 左侧比例增加：左边占用更多空间 */
  gap: 36px;
  z-index: 1; 
  padding: 0 4%;
  align-items: stretch; /* 🚀 绝对等高：强迫左右两侧高度锁定一致 */
}

/* --- 左侧主卡片 --- */
.bento-left {
  display: flex;
  flex-direction: column;
}

.main-contact-card {
  flex: 1; /* 填满左侧容器 */
  min-height: 620px; /* 🚀 增高：赋予左侧表单一个最低高度 */
  display: flex; flex-direction: column; 
  border-radius: 24px; overflow: hidden;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease;
}
.shadow-hover:hover { box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25); }

.card-header {
  padding: 45px 55px 25px; /* 增加内边距，更舒展 */
  background: linear-gradient(135deg, rgba(26,29,36,0.3) 0%, transparent 100%);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.left-title { font-size: 2.8rem; font-weight: 800; color: var(--vp-c-text-1); line-height: 1.1; margin: 0 0 16px 0; letter-spacing: -0.5px; }
.quote-text { font-size: 1.05rem; color: var(--vp-c-text-2); line-height: 1.6; font-weight: 500; margin: 0; }

.card-body {
  padding: 35px 55px 45px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modern-form { display: flex; flex-direction: column; gap: 24px; } /* 拉大表单间隙 */
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.input-group { display: flex; flex-direction: column; gap: 8px; }
.input-group label { font-size: 0.85rem; font-weight: 600; color: var(--vp-c-text-1); }
.required { color: #ff0844; }

input, textarea {
  width: 100%; background: var(--vp-c-default-soft); border: 1px solid var(--vp-c-border);
  padding: 16px 18px; border-radius: 12px; font-size: 1rem; color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-base); transition: all 0.2s ease; outline: none;
}
input:focus, textarea:focus { border-color: var(--vp-c-brand-1); background: var(--vp-c-bg-soft); box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-1), 0.1); }
textarea { resize: vertical; min-height: 120px; } /* 输入框更高 */
input:disabled, textarea:disabled { opacity: 0.6; cursor: not-allowed; }

.sys-banner { padding: 12px 16px; border-radius: 8px; font-size: 0.9rem; font-weight: 600; line-height: 1.5; }
.sys-banner.error { background: rgba(255, 8, 68, 0.1); color: #ff0844; border: 1px solid rgba(255, 8, 68, 0.3); }

.form-footer {
  display: flex; align-items: center; justify-content: space-between; margin-top: 10px;
}
.submit-btn {
  background: var(--vp-c-text-1); color: var(--vp-c-bg);
  font-size: 1rem; font-weight: 700; padding: 14px 32px; border-radius: 10px;
  cursor: pointer; transition: all 0.3s ease; border: none;
}
.submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); opacity: 0.9; }
.submit-btn:disabled { opacity: 0.7; cursor: wait; }
.success-btn { background: #0ba360 !important; color: white !important; cursor: default !important; }

/* 🚀 修改：系统状态指示器，使用硬核等宽字体 */
.status-indicator { 
  display: flex; align-items: center; gap: 10px; 
  font-size: 0.85rem; font-weight: 700; color: #0ba360; 
  font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; /* 赛博代码字体 */
  letter-spacing: 1px;
}
.status-dot { width: 8px; height: 8px; background-color: #0ba360; border-radius: 50%; box-shadow: 0 0 10px #0ba360; animation: pulse 2s infinite; }

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(11, 163, 96, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(11, 163, 96, 0); }
  100% { box-shadow: 0 0 0 0 rgba(11, 163, 96, 0); }
}

/* --- 右侧垂直小组件堆叠 --- */
.bento-right {
  display: flex;
  flex-direction: column;
  height: 100%; /* 🚀 强行等高：充满父网格的拉伸高度 */
  gap: 24px;
}

.side-widget {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 顶部 GitHub 卡片高度自适应 */
.github-widget { flex: 0 0 auto; }

/* 🚀 底部终端卡片高度霸占剩余所有空间 */
.terminal-widget { flex: 1 1 0; }

.widget-title {
  font-size: 0.85rem; font-weight: 700; color: var(--vp-c-text-3); text-transform: uppercase; letter-spacing: 1px;
}

/* 基础卡片样式 */
.m-card {
  display: flex; align-items: center; gap: 16px; padding: 22px;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border); border-radius: 16px;
  text-decoration: none; transition: all 0.2s ease;
}
.interactive:hover { border-color: var(--vp-c-text-1); transform: translateY(-3px); box-shadow: var(--vp-shadow-2); }
.m-icon { font-size: 1.8rem; }
.m-text { display: flex; flex-direction: column; }
.m-main { font-size: 1.05rem; font-weight: 700; color: var(--vp-c-text-1); }
.m-sub { font-size: 0.85rem; color: var(--vp-c-text-2); font-weight: 500; margin-top: 4px; }

/* 专属极客终端卡片 */
.terminal-card {
  height: 100%; /* 让卡片充满 widget */
  flex-direction: column;
  padding: 0 !important; 
  background: rgba(13, 17, 23, 0.8) !important;
  cursor: default;
  align-items: stretch;
  border-radius: 16px;
  overflow: hidden;
}
.terminal-card:hover { border-color: var(--vp-c-border); transform: none; box-shadow: none; }

.terminal-header {
  background: rgba(22, 27, 34, 0.95);
  padding: 12px 18px;
  display: flex; align-items: center; justify-content: space-between; 
  border-bottom: 1px solid #30363d;
}
.mac-dots { display: flex; gap: 6px; }
.dot { width: 12px; height: 12px; border-radius: 50%; }
.dot.red { background-color: #ff5f56; }
.dot.yellow { background-color: #ffbd2e; }
.dot.green { background-color: #27c93f; }

.terminal-header .title {
  color: #8b949e; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.5px; font-family: monospace;
}

.terminal-body {
  padding: 24px;
  flex-grow: 1; /* 让终端内容区域拉伸 */
  font-size: 0.85rem; 
  line-height: 1.8; 
  display: flex; flex-direction: column; justify-content: center; /* 内容居中展示 */
  font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  text-shadow: 0 0 2px rgba(255,255,255,0.1); 
}

.line { margin: 3px 0; white-space: nowrap; text-align: left; }
.prompt { color: #58a6ff; font-weight: bold; margin-right: 8px; }
.success { color: #3fb950; }
.info { color: #8b949e; }
.warning { color: #d29922; }
.blink { animation: blinker 1s step-end infinite; color: #c9d1d9; font-weight: bold; }
@keyframes blinker { 50% { opacity: 0; } }

/* === 移动端响应式适配 === */
@media (max-width: 900px) {
  .bento-container { grid-template-columns: 1fr; gap: 24px; padding: 0 20px; }
  .card-header, .card-body { padding: 30px; }
  .form-row { grid-template-columns: 1fr; gap: 16px; }
  .form-footer { flex-direction: column-reverse; align-items: stretch; gap: 20px; }
  .status-indicator { justify-content: center; }
  .submit-btn { width: 100%; }
  .terminal-card { min-height: 250px; }
}
</style>