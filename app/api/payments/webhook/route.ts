import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (secret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(body)
        .digest('hex');

      if (expectedSignature !== signature) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const payload = JSON.parse(body);

    if (payload.event === 'payment.captured') {
      const payment = payload.payload.payment.entity;
      const { productId, userId } = payment.notes || {};
      const razorpayOrderId = payment.order_id;
      const razorpayPaymentId = payment.id;

      console.log(`Payment Captured: Order ${razorpayOrderId}, Product ${productId}, User ${userId}`);
      // Write to Firestore 'orders' collection here when Firebase Admin is initialized
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
