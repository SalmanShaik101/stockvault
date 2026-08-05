import nodemailer from 'nodemailer';

export interface OrderEmailPayload {
  toEmail: string;
  customerName?: string;
  productTitle: string;
  orderId: string;
  amount: number;
  downloadUrl: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || 'samsupport0@gmail.com';
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

    if (smtpPass) {
      this.transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
    }
  }

  async sendOrderConfirmationEmail(payload: OrderEmailPayload): Promise<boolean> {
    const { toEmail, customerName = 'Valued Creator', productTitle, orderId, amount, downloadUrl } = payload;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050507; color: #ffffff; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background-color: #0c0c0e; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 20px; overflow: hidden; padding: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
          .header { text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 20px; margin-bottom: 24px; }
          .logo { font-size: 22px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px; }
          .badge { display: inline-block; background-color: #10b981; color: #ffffff; padding: 6px 14px; border-radius: 50px; font-size: 12px; font-weight: bold; margin-top: 10px; }
          .title { font-size: 20px; font-weight: 800; color: #ffffff; margin-bottom: 8px; }
          .subtitle { font-size: 14px; color: #a1a1aa; line-height: 1.6; margin-bottom: 24px; }
          .order-box { background-color: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 14px; padding: 20px; margin-bottom: 24px; font-size: 13px; }
          .order-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
          .order-row:last-child { border-bottom: none; }
          .label { color: #a1a1aa; }
          .value { color: #ffffff; font-weight: bold; }
          .btn-container { text-align: center; margin: 32px 0; }
          .btn { display: inline-block; background-color: #ffffff; color: #000000; font-size: 14px; font-weight: 800; text-decoration: none; padding: 16px 36px; border-radius: 14px; box-shadow: 0 0 25px rgba(255, 255, 255, 0.3); }
          .footer { text-align: center; font-size: 11px; color: #71717a; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 20px; margin-top: 32px; }
          .contact { color: #c084fc; text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">StockVault PRO</div>
            <div class="badge">✓ Order Successful</div>
          </div>

          <div class="title">Thank You For Your Purchase, ${customerName}!</div>
          <div class="subtitle">
            Your payment of <strong>₹${amount}</strong> was received successfully. Your 4K stock video bundle is ready for instant download via direct Google Drive access below.
          </div>

          <div class="order-box">
            <div class="order-row">
              <span class="label">Product Purchased:</span>
              <span class="value">${productTitle}</span>
            </div>
            <div class="order-row">
              <span class="label">Order ID:</span>
              <span class="value">${orderId}</span>
            </div>
            <div class="order-row">
              <span class="label">Amount Paid:</span>
              <span class="value">₹${amount}</span>
            </div>
            <div class="order-row">
              <span class="label">Commercial License:</span>
              <span class="value" style="color:#10b981;">Included</span>
            </div>
          </div>

          <div class="btn-container">
            <a href="${downloadUrl}" class="btn">🚀 Download Your Stock Vault Now</a>
          </div>

          <div class="footer">
            If you need technical assistance or custom footage requests, email us anytime at <a href="mailto:samsupport0@gmail.com" class="contact">samsupport0@gmail.com</a>.<br><br>
            © 2026 StockVault Inc. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      if (this.transporter) {
        await this.transporter.sendMail({
          from: `"StockVault PRO" <samsupport0@gmail.com>`,
          to: toEmail,
          subject: `🎉 Order Receipt: Thank You For Buying ${productTitle}!`,
          html: emailHtml,
        });
        return true;
      } else {
        console.log(`[EMAIL SERVICE] Order confirmation mock sent to ${toEmail} for order ${orderId}`);
        return true;
      }
    } catch (error) {
      console.error('[EMAIL SERVICE ERROR]', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
