<template>
  <section class="ed-section" id="contact">
    <SectionHead
      tag="05 / CONTACT"
      title="保持联系"
      sub="寻找全栈开发、AI 落地实习机会，或单纯的技术交流——欢迎留言，支持附件。"
    />

    <div class="contact-grid">
      <div class="contact-form-col">
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-row">
            <div class="input-group">
              <label for="name">称呼 <span class="required">*</span></label>
              <input id="name" type="text" v-model="formData.name" placeholder="您的称呼" required :disabled="isSubmitting" />
            </div>
            <div class="input-group">
              <label for="email">邮箱 <span class="required">*</span></label>
              <input id="email" type="email" v-model="formData.email" placeholder="name@example.com" required :disabled="isSubmitting" />
            </div>
          </div>

          <div class="input-group">
            <label for="message">留言 <span class="required">*</span></label>
            <textarea id="message" v-model="formData.message" placeholder="想聊的内容……" rows="5" required :disabled="isSubmitting"></textarea>
          </div>

          <div class="input-group">
            <label>附件（可选）</label>
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
                    <button type="button" class="file-remove" @click.stop="removeFile(index)">移除</button>
                  </div>
                </div>
                <div class="upload-hint add-more" v-if="selectedFiles.length < 3">
                  还可以继续点击或拖拽添加（{{ selectedFiles.length }}/3）
                </div>
              </div>
            </div>
          </div>

          <div v-if="sysMessage" :class="['sys-banner', sysStatus]">
            {{ sysMessage }}
          </div>

          <div class="form-footer">
            <button type="submit" class="submit-btn" :disabled="isSubmitting" :class="{ 'success-btn': sysStatus === 'success' }">
              <span v-if="!isSubmitting && sysStatus !== 'success'">发送留言</span>
              <span v-else-if="isSubmitting">发送中…</span>
              <span v-else-if="sysStatus === 'success'">发送成功 ✓</span>
            </button>
            <p class="form-note mono">邮件直达站长，通常 24h 内回复</p>
          </div>
        </form>
      </div>

      <aside class="contact-side">
        <a href="https://github.com/G1234-cod" target="_blank" class="side-link">
          <span class="side-title">GitHub</span>
          <span class="side-sub mono">G1234-cod · 开源仓库 ↗</span>
        </a>

        <div class="side-block">
          <p class="side-title">服务器状态</p>
          <dl v-if="serverData" class="status-list mono">
            <div class="status-row"><dt>STATUS</dt><dd>{{ serverData.status || '200 OK' }}</dd></div>
            <div class="status-row"><dt>NODE</dt><dd>{{ serverData.nodeVersion || 'v18.x' }}</dd></div>
            <div class="status-row"><dt>RAM</dt><dd>{{ serverData.memory?.rss || '—' }}</dd></div>
            <div class="status-row"><dt>UPTIME</dt><dd>{{ formattedUptime }}</dd></div>
          </dl>
          <p v-else class="status-off mono">探针暂不可达</p>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import SectionHead from './SectionHead.vue'

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
.ed-section {
  padding: 64px 0 80px;
}
.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(240px, 1fr);
  gap: 48px;
  align-items: start;
}
/* 表单：标签在上、细边框输入、错误内联 */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.input-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.required {
  color: var(--vp-c-brand-1);
}
.input-group input,
.input-group textarea {
  width: 100%;
  padding: 11px 14px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  line-height: 1.6;
  transition: border-color var(--duration-fast) var(--ease-out);
}
.input-group input:focus,
.input-group textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}
.input-group textarea {
  resize: vertical;
}
/* 附件区 */
.file-upload-area {
  border: 1px dashed var(--vp-c-border);
  border-radius: 6px;
  padding: 18px;
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--ease-out), background-color var(--duration-fast) var(--ease-out);
}
.file-upload-area:hover,
.file-upload-area.dragover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.file-upload-area input[type='file'] {
  display: none;
}
.upload-text {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.upload-hint {
  margin-top: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}
.file-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
}
.file-info {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.file-name {
  font-size: 0.88rem;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.file-size {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  color: var(--vp-c-text-3);
}
.file-remove {
  flex-shrink: 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: transparent;
  padding: 4px 12px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out);
}
.file-remove:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.add-more {
  margin-top: 10px;
}
/* 内联状态条 */
.sys-banner {
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 0.88rem;
}
.sys-banner.error {
  border: 1px solid #fca5a5;
  background: #fef2f2;
  color: #b91c1c;
}
.dark .sys-banner.error {
  border-color: #7f1d1d;
  background: #2a1515;
  color: #fca5a5;
}
.form-footer {
  display: flex;
  align-items: center;
  gap: 18px;
}
.submit-btn {
  min-height: 44px;
  padding: 0 26px;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out);
}
.submit-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}
.submit-btn:active:not(:disabled) {
  transform: scale(0.97);
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.submit-btn.success-btn {
  background: var(--vp-c-brand-2);
}
.submit-btn:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.form-note {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}
/* 右栏 */
.contact-side {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.side-link {
  display: block;
  padding: 18px 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  text-decoration: none;
}
.side-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.side-link:hover .side-title {
  color: var(--vp-c-brand-1);
}
.side-sub {
  display: block;
  margin-top: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}
.status-list {
  margin: 12px 0 0;
}
.status-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 7px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.status-row dt,
.status-row dd {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
.status-row dt {
  color: var(--vp-c-text-3);
}
.status-row dd {
  color: var(--vp-c-text-1);
}
.status-off {
  margin: 12px 0 0;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-3);
}
@media (max-width: 960px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}
@media (max-width: 768px) {
  .ed-section {
    padding: 44px 0 56px;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
