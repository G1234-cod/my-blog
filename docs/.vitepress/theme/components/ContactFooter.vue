<template>
  <div class="contact-wrapper" id="contact">
    
    <div class="ambient-glow"></div>

    <div class="contact-container">
      
      <div class="split-card shadow-hover">
        
        <div class="card-left">
          <div class="left-content">
            <h2 class="left-title">Initiate<br>Connection.</h2>
            
            <div class="quote-box">
              <span class="quote-mark">“</span>
              <p class="quote-text">
                弥合底层逻辑与工程落地之间的鸿沟。寻找全栈开发、AI 落地实习机会，或单纯的技术交流。
              </p>
            </div>
          </div>
          
          <div class="left-footer">
            <span class="status-dot"></span> System Online & Ready
          </div>
        </div>

        <div class="card-right">
          <h3 class="right-title">Send a Message</h3>
          
          <form class="modern-form" @submit.prevent="submitForm">
            
            <div class="form-row">
              <div class="input-group">
                <label for="name">发送人 / Name <span class="required">*</span></label>
                <input 
                  id="name" 
                  type="text" 
                  v-model="formData.name" 
                  placeholder="您的称呼" 
                  required 
                  :disabled="isSubmitting"
                />
              </div>
              <div class="input-group">
                <label for="email">邮箱号 / Email <span class="required">*</span></label>
                <input 
                  id="email" 
                  type="email" 
                  v-model="formData.email" 
                  placeholder="name@example.com" 
                  required 
                  :disabled="isSubmitting"
                />
              </div>
            </div>

            <div class="input-group">
              <label for="message">信息 / Message <span class="required">*</span></label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                placeholder="Hello there, I would like to talk about..." 
                rows="4" 
                required
                :disabled="isSubmitting"
              ></textarea>
            </div>

            <div v-if="sysMessage" :class="['sys-banner', sysStatus]">
              {{ sysMessage }}
            </div>

            <button 
              type="submit" 
              class="submit-btn" 
              :disabled="isSubmitting"
              :class="{ 'success-btn': sysStatus === 'success' }"
            >
              <span v-if="!isSubmitting && sysStatus !== 'success'">发送邮件 / Send Email</span>
              <span v-else-if="isSubmitting" class="loading">正在发送... / Sending...</span>
              <span v-else-if="sysStatus === 'success'">发送成功 / Sent Successfully ✓</span>
            </button>
            
          </form>
        </div>
      </div>

      <div class="bottom-matrix">
        <div class="matrix-title">Or explore my channels...</div>
        <div class="matrix-cards">
          
          <a href="https://github.com/G1234-cod" target="_blank" class="m-card interactive">
            <span class="m-icon">🐙</span>
            <div class="m-text">
              <span class="m-main">GitHub 主页</span>
              <span class="m-sub">Explore my repositories ↗</span>
            </div>
          </a>

          <a href="/api/health" target="_blank" class="m-card interactive">
            <span class="m-icon">🖥️</span>
            <div class="m-text">
              <span class="m-main">独立服务器探针</span>
              <span class="m-sub">Check Node.js server status ↗</span>
             </div>
          </a>

          
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const sysStatus = ref('idle') // 'idle' | 'success' | 'error'
const sysMessage = ref('')

// ✅ 动态相对路径，完美利用 Nginx 的 /api/ 反向代理
const API_ENDPOINT = '/api/contact'

const submitForm = async () => {
  console.log('🚀 表单接管成功！当前填写的数据：', formData);
  // 1. 初始化状态
  sysMessage.value = ''
  sysStatus.value = 'idle'
  isSubmitting.value = true

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message
      })
    })

    // 3. 处理后端响应
    if (response.ok) {
      sysStatus.value = 'success'
      sysMessage.value = '' // 成功时不需要额外文字，按钮已经变绿了
      // 清空表单
      formData.name = ''
      formData.email = ''
      formData.message = ''
    } else {
      // 捕获 HTTP 错误 (如 400, 500)
      const errData = await response.json().catch(() => ({}))
      sysStatus.value = 'error'
      sysMessage.value = `服务器返回错误: ${response.status} ${errData.message || ''}`
    }

  } catch (error) {
    // 4. 捕获致命网络错误 (跨域 CORS / 混合内容拦截 / 服务器宕机)
    sysStatus.value = 'error'
    sysMessage.value = `网络请求失败！请按 F12 检查控制台 (可能原因: CORS跨域限制 或 HTTPS请求HTTP被拦截)。详细信息: ${error.message}`
    console.error('Fetch Error:', error)
  } finally {
    isSubmitting.value = false
    // 失败的话，5秒后清除报错横幅
    if (sysStatus.value === 'error') {
      setTimeout(() => { sysMessage.value = '' }, 8000)
    }
  }
}
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

.contact-container {
  width: 100%; max-width: 1100px; display: flex; flex-direction: column; align-items: center; gap: 40px; z-index: 1; padding: 0 5%;
}

/* === 左右分割聚合卡片 === */
.split-card {
  width: 100%; display: flex; border-radius: 24px; overflow: hidden;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}
.shadow-hover:hover { box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3); }

/* --- 左侧品牌叙事区 --- */
.card-left {
  flex: 0 0 40%; background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, #1a1d24 100%);
  padding: 50px 40px; display: flex; flex-direction: column; justify-content: space-between;
  border-right: 1px solid var(--vp-c-border);
}
.left-title { font-size: 3rem; font-weight: 800; color: var(--vp-c-text-1); line-height: 1.1; margin: 0 0 40px 0; letter-spacing: -1px; }

.quote-box { position: relative; }
.quote-mark { position: absolute; top: -30px; left: -10px; font-size: 5rem; font-family: serif; color: var(--vp-c-brand-1); opacity: 0.3; line-height: 1; pointer-events: none; }
.quote-text { position: relative; z-index: 1; font-size: 1.05rem; color: var(--vp-c-text-2); line-height: 1.8; font-weight: 500; }

.left-footer { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; font-weight: 600; color: var(--vp-c-text-3); margin-top: 60px; font-family: monospace; }
.status-dot { width: 8px; height: 8px; background-color: #0ba360; border-radius: 50%; box-shadow: 0 0 10px #0ba360; }

/* --- 右侧现代表单区 --- */
.card-right {
  flex: 1; background: var(--vp-c-bg); padding: 50px 60px;
}
.right-title { font-size: 1.5rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0 0 30px 0; }

.modern-form { display: flex; flex-direction: column; gap: 24px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

.input-group { display: flex; flex-direction: column; gap: 8px; }
.input-group label { font-size: 0.85rem; font-weight: 600; color: var(--vp-c-text-1); }
.required { color: #ff0844; }

input, textarea {
  width: 100%; background: var(--vp-c-default-soft); border: 1px solid var(--vp-c-border);
  padding: 14px 16px; border-radius: 12px; font-size: 1rem; color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-base); transition: all 0.2s ease; outline: none;
}
input:focus, textarea:focus { border-color: var(--vp-c-brand-1); background: var(--vp-c-bg-soft); box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-1), 0.1); }
textarea { resize: vertical; min-height: 100px; }
input:disabled, textarea:disabled { opacity: 0.6; cursor: not-allowed; }

/* 错误与状态横幅 */
.sys-banner { padding: 12px 16px; border-radius: 8px; font-size: 0.9rem; font-weight: 600; line-height: 1.5; }
.sys-banner.error { background: rgba(255, 8, 68, 0.1); color: #ff0844; border: 1px solid rgba(255, 8, 68, 0.3); }

/* 高级发送按钮 */
.submit-btn {
  align-self: flex-start; background: var(--vp-c-text-1); color: var(--vp-c-bg);
  font-size: 1rem; font-weight: 700; padding: 14px 32px; border-radius: 12px;
  cursor: pointer; transition: all 0.3s ease; border: none; margin-top: 10px;
}
.submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); opacity: 0.9; }
.submit-btn:disabled { opacity: 0.7; cursor: wait; }
.success-btn { background: #0ba360 !important; color: white !important; cursor: default !important; }

/* === 底部通信矩阵 === */
.bottom-matrix { width: 100%; display: flex; flex-direction: column; gap: 16px; }
.matrix-title { font-size: 0.9rem; font-weight: 700; color: var(--vp-c-text-3); text-align: left; }
.matrix-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.m-card {
  display: flex; align-items: center; gap: 16px; padding: 16px 24px;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border); border-radius: 16px;
  text-decoration: none; transition: all 0.2s ease;
}
.interactive:hover { border-color: var(--vp-c-text-1); transform: translateY(-3px); box-shadow: var(--vp-shadow-2); }
.static-card { opacity: 0.8; cursor: default; } /* 服务器卡片只是展示，不可点击 */

.m-icon { font-size: 1.6rem; }
.m-text { display: flex; flex-direction: column; }
.m-main { font-size: 1rem; font-weight: 700; color: var(--vp-c-text-1); }
.m-sub { font-size: 0.8rem; color: var(--vp-c-text-2); font-weight: 500; margin-top: 2px; }

/* === 移动端适配 === */
@media (max-width: 900px) {
  .split-card { flex-direction: column; }
  .card-left { border-right: none; border-bottom: 1px solid var(--vp-c-border); padding: 40px 30px; }
  .card-right { padding: 40px 30px; }
  .form-row { grid-template-columns: 1fr; gap: 16px; }
  .matrix-cards { grid-template-columns: 1fr; gap: 12px; }
  .submit-btn { width: 100%; }
}
</style>