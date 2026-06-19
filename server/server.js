const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 网易163邮箱配置
const transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// 邮件发送接口
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // 简单验证
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: '请填写必填项' });
  }
  
  try {
    await transporter.sendMail({
      from: `"博客留言系统" <${process.env.SMTP_USER}>`, // ✅ 必须使用你自己的 163 账号发信
      replyTo: email, // ✅ 将访客的邮箱放入回信地址。这样你在邮箱里直接点击“回复”，收件人就是访客本人
      to: process.env.TO_EMAIL,
      subject: `【网站联系】${subject || '新消息'} - 来自 ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2563eb;">📬 收到一条网站留言</h2>
          <hr style="border: 1px solid #eee;">
          <p><strong>👤 姓名：</strong>${name}</p>
          <p><strong>📧 邮箱：</strong><a href="mailto:${email}">${email}</a></p>
          <p><strong>📝 主题：</strong>${subject || '无'}</p>
          <p><strong>💬 内容：</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">此邮件由网站自动发送</p>
        </div>
      `
    });
    
    res.json({ success: true, message: '发送成功！' });
  } catch (error) {
    console.error('邮件发送失败:', error);
    res.status(500).json({ success: false, message: '发送失败，请稍后重试' });
  }
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API 服务已启动: http://localhost:${PORT}`);
});
