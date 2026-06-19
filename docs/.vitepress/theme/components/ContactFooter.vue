<template>
  <div class="mega-footer-wrapper" id="contact">
    <div class="mega-content">
      
      <div class="ambient-glow"></div>

      <div class="contact-core">
        <h2 class="title">Initiate_Connection<span class="blink">_</span></h2>
        <p class="subtitle">剥离冗余的寒暄，留下你的邮箱与需求。信息将通过我自研的底层 API 直达终端。</p>

        <form class="hacker-form" @submit.prevent="submitForm">
          
          <div class="input-line">
            <label for="email" class="label-txt">Target_Email :</label>
            <input 
              id="email" 
              type="email" 
              v-model="formData.email" 
              placeholder="Your Email Address..." 
              required 
              :disabled="isSubmitting || status === 'success'"
            />
          </div>

          <div class="input-line">
            <label for="message" class="label-txt">Payload_Data :</label>
            <textarea 
              id="message" 
              v-model="formData.message" 
              placeholder="寻找全栈开发、AI 落地实习机会，或单纯的技术交流..." 
              required 
              rows="3"
              :disabled="isSubmitting || status === 'success'"
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="execute-btn" 
            :class="{ 'submitting': isSubmitting, 'success': status === 'success', 'error': status === 'error' }"
            :disabled="isSubmitting || status === 'success'"
          >
            <span v-if="status === 'idle'">[ EXECUTE / 建立连接 ]</span>
            <span v-else-if="isSubmitting" class="loading-text">TRANSMITTING DATA...</span>
            <span v-else-if="status === 'success'">[ 200 OK / CONNECTION_ESTABLISHED ]</span>
            <span v-else-if="status === 'error'">[ 500 ERROR / RETRY ]</span>
          </button>
        </form>

        <div class="social-links">
          <a href="https://github.com/G1234-cod" target="_blank" class="github-link">
            <span class="icon">🐙</span> Explore My GitHub Repositories ↗
          </a>
        </div>
      </div>

      <div class="copyright">
        © 2026 关运祥. Designed & Built with Native Code.
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

// 绑定表单数据
const formData = reactive({
  email: '',
  message: ''
})

// 状态机：idle (空闲) | submitting (发送中) | success (成功) | error (失败)
const status = ref('idle')
const isSubmitting = ref(false)

// ⚠️ 将这里替换为你自己写的后端接口地址 (例如: http://localhost:8080/api/mail/send)
const API_ENDPOINT = 'http://118.31.40.119:3000/api/contact' 

const submitForm = async () => {
  if (!formData.email || !formData.message) return
  
  isSubmitting.value = true
  status.value = 'submitting'

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        message: formData.message
      })
    })

    if (response.ok) {
      status.value = 'success'
      // 成功后可选择清空表单
      // formData.email = ''
      // formData.message = ''
    } else {
      status.value = 'error'
    }
  } catch (error) {
    console.error('API Connection Failed:', error)
    status.value = 'error'
  } finally {
    isSubmitting.value = false
    
    // 如果失败，3秒后允许重新点击
    if (status.value === 'error') {
      setTimeout(() => { status.value = 'idle' }, 3000)
    }
  }
}
</script>

<style scoped>
/* === 视差揭示 (Mega Footer Reveal) 核心逻辑 === */
.mega-footer-wrapper {
  /* 占满一屏，保持在页面最底层 */
  width: 100%; height: 100vh; position: sticky; bottom: 0; z-index: 0;
}

.mega-content {
  width: 100%; height: 100%; display: flex; flex-direction: column;
  align-items: center; justify-content: center; position: relative;
  /* 强制暗黑主题配色，确保揭示时的电影感 */
  background-color: #0d0f14; color: #ffffff; overflow: hidden;
}

/* 底部幽灵光晕 */
.ambient-glow {
  position: absolute; bottom: -10%; left: 50%; transform: translateX(-50%);
  width: 60vw; height: 40vh; background: radial-gradient(ellipse, rgba(0, 242, 254, 0.15) 0%, transparent 70%);
  filter: blur(80px); pointer-events: none; z-index: 0;
}

.contact-core {
  width: 100%; max-width: 700px; display: flex; flex-direction: column; align-items: flex-start; z-index: 1; padding: 0 5%;
}

/* 巨型标题与光标 */
.title { font-size: 3.8rem; font-weight: 800; color: #ffffff; margin: 0 0 16px 0; font-family: var(--vp-font-family-base); letter-spacing: -1px; line-height: 1.1; }
.blink { font-family: monospace; color: #00f2fe; animation: blinkCursor 1s step-end infinite; }
@keyframes blinkCursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.subtitle { font-size: 1.05rem; color: #8e96aa; line-height: 1.6; margin: 0 0 50px 0; max-width: 90%; }

/* === 黑客级极简表单 === */
.hacker-form { width: 100%; display: flex; flex-direction: column; gap: 30px; }

.input-line { display: flex; flex-direction: column; gap: 8px; }
.label-txt { font-family: monospace; font-size: 0.9rem; color: #00f2fe; font-weight: 600; letter-spacing: 1px; }

/* 只有下划线的输入框，极具高级感 */
input, textarea {
  width: 100%; background: transparent; border: none; border-bottom: 1px solid #32363f;
  padding: 10px 0; font-size: 1.2rem; color: #ffffff; font-family: var(--vp-font-family-base);
  transition: all 0.3s ease; outline: none; resize: none;
}
input:focus, textarea:focus { border-bottom-color: #00f2fe; }
input::placeholder, textarea::placeholder { color: #4a505e; font-weight: 400; }
input:disabled, textarea:disabled { opacity: 0.5; cursor: not-allowed; }

/* 终端指令级执行按钮 */
.execute-btn {
  margin-top: 20px; align-self: flex-start; background: transparent; border: 1px solid #00f2fe;
  color: #00f2fe; font-family: monospace; font-size: 1.1rem; font-weight: 700; padding: 14px 32px;
  border-radius: 8px; cursor: pointer; transition: all 0.3s ease; letter-spacing: 1px;
}
.execute-btn:hover:not(:disabled) { background: rgba(0, 242, 254, 0.1); box-shadow: 0 0 20px rgba(0, 242, 254, 0.2); }
.execute-btn.submitting { border-color: #f5a623; color: #f5a623; cursor: wait; }
.execute-btn.success { border-color: #0ba360; color: #0ba360; background: rgba(11, 163, 96, 0.1); cursor: default; }
.execute-btn.error { border-color: #ff0844; color: #ff0844; background: rgba(255, 8, 68, 0.1); }

.loading-text { animation: pulseOpacity 1.5s infinite; }
@keyframes pulseOpacity { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

/* === GitHub 链路 === */
.social-links { margin-top: 60px; border-top: 1px dashed #32363f; padding-top: 20px; width: 100%; }
.github-link {
  display: inline-flex; align-items: center; gap: 10px; font-size: 0.95rem; font-weight: 600;
  color: #8e96aa; text-decoration: none; transition: color 0.3s ease; font-family: monospace;
}
.github-link:hover { color: #ffffff; }

/* === 底部签名 === */
.copyright { position: absolute; bottom: 20px; width: 100%; text-align: center; font-family: monospace; font-size: 0.8rem; color: #4a505e; }

/* === 移动端适配 === */
@media (max-width: 768px) {
  .title { font-size: 2.5rem; }
  .contact-core { padding: 0 8%; }
  input, textarea { font-size: 1rem; }
  .execute-btn { width: 100%; text-align: center; font-size: 1rem; }
}
</style>