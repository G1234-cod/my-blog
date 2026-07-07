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

              <div class="input-group">
                <label>附件 / Attachments</label>
                <div 
                  class="file-upload-area" 
                  :class="{ dragover: isDragging, 'has-files': selectedFiles.length > 0 }"
                  @click="$refs.fileInput.click()"
                  @dragover.prevent="isDragging = true"
                  @dragleave.prevent="isDragging = false"
                  @drop.prevent="handleDrop"
                >
                  <input 
                    ref="fileInput" 
                    type="file" 
                    multiple 
                    accept="image/jpeg,image/png,image/gif,image/webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,application/json,application/zip,application/x-rar-compressed"
                    @change="handleFileSelect"
                  />

                  <div class="upload-prompt" v-if="selectedFiles.length === 0">
                    <div class="upload-icon">📎</div>
                    <div class="upload-text">点击或拖拽文件到此处上传</div>
                    <div class="upload-hint">支持图片、PDF、文档、压缩包，最多 3 个文件，单个不超过 10MB</div>
                  </div>

                  <div class="file-list-container" v-else>
                    <div class="file-list">
                      <div v-for="(file, index) in selectedFiles" :key="index" class="file-item" @click.stop>
                        <div class="file-info">
                          <span class="file-icon">{{ getFileIcon(file.type) }}</span>
                          <div>
                            <div class="file-name">{{ file.name }}</div>
                            <div class="file-size">{{ formatFileSize(file.size) }}</div>
                          </div>
                        </div>
                        <button type="button" class="file-remove" @click.stop="removeFile(index)">×</button>
                      </div>
                    </div>
                    <div class="upload-hint add-more" v-if="selectedFiles.length < 3">
                      还可以继续点击或拖拽添加 ({{ selectedFiles.length }}/3)
                    </div>
                  </div>
                </div>
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
const selectedFiles = ref([])
const isDragging = ref(false)

const getFileIcon = (type) => {
  if (type.startsWith('image/')) return '🖼️'
  if (type.includes('pdf')) return '📕'
  if (type.includes('word') || type.includes('document')) return '📘'
  if (type.includes('excel') || type.includes('spreadsheet')) return '📗'
  if (type.includes('zip') || type.includes('rar')) return '📦'
  if (type.includes('json')) return '📄'
  if (type.includes('text')) return '📝'
  return '📎'
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  addFiles(files)
}

const handleDrop = (event) => {
  isDragging.value = false
  const files = Array.from(event.dataTransfer.files)
  addFiles(files)
}

const addFiles = (files) => {
  const maxFiles = 3
  const maxSize = 10 * 1024 * 1024
  
  files.forEach(file => {
    if (selectedFiles.value.length >= maxFiles) {
      sysMessage.value = '最多只能上传 3 个文件'
      sysStatus.value = 'error'
      setTimeout(() => { sysStatus.value = 'idle'; sysMessage.value = '' }, 3000)
      return
    }
    
    if (file.size > maxSize) {
      sysMessage.value = `${file.name} 超过 10MB 限制`
      sysStatus.value = 'error'
      setTimeout(() => { sysStatus.value = 'idle'; sysMessage.value = '' }, 3000)
      return
    }
    
    selectedFiles.value.push(file)
  })
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const submitForm = async () => {
  sysMessage.value = ''
  sysStatus.value = 'idle'
  isSubmitting.value = true

  try {
    const form = new FormData()
    form.append('name', formData.name)
    form.append('email', formData.email)
    form.append('message', formData.message)
    
    selectedFiles.value.forEach(file => {
      form.append('attachments', file)
    })

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: form
    })

    if (response.ok) {
      sysStatus.value = 'success'
      sysMessage.value = '' 
      formData.name = ''
      formData.email = ''
      formData.message = ''
      selectedFiles.value = []

      // 发送成功后，等待3秒自动恢复按钮状态
      setTimeout(() => {
        sysStatus.value = 'idle'
      }, 3000)

    } else {
      const errData = await response.json().catch(() => ({}))
      sysStatus.value = 'error'
      if (response.status === 413) {
        sysMessage.value = errData.message || '文件过大，请压缩后重新上传（单个文件不超过 10MB）'
      } else {
        sysMessage.value = errData.message || `服务器返回错误: ${response.status}`
      }
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
  width: 100%; 
  min-height: 100%; 
  display: flex; 
  flex-direction: column; 
  align-items: center;      
  justify-content: flex-start; 
  
  position: relative; 
  overflow-x: hidden; 
  overflow-y: visible;   
  background-color: var(--vp-c-bg); 
  
  padding: 100px 0 80px 0; 
}

.ambient-glow {
  position: absolute; top: 20%; left: 50%; transform: translateX(-50%);
  width: 80vw; height: 60vh; background: radial-gradient(ellipse, rgba(0, 242, 254, 0.08) 0%, transparent 60%);
  filter: blur(100px); pointer-events: none; z-index: 0;
}

/* === 便当盒 (Bento Box) 网格系统 === */
.bento-container {
  width: 100%; 
  max-width: 1350px; 
  display: grid;
  grid-template-columns: 2.3fr 1fr; 
  gap: 36px;
  z-index: 1; 
  padding: 0 4%;
  /* 仅允许水平居中，禁止上下自动 margin */
  margin: 0 auto; 
  align-items: stretch; 
}

/* --- 左侧主卡片 --- */
.bento-left {
  display: flex;
  flex-direction: column;
}

.main-contact-card {
  flex: 1; 
  min-height: auto; 
  display: flex; flex-direction: column; 
  border-radius: 24px; overflow: hidden;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-border);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease;
}
.shadow-hover:hover { box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25); }

.card-header {
  padding: 28px 40px 16px; 
  background: linear-gradient(135deg, rgba(26,29,36,0.3) 0%, transparent 100%);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.left-title { font-size: 2rem; font-weight: 800; color: var(--vp-c-text-1); line-height: 1.1; margin: 0 0 12px 0; letter-spacing: -0.5px; }
.quote-text { font-size: 0.95rem; color: var(--vp-c-text-2); line-height: 1.6; font-weight: 500; margin: 0; }

.card-body {
  padding: 22px 40px 28px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
}

.modern-form { display: flex; flex-direction: column; gap: 18px; } 
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.input-group { display: flex; flex-direction: column; gap: 6px; }
.input-group label { font-size: 0.8rem; font-weight: 600; color: var(--vp-c-text-1); }
.required { color: #ff0844; }

input, textarea {
  width: 100%; background: var(--vp-c-default-soft); border: 1px solid var(--vp-c-border);
  padding: 12px 14px; border-radius: 10px; font-size: 0.9rem; color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-base); transition: all 0.2s ease; outline: none;
}
input:focus, textarea:focus { border-color: var(--vp-c-brand-1); background: var(--vp-c-bg-soft); box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-1), 0.1); }
textarea { resize: vertical; min-height: 120px; }
input:disabled, textarea:disabled { opacity: 0.6; cursor: not-allowed; }

/* --- 附件上传框优化设计 --- */
.file-upload-area {
  border: 2px dashed var(--vp-c-border);
  border-radius: 12px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--vp-c-bg-soft);
  padding: 12px;
}
.file-upload-area:hover { border-color: var(--vp-c-brand-1); background: rgba(var(--vp-c-brand-1), 0.03); }
.file-upload-area.dragover { border-color: var(--vp-c-brand-1); background: rgba(var(--vp-c-brand-1), 0.06); transform: scale(1.01); }
.file-upload-area input[type="file"] { display: none; }

/* 有文件时，内容靠上对齐 */
.file-upload-area.has-files { justify-content: flex-start; padding: 12px; }

.upload-icon { font-size: 1.8rem; margin-bottom: 8px; }
.upload-text { font-size: 0.85rem; color: var(--vp-c-text-2); font-weight: 500; }
.upload-hint { font-size: 0.75rem; color: var(--vp-c-text-3); margin-top: 4px; }
.upload-hint.add-more { margin-top: 12px; transition: color 0.2s ease; }
.file-upload-area:hover .upload-hint.add-more { color: var(--vp-c-brand-1); }

/* 内嵌文件列表容器 */
.file-list-container { width: 100%; display: flex; flex-direction: column; }
.file-list { display: flex; flex-direction: column; gap: 8px; width: 100%; }
.file-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px; background: var(--vp-c-default-soft); border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  text-align: left; /* 强制左对齐 */
  cursor: default; /* 文件条目上恢复普通鼠标指针 */
}
.file-info { display: flex; align-items: center; gap: 12px; }
.file-icon { font-size: 1.4rem; }
.file-name { font-size: 0.9rem; color: var(--vp-c-text-1); font-weight: 500; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.file-size { font-size: 0.8rem; color: var(--vp-c-text-3); }
.file-remove {
  width: 28px; height: 28px; flex-shrink: 0; border-radius: 50%; background: rgba(255, 8, 68, 0.1);
  border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: #ff0844; font-size: 0.9rem; transition: all 0.2s ease;
}
.file-remove:hover { background: rgba(255, 8, 68, 0.2); transform: scale(1.1); }


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

/* 系统状态指示器 */
.status-indicator { 
  display: flex; align-items: center; gap: 10px; 
  font-size: 0.85rem; font-weight: 700; color: #0ba360; 
  font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; 
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
  height: 100%; 
  gap: 24px;
}

.side-widget {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.github-widget { flex: 0 0 auto; }
.terminal-widget { flex: 1 1 0; }

.widget-title {
  font-size: 0.85rem; font-weight: 700; color: var(--vp-c-text-3); text-transform: uppercase; letter-spacing: 1px;
}

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

.terminal-card {
  height: 100%; 
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
  flex-grow: 1; 
  font-size: 0.85rem; 
  line-height: 1.8; 
  display: flex; flex-direction: column; justify-content: center; 
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
@media (max-width: 768px) {
  .contact-wrapper {
    padding: 80px 0;
    min-height: auto;
    height: auto;
  }
  
  .bento-container { 
    grid-template-columns: 1fr; 
    gap: 22px; 
    padding: 0 20px;
  }
  
  .card-header, .card-body { 
    padding: 24px; 
  }
  
  .left-title {
    font-size: 2.1rem;
    line-height: 1.2;
  }
  
  .quote-text {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  .main-contact-card {
    min-height: auto;
  }
  
  .modern-form {
    gap: 20px;
  }
  
  .form-row { 
    grid-template-columns: 1fr; 
    gap: 14px; 
  }
  
  .form-footer { 
    flex-direction: column-reverse; 
    align-items: stretch; 
    gap: 14px; 
  }
  
  .status-indicator { 
    justify-content: center; 
    font-size: 0.8rem;
  }
  
  .submit-btn { 
    width: 100%; 
    padding: 14px 24px;
    font-size: 0.95rem;
  }
  
  .terminal-card { 
    min-height: 220px; 
  }
  
  .terminal-body {
    padding: 20px;
    font-size: 0.82rem;
  }
  
  input, textarea {
    padding: 14px 16px;
    font-size: 0.95rem;
  }
  
  .file-upload-area {
    padding: 20px 16px;
  }
  
  .upload-icon { font-size: 2rem; }
  .upload-text { font-size: 0.9rem; }
  .upload-hint { font-size: 0.75rem; }
  
  .file-item {
    padding: 10px 14px;
  }
  
  .file-icon { font-size: 1.2rem; }
  .file-name { font-size: 0.85rem; }
  .file-size { font-size: 0.75rem; }
  
  .bento-right {
    height: auto;
  }
  
  .github-widget {
    flex: 0 0 auto;
  }
  
  .terminal-widget {
    flex: 0 0 auto;
  }
  
  .m-card {
    padding: 20px;
  }
  
  .m-icon { font-size: 1.6rem; }
  
  .m-main {
    font-size: 1rem;
  }
  
  .m-sub {
    font-size: 0.82rem;
  }
}

@media (max-width: 480px) {
  .contact-wrapper {
    padding: 70px 0;
  }
  
  .bento-container {
    padding: 0 16px;
  }
  
  .card-header, .card-body {
    padding: 20px;
  }
  
  .left-title {
    font-size: 1.8rem;
  }
  
  .quote-text {
    font-size: 0.9rem;
  }
  
  .modern-form {
    gap: 18px;
  }
  
  .form-row {
    gap: 12px;
  }
  
  .terminal-card {
    min-height: 200px;
  }
  
  .terminal-body {
    padding: 16px;
    font-size: 0.78rem;
    line-height: 1.6;
  }
  
  input, textarea {
    padding: 12px 14px;
    font-size: 0.9rem;
  }
  
  .m-card {
    padding: 16px;
  }
  
  .m-icon { font-size: 1.4rem; }
  
  .m-main {
    font-size: 0.95rem;
  }
  
  .m-sub {
    font-size: 0.78rem;
  }
  
  .submit-btn {
    padding: 12px 20px;
    font-size: 0.9rem;
  }
  
  .status-indicator {
    font-size: 0.75rem;
  }
}
</style>