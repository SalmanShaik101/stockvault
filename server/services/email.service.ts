export interface OrderEmailPayload {
  toEmail: string;
  customerName?: string;
  productTitle: string;
  orderId: string;
  amount: number;
  downloadUrl: string;
}

export class EmailService {
  async sendOrderConfirmationEmail(payload: OrderEmailPayload): Promise<boolean> {
    const { toEmail, customerName = 'Valued Creator', productTitle, orderId, amount, downloadUrl } = payload;

    const emailApiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY;

    if (emailApiKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${emailApiKey}`,
          },
          body: JSON.stringify({
            from: 'StockVault PRO <onboarding@resend.dev>',
            to: [toEmail],
            subject: `🎉 Order Receipt: Thank You For Buying ${productTitle}!`,
            html: `
              <div style="font-family: system-ui, -apple-system, sans-serif; background-color: #050507; color: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.15); max-width: 550px; margin: 0 auto;">
                <div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 24px;">
                  <h1 style="font-size: 24px; font-weight: 900; margin: 0; color: #ffffff;">StockVault PRO</h1>
                  <span style="background-color: #10b981; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; display: inline-block; margin-top: 8px;">✓ Order Successful</span>
                </div>

                <h2 style="font-size: 18px; font-weight: 800; color: #ffffff; margin-bottom: 12px;">Thank You For Your Purchase, ${customerName}!</h2>
                <p style="font-size: 13px; color: #a1a1aa; line-height: 1.6;">
                  Your payment of <strong>₹${amount}</strong> was received successfully. Your 4K stock video bundle is ready for instant download below.
                </p>

                <div style="background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 12px;">
                  <p style="margin: 4px 0;"><strong>Product:</strong> ${productTitle}</p>
                  <p style="margin: 4px 0;"><strong>Order ID:</strong> ${orderId}</p>
                  <p style="margin: 4px 0;"><strong>Amount Paid:</strong> ₹${amount}</p>
                  <p style="margin: 4px 0; color: #10b981;"><strong>Commercial License:</strong> Included</p>
                </div>

                <div style="text-align: center; margin: 28px 0;">
                  <a href="${downloadUrl}" style="background-color: #ffffff; color: #000000; font-size: 13px; font-weight: 800; text-decoration: none; padding: 14px 28px; border-radius: 12px; display: inline-block;">🚀 Download Your Stock Vault Now</a>
                </div>

                <div style="text-align: center; font-size: 11px; color: #71717a; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px; margin-top: 24px;">
                  Need support or have broken links? Contact <a href="mailto:samsupport0@gmail.com" style="color: #c084fc;">samsupport0@gmail.com</a>.<br>
                  © 2026 StockVault Inc. All rights reserved.
                </div>
              </div>
            `,
          }),
        });
        return response.ok;
      } catch (err) {
        console.error('[EMAIL DISPATCH ERROR]', err);
        return false;
      }
    }

    console.log(`[EMAIL DISPATCH] Mock order confirmation dispatched to ${toEmail} for order ${orderId}`);
    return true;
  }
}

export const emailService = new EmailService();
