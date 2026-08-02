import { NextRequest } from 'next/server';
import { paymentService } from '@/server/services/payment.service';
import { ApiResponse } from '@/server/utils/api-response';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    await paymentService.verifyWebhookAndProcessPayment(rawBody, signature);
    return ApiResponse.success({ status: 'ok' }, 'Webhook processed successfully');
  } catch (error: any) {
    console.error('Razorpay Webhook Error:', error);
    return ApiResponse.error(error.message || 'Webhook processing error', error.statusCode || 400);
  }
}
