# 03 · 后端模块（server/）

独立的 Node.js 微服务，唯一职责：**接收博客留言板投稿并转发为邮件**，外加一个健康探针。单文件实现：`server/server.js`（约 178 行）。

## 3.1 模块职责与依赖

| 依赖包 | 职责 | 使用位置 |
|---|---|---|
| `express` | HTTP 框架 | 全文 |
| `cors` | 跨域白名单 | `server.js#L24-L32` |
| `express-rate-limit` | 发信频率限制 | `server.js#L37-L43` |
| `multer` | multipart 附件解析（内存存储） | `server.js#L45-L72` |
| `nodemailer` | SMTP 邮件投递（163 邮箱） | `server.js#L74-L82` |
| `dotenv` | 加载 `.env` 敏感配置 | `server.js#L6` |

## 3.2 中间件栈（执行顺序）

| 顺序 | 中间件 | 位置 | 说明 |
|---|---|---|---|
| 1 | CORS 白名单 | `server.js#L24-L32` | 仅放行 `allowedOrigins`（`server.js#L11-L22`）：`118.31.40.119`、`gyx-a.cn` 及 www 变体、`localhost`/`127.0.0.1`（含 5173/5174）；无 Origin（如 curl）也放行，其余抛 `CORS Not Allowed` |
| 2 | body 解析 | `server.js#L34-L35` | `express.json` + `urlencoded`，上限 50MB |
| 3 | 路由级限流 | `server.js#L37-L43` | `mailLimiter`：15 分钟窗口最多 3 次，超限返回 `{success:false, message:'发送过于频繁...'}` |
| 4 | 附件解析 | `server.js#L45-L72` | `multer.memoryStorage()`：单文件 ≤10MB、最多 3 个、字段 ≤50MB，MIME 白名单过滤 |
| 5 | 全局错误处理 | `server.js#L157-L174` | MulterError 专项映射 + 通用兜底（见 3.5） |

## 3.3 API 端点

### `POST /api/contact`（`server.js#L84-L139`）

留言板投稿 → 后台投递邮件到站长邮箱。

| 项 | 说明 |
|---|---|
| 限流 | 15 分钟 / IP 最多 3 次 |
| 请求体 | `multipart/form-data`：`name`、`email`、`subject`（可选；前端当前不发送，邮件主题回退为「新访客留言」）、`message`、`attachments[]`（≤3 个） |
| 校验 | `name`/`email`/`message` 缺失即 400（`server.js#L88-L90`）；附件 MIME 白名单（图片/PDF/Word/Excel/txt/json/zip/rar/二进制流兜底，`server.js#L54-L69`） |
| 邮件 | `from` 为站点信箱、`replyTo` 为访客邮箱（可一键回复）、`to` 为 `TO_EMAIL`；HTML 正文排版含访客信息 + 附件清单；附件以 buffer 附加 |
| 响应 | 立即返回 `{ success: true, message: '留言已进入发送队列！' }`——**不等待邮件发出**（`server.js#L100-L134`） |
| 发送失败 | 仅 `console.error` 记日志（`server.js#L128-L131`），不影响前端结果 |

### `GET /api/health`（`server.js#L141-L155`）

服务器探针，供首页 ContactFooter 右侧终端小组件展示：

```json
{ "status": "200 OK", "message": "System Online", "nodeVersion": "v18.x",
  "memory": { "rss": "xx MB" }, "uptime": 12345.6, "timestamp": "..." }
```

## 3.4 关键处理逻辑（函数级说明）

`server.js` 为脚本式单文件（无自定义类），关键逻辑块：

| 逻辑块 | 位置 | 说明 |
|---|---|---|
| CORS origin 判定回调 | `server.js#L25-L31` | 白名单内/无 Origin → 放行；否则 Error 阻断 |
| `mailLimiter` 定义 | `server.js#L37-L43` | 标准 `RateLimit-*` 头，禁用 legacy 头 |
| `fileFilter` 回调 | `server.js#L53-L71` | MIME 白名单；Windows 浏览器乱标 zip/二进制流已兜底 |
| `transporter` | `server.js#L74-L82` | SMTP over SSL 465（`smtp.163.com`），凭据来自环境变量 |
| 附件映射 | `server.js#L93-L98` | multer buffer → nodemailer attachments（`encoding: 'base64'`） |
| 静默发信 | `server.js#L101-L131` | `transporter.sendMail(...)` 不加 `await`，`.catch` 兜底日志 |
| `formatMemoryUsage` | `server.js#L142` | 字节 → MB 字符串（health 用） |
| 错误处理映射 | `server.js#L157-L174` | 见下表 |

**错误码映射**（`server.js#L157-L174`）：

| 情况 | 状态码 | 提示 |
|---|---|---|
| `LIMIT_FILE_SIZE` | 413 | 单个文件超过 10MB 限制 |
| `LIMIT_FILE_COUNT` | 413 | 最多只能上传 3 个文件 |
| `LIMIT_FIELD_SIZE` | 413 | 请求体过大 |
| 其它 MulterError / MIME 拒绝 / CORS 拒绝 | 400 | 透传 error.message |
| 未知异常 | 500 | 服务器内部错误 |

## 3.5 环境变量（`server/.env`，已 gitignore）

| 变量 | 用途 | 备注 |
|---|---|---|
| `PORT` | 监听端口 | 缺省 3000（`server.js#L9`），Nginx 反代目标 |
| `SMTP_USER` | 163 邮箱账号（发件人） | 敏感 |
| `SMTP_PASS` | SMTP 授权码（非登录密码） | 敏感 |
| `TO_EMAIL` | 站长收件邮箱 | — |

## 3.6 注意事项

- **凭据安全**：`.env` 严禁入库（`.gitignore` 明确排除）；线上凭据随部署手工配置。
- **限流是内存态**：`express-rate-limit` 计数存进程内存，PM2 重启即清零；当前体量够用。
- **HTML 邮件插值**：`message` 经 `replace(/\n/g, '<br>')` 直接拼入 HTML（`server.js#L121`），未做 HTML 转义；因收件人是站长本人、且仅影响邮件排版，风险可接受，但若未来把留言内容回显到站点前端，必须先做 XSS 转义。
- **附件走内存**：multer `memoryStorage`，10MB×3 的缓冲在请求期间占用内存，health 里的 RSS 可观察。
