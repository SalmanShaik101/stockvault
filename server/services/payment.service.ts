import { getRazorpayClient } from '@/server/config/razorpay.config';
import { orderRepository } from '@/server/repositories/order.repository';
import { productRepository } from '@/server/repositories/product.repository';
import { auditRepository } from '@/server/repositories/audit.repository';
import { OrderDocument } from '@/server/types/models.types';
import { AppError, NotFoundError, ValidationError } from '@/server/utils/custom-errors';
import crypto from 'crypto';

export class PaymentService {
  async createRazorpayOrder(productId: string, userId: string): Promise<{ orderId: string; amount: number; currency: string; keyId: string }> {
    const product = await productRepository.findByProductId(productId);
    if (!product || !product.active) {
      throw new NotFoundError('Product is unavailable for purchase');
    }

    const amountInPaise = Math.round(product.price * 100);
    const razorpay = getRazorpayClient();

    if (razorpay) {
      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_${productId}_${Date.now()}`,
        notes: {
          productId,
          userId,
        },
      });

      return {
        orderId: order.id,
        amount: Number(order.amount),
        currency: order.currency,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
      };
    }

    // Mock Order fallback for testing environment
    const mockOrderId = `order_mock_${Date.now()}`;
    return {
      orderId: mockOrderId,
      amount: amountInPaise,
      currency: 'INR',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mockKey123',
    };
  }

  async verifyWebhookAndProcessPayment(rawBody: string, signature: string | null): Promise<void> {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (secret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        throw new ValidationError('Invalid Razorpay webhook signature');
      }
    }

    const payload = JSON.parse(rawBody);

    if (payload.event === 'payment.captured') {
      const payment = payload.payload.payment.entity;
      const { productId, userId } = payment.notes || {};
      const razorpayOrderId = payment.order_id;
      const razorpayPaymentId = payment.id;

      const existingOrder = await orderRepository.findByOrderId(`ord_${razorpayPaymentId}`);
      if (!existingOrder) {
        const orderDoc: OrderDocument = {
          orderId: `ord_${razorpayPaymentId}`,
          userId: userId || 'usr_demo_123',
          productId: productId || 'GYM001',
          paymentStatus: 'SUCCESS',
          paymentGateway: 'RAZORPAY',
          paymentId: razorpayPaymentId,
          razorpayOrderId,
          amount: payment.amount / 100,
          currency: 'INR',
          purchaseDate: new Date().toISOString(),
          downloadCount: 0,
        };

        await orderRepository.create(orderDoc);
        await productRepository.incrementDownloadCount(orderDoc.productId);
        await auditRepository.logAction('PAYMENT_WEBHOOK_PROCESSED', { orderId: orderDoc.orderId, amount: orderDoc.amount });
      }
    }
  }
}

export const paymentService = new PaymentService();
