const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'http://118.31.40.119', 
  'https://118.31.40.119',
  'http://gyx-a.cn',
  'https://gyx-a.cn',
  'http://localhost', 
  'http://127.0.0.1',
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Not Allowed: 非法站点的跨域调用被拦截'));
    }
  }
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const mailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { success: false, message: '发送过于频繁，请15分钟后再试 (System rate limit active)' },
  standardHeaders: true, 
  legacyHeaders: false, 
});

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 3,
    fieldSize: 50 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain', 'application/json',
      'application/zip', 'application/x-rar-compressed'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('文件类型不支持，请上传图片、PDF、文档或压缩包'));
    }
  }
});

const transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post('/api/contact', mailLimiter, upload.array('attachments', 3), async (req, res) => {
  const { name, email, subject, message } = req.body;
  const files = req.files || [];
  
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: '核心数据缺失，已阻断请求' });
  }
  
  try {
    const attachments = files.map(file => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype,
      encoding: 'base64'
    }));

    await transporter.sendMail({
      from: `"GYX-Dev 博客留言板" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.TO_EMAIL,
      subject: `【网站联系】${subject || '新访客留言'} - 来自 ${name}${files.length > 0 ? ` (附${files.length}个文件)` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #fafafa; border-radius: 12px;">
          <h2 style="color: #2563eb; margin-top: 0;">📬 收到一条网站留言</h2>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p><strong>👤 访客称呼：</strong>${name}</p>
          <p><strong>📧 回复邮箱：</strong><a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
          <p><strong>📝 留言主题：</strong>${subject || '无'}</p>
          ${files.length > 0 ? `
          <p><strong>📎 附件列表：</strong></p>
          <ul style="margin: 0 0 15px 20px;">
            ${files.map(file => `<li style="color: #374151;">${file.originalname} (${(file.size / 1024).toFixed(1)} KB)</li>`).join('')}
          </ul>
          ` : ''}
          <p><strong>💬 详细内容：</strong></p>
          <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #9ca3af; font-size: 12px; margin-bottom: 0;">此邮件由 Node.js 后端服务自动封装投递。</p>
        </div>
      `,
      attachments: attachments
    });
    
    res.json({ success: true, message: '邮件已成功投递！' });
  } catch (error) {
    console.error('SMTP 投递失败详细日志:', error);
    res.status(500).json({ success: false, message: '系统投递异常，请检查后端运行日志' });
  }
});

app.get('/api/health', (req, res) => {
  const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`;
  const memoryData = process.memoryUsage();

  res.status(200).json({
    status: '200 OK',
    message: 'System Online',
    nodeVersion: process.version,
    memory: {
      rss: formatMemoryUsage(memoryData.rss),
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`✅ API Core Service Online: http://localhost:${PORT}`);
});