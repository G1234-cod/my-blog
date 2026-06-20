const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// 1. 严格的 CORS 跨域白名单配置 (第一层护甲)
// ==========================================
const allowedOrigins = [
  'http://118.31.40.119', 
  'https://118.31.40.119',
  'http://gyx-a.cn',
  'https://gyx-a.cn',
  'http://localhost', 
  'http://127.0.0.1'
];

app.use(cors({
  origin: function (origin, callback) {
    // origin 为 undefined 通常是同源请求或本地工具发起
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Not Allowed: 非法站点的跨域调用被拦截'));
    }
  }
}));

app.use(express.json());

// ==========================================
// 2. IP 速率限制配置 (第二层护甲)
// ==========================================
const mailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 冷却时间：15 分钟
  max: 3, // 每个 IP 15分钟内最多允许 3 次请求
  message: { success: false, message: '发送过于频繁，请15分钟后再试 (System rate limit active)' },
  standardHeaders: true, 
  legacyHeaders: false, 
});

// ==========================================
// 3. 网易163 SMTP 认证配置
// ==========================================
const transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// ==========================================
// 4. 邮件发送核心接口
// ==========================================
// 注意：mailLimiter 被作为中间件专门挂载到了这个接口上
app.post('/api/contact', mailLimiter, async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // 简单数据校验
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: '核心数据缺失，已阻断请求' });
  }
  
  try {
    await transporter.sendMail({
      from: `"GYX-Dev 博客留言板" <${process.env.SMTP_USER}>`, // ✅ 突破网易 553 防线的核心：强制使用发件人本号发信
      replyTo: email, // ✅ 访客的真实邮箱放在回信地址，方便你直接点击回复
      to: process.env.TO_EMAIL,
      subject: `【网站联系】${subject || '新访客留言'} - 来自 ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #fafafa; border-radius: 12px;">
          <h2 style="color: #2563eb; margin-top: 0;">📬 收到一条网站留言</h2>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p><strong>👤 访客称呼：</strong>${name}</p>
          <p><strong>📧 回复邮箱：</strong><a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
          <p><strong>📝 留言主题：</strong>${subject || '无'}</p>
          <p><strong>💬 详细内容：</strong></p>
          <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #9ca3af; font-size: 12px; margin-bottom: 0;">此邮件由 Node.js 后端服务自动封装投递。</p>
        </div>
      `
    });
    
    res.json({ success: true, message: '邮件已成功投递！' });
  } catch (error) {
    console.error('SMTP 投递失败详细日志:', error);
    res.status(500).json({ success: false, message: '系统投递异常，请检查后端运行日志' });
  }
});

// ==========================================
// 5. API 深度健康检查探针 (面试加分项)
// ==========================================
app.get('/api/health', (req, res) => {
  // 换算内存占用为 MB
  const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`;
  const memoryData = process.memoryUsage();

  res.status(200).json({
    status: '200 OK',
    message: 'System Online',
    nodeVersion: process.version,
    memory: {
      rss: formatMemoryUsage(memoryData.rss), // 常驻集大小
    },
    uptime: process.uptime(), // 运行秒数
    timestamp: new Date().toISOString()
  });
});

// 👇 把下面这段代码直接加在文件的最末尾 👇
// ==========================================
// 6. 启动服务器 (核心引擎点火)
// ==========================================
app.listen(PORT, () => {
  console.log(`✅ API Core Service Online: http://localhost:${PORT}`);
});