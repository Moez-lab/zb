import nodemailer from 'nodemailer';

// Lazy-initialized transporter (only created when first used)
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required email env variable: ${key}`);
    }
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

export interface InquiryEmailPayload {
  customerName: string;
  customerEmail: string;
  message: string;
  artworkTitle: string;
  artworkId: string;
}

export async function sendInquiryEmail(payload: InquiryEmailPayload) {
  const { customerName, customerEmail, message, artworkTitle, artworkId } = payload;

  const emailTo = process.env.EMAIL_TO;
  const emailFrom = process.env.EMAIL_FROM;

  if (!emailTo || !emailFrom) {
    throw new Error('EMAIL_TO or EMAIL_FROM not configured');
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Art Gallery';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Georgia, serif; background: #f9f6f2; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 20px rgba(0,0,0,0.08); }
    .header { background: #0a0a0a; padding: 32px 40px; color: #c9a84c; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 400; letter-spacing: 0.05em; }
    .header p { margin: 8px 0 0; color: #999; font-size: 13px; font-family: Arial, sans-serif; }
    .body { padding: 40px; }
    .label { font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 4px; }
    .value { font-size: 16px; color: #0a0a0a; margin-bottom: 24px; }
    .message-box { background: #f9f6f2; border-left: 3px solid #c9a84c; padding: 20px 24px; border-radius: 0 6px 6px 0; }
    .message-box p { margin: 0; color: #333; line-height: 1.7; font-size: 15px; }
    .footer { padding: 24px 40px; border-top: 1px solid #eee; background: #fafafa; }
    .footer p { margin: 0; font-family: Arial, sans-serif; font-size: 12px; color: #999; }
    .btn { display: inline-block; margin-top: 16px; padding: 12px 24px; background: #0a0a0a; color: #c9a84c; text-decoration: none; font-family: Arial, sans-serif; font-size: 13px; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${siteName}</h1>
      <p>New Customer Inquiry</p>
    </div>
    <div class="body">
      <div class="label">Artwork</div>
      <div class="value">${artworkTitle}</div>

      <div class="label">Customer Name</div>
      <div class="value">${customerName}</div>

      <div class="label">Customer Email</div>
      <div class="value"><a href="mailto:${customerEmail}" style="color:#c9a84c;">${customerEmail}</a></div>

      <div class="label">Message</div>
      <div class="message-box">
        <p>${message.replace(/\n/g, '<br>')}</p>
      </div>

      <a href="${siteUrl}/artwork/${artworkId}" class="btn">View Artwork</a>
    </div>
    <div class="footer">
      <p>This inquiry was submitted via your gallery website. Reply directly to this email to respond to ${customerName}.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  await getTransporter().sendMail({
    from: emailFrom,
    to: emailTo,
    replyTo: `${customerName} <${customerEmail}>`,
    subject: `New Inquiry: "${artworkTitle}" — ${siteName}`,
    html,
    text: `New inquiry from ${customerName} (${customerEmail})\n\nArtwork: ${artworkTitle}\n\nMessage:\n${message}\n\nView artwork: ${siteUrl}/artwork/${artworkId}`,
  });
}
