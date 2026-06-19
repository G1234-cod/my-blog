<template>
  <div class="mega-footer-wrapper" id="contact">
    <div class="mega-content">
      
      <div class="ambient-glow"></div>

      <div class="contact-core">
        <h2 class="title">Initiate_Connection<span class="blink">_</span></h2>
        <p class="subtitle">打通全栈终端通信链路。数据将通过本地安全后端 API 与 163 邮件网关直达核心中枢。</p>

        <form class="bento-form-card" @submit.prevent="submitForm">
          
          <div class="system-logs">
            <div class="log-line"><span class="log-ok">[ OK ]</span> System Mail Router Initialized.</div>
            <div class="log-line"><span class="log-ok">[ OK ]</span> Remote Endpoint Secure Connected.</div>
            <div class="log-line" v-if="status === 'submitting'"><span class="log-warn">[ SENDING ]</span> Transmitting data packets via SMTP...</div>
            <div class="log-line" v-if="status === 'success'"><span class="log-success">[ READY ]</span> 200 OK. Connection established successfully.</div>
            <div class="log-line" v-if="status === 'error'"><span class="log-fail">[ FAIL ]</span> 500 Broadcast Error. Awaiting terminal retry...</div>
          </div>

          <div class="form-row">
            <div class="input-group-box" :class="{ 'focused': focusedField === 'name' }">
              <div class="group-header">
                <label for="name" class="label-txt">01 // SENDER_NAME</label>
                <span class="active-badge" v-if="focusedField === 'name'">[ ACTIVE ]</span>
              </div>
              <input 
                id="name"
                type="text" 
                v-model="formData.name" 
                placeholder="您的称呼..." 
                required
                @focus="focusedField = 'name'"
                @blur="focusedField = ''"
                :disabled="isSubmitting || status === 'success'"
              />
            </div>

            <div class="input-group-box" :class="{ 'focused': focusedField === 'email' }">
              <div class="group-header">
                <label for="email" class="label-txt">02 // TARGET_EMAIL</label>
                <span class="active-badge" v-if="focusedField === 'email'">[ ACTIVE ]</span>
              </div>
              <input 
                id="email" 
                type="email" 
                v-model="formData.email" 
                placeholder="您的电子邮箱..." 
                required 
                @focus="focusedField = 'email'"
                @blur="focusedField = ''"
                :disabled="isSubmitting || status === 'success'"
              />
            </div>
          </div>

          <div class="input-group-box textarea-box" :class="{ 'focused': focusedField === 'message' }">
            <div class="group-header">
              <label for="message" class="label-txt">03 // PAYLOAD_DATA</label>
              <span class="active-badge" v-if="focusedField === 'message'">[ ACTIVE ]</span>
            </div>
            <textarea 
              id="message" 
              v-model="formData.message" 
              placeholder="请输入您寻找全栈开发、AI 落地实习机会，或者技术交流的详细意向..." 
              required 
              rows="4"
              maxlength="500"
              @focus="focusedField = 'message'"
              @blur="focusedField = ''"
              :disabled="isSubmitting || status === 'success'"
            ></textarea>
            <div class="char-counter">{{ formData.message.length }} / 500 octets</div>
          </div>

          <button 
            type="submit" 
            class="execute-btn" 
            :class="{ 'submitting': isSubmitting, 'success': status === 'success', 'error': status === 'error' }"
            :disabled="isSubmitting || status === 'success'"
          >
            <span v-if="status === 'idle'">[ EXECUTE_BROADCAST / 建立双向连接 ]</span>
            <span v-else-if="isSubmitting" class="loading-text">ENCRYPTING & TRANSMITTING...</span>
            <span v-else-if="status === 'success'">[ 200 OK / BROADCAST_SUCCESS ]</span>
            <span v-else-if="status === 'error'">[ 500 ERROR / TERMINAL_RETRY ]</span>
          </button>
        </form>

        <div class="communication-hub">
          <div class="hub-title">COMMUNICATION MATRIX</div>
          <div class="hub-links">
            <a href="https://github.com/G1234-cod" target="_blank" class="hub-card-link">
              <span class="hub-icon">🐙</span>
              <div class="hub-text">
                <span class="h-main">GitHub 枢纽</span>
                <span class="h-sub">Explore source repositories</span>
              </div>
            </a>
            <a href="mailto:你的真实163邮箱@163.com" class="hub-card-link">
              <span class="hub-icon">✉️</span>
              <div class="hub-text">
                <span class="h-main">163 直连网关</span>
                <span class="h-sub">Fast tracking backup link</span>
              </div>
            </a>
          </div>
        </div>

      </div>

      <div class="copyright">
        © 2026 关运祥. All Node Clusters Operational. Built with Native Frontend Stack.
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

const status = ref('idle')
const isSubmitting = ref(false)
const focusedField = ref('')

// 严格锁定您的专属云服务器后端 API
const API_ENDPOINT = 'http://118.31.40.119:3000/api/contact' 

const submitForm = async () => {
  if (!formData.email || !formData.message || !formData.name) return
  
  isSubmitting.value = true
  status.value = 'submitting'

  // 全栈工程安全性拼接：将姓名注入信息体最前端，100%防止后端DTO未定义该字段导致的丢失
  const formattedMessage = `[发件人姓名: ${formData.name}]\n[联络内容]: ${formData.message}`

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        message: formattedMessage
      })
    })

    if (response.ok) {
      status.value = 'success'
    } else {
      status.value = 'error'
    }
  } catch (error) {
    console.error('API Pipeline Interrupted:', error)
    status.value = 'error'
  } finally {
    isSubmitting.value = false
    
    // 如果管道报错，3秒后复位状态机，允许重新投递
    if (status.value === 'error') {
      setTimeout(() => { status.value = 'idle' }, 3000)
    }
  }
}
</script>

<style scoped>
/* === 视差揭示 (Mega Footer Reveal) 核心层级 === */
.mega-footer-wrapper {
  width: 100%; height: 100vh; position: sticky; bottom: 0; z-index: 0;
}

.mega-content {
  width: 100%; height: 100%; display: flex; flex-direction: column;
  align-items: center; justify-content: center; position: relative;
  background-color: #0d0f14; color: #ffffff; overflow: hidden;
}

.ambient-glow {
  position: absolute; bottom: -10%; left: 50%; transform: translateX(-50%);
  width: 70vw; height: 45vh; background: radial-gradient(ellipse, rgba(0, 242, 254, 0.12) 0%, transparent 70%);
  filter: blur(90px); pointer-events: none; z-index: 0;
}

.contact-core {
  width: 100%; max-width: 800px; display: flex; flex-direction: column; align-items: flex-start; z-index: 1; padding: 0 5%;
}

/* 巨型平滑标题与光标 */
.title { font-size: 3.6rem; font-weight: 800; color: #ffffff; margin: 0 0 16px 0; font-family: var(--vp-font-family-base); letter-spacing: -1px; line-height: 1.1; }
.blink { font-family: monospace; color: #00f2fe; animation: blinkCursor 1s step-end infinite; }
@keyframes blinkCursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.subtitle { font-size: 1.05rem; color: #8e96aa; line-height: 1.6; margin: 0 0 36px 0; max-width: 90%; }

/* === 模块化控制台表单容器 === */
.bento-form-card {
  width: 100%; background: rgba(22, 25, 34, 0.6); border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px; padding: 36px; display: flex; flex-direction: column; gap: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

/* 极客实时状态日志栏 */
.system-logs {
  background: #080a0e; border: 1px solid rgba(255, 255, 255, 0.03); border-radius: 12px;
  padding: 14px 20px; font-family: monospace; font-size: 0.8rem; line-height: 1.6;
}
.log-line { color: #5c6475; }
.log-ok { color: #00f2fe; font-weight: bold; }
.log-warn { color: #f5a623; font-weight: bold; }
.log-success { color: #0ba360; font-weight: bold; }
.log-fail { color: #ff0844; font-weight: bold; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; }

/* 模块化内嵌输入框容器 (Inset Card) */
.input-group-box {
  background: #12151d; border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 14px;
  padding: 12px 18px; display: flex; flex-direction: column; gap: 6px;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.input-group-box.focused { border-color: #00f2fe; background: #151924; box-shadow: 0 0 15px rgba(0, 242, 254, 0.08); }

.group-header { display: flex; justify-content: space-between; align-items: center; }
.label-txt { font-family: monospace; font-size: 0.75rem; color: #4a505e; font-weight: 700; letter-spacing: 0.5px; }
.active-badge { font-family: monospace; font-size: 0.75rem; color: #00f2fe; font-weight: bold; animation: pulseOpacity 1s infinite; }

input, textarea {
  width: 100%; background: transparent; border: none; padding: 4px 0;
  font-size: 1.1rem; color: #ffffff; font-family: var(--vp-font-family-base); outline: none; transition: color 0.3s;
}
textarea { resize: none; }
input::placeholder, textarea::placeholder { color: #32363f; font-weight: 500; }
input:disabled, textarea:disabled { opacity: 0.4; cursor: not-allowed; }

.textarea-box { position: relative; padding-bottom: 30px; }
.char-counter { position: absolute; bottom: 12px; right: 18px; font-family: monospace; font-size: 0.75rem; color: #32363f; font-weight: 600; }

/* 宽幅触控提交按钮 */
.execute-btn {
  width: 100%; background: transparent; border: 1px solid #00f2fe;
  color: #00f2fe; font-family: monospace; font-size: 1.1rem; font-weight: 700; padding: 16px;
  border-radius: 12px; cursor: pointer; transition: all 0.3s ease; letter-spacing: 0.5px;
}
.execute-btn:hover:not(:disabled) { background: rgba(0, 242, 254, 0.08); box-shadow: 0 0 25px rgba(0, 242, 254, 0.2); }
.execute-btn.submitting { border-color: #f5a623; color: #f5a623; cursor: wait; }
.execute-btn.success { border-color: #0ba360; color: #0ba360; background: rgba(11, 163, 96, 0.08); cursor: default; }
.execute-btn.error { border-color: #ff0844; color: #ff0844; background: rgba(255, 8, 68, 0.08); }

.loading-text { animation: pulseOpacity 1.5s infinite; }
@keyframes pulseOpacity { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

/* === 精修双通道通信矩阵 === */
.communication-hub { margin-top: 40px; width: 100%; }
.hub-title { font-family: monospace; font-size: 0.8rem; color: #32363f; font-weight: 700; letter-spacing: 2px; margin-bottom: 16px; }
.hub-links { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; }

.hub-card-link {
  display: flex; align-items: center; gap: 16px; padding: 16px 24px;
  background: #12151d; border: 1px solid rgba(255, 255, 255, 0.03); border-radius: 14px;
  text-decoration: none; transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hub-card-link:hover { transform: translateY(-3px); border-color: #00f2fe; box-shadow: var(--vp-shadow-2); }
.hub-icon { font-size: 1.5rem; }
.hub-text { display: flex; flex-direction: column; align-items: flex-start; }
.h-main { font-size: 1rem; font-weight: 800; color: #ffffff; }
.h-sub { font-size: 0.75rem; color: #5c6475; font-weight: 600; margin-top: 2px; }

/* 页脚 */
.copyright { position: absolute; bottom: 20px; width: 100%; text-align: center; font-family: monospace; font-size: 0.8rem; color: #32363f; font-weight: 600; }

/* 移动端降级 */
@media (max-width: 768px) {
  .title { font-size: 2.4rem; }
  .bento-form-card { padding: 24px; gap: 16px; }
  .form-row, .hub-links { grid-template-columns: 1fr; gap: 16px; }
}
</style>