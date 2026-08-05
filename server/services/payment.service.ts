import { getRazorpayClient } from '@/server/config/razorpay.config';
import { orderRepository } from '@/server/repositories/order.repository';
import { productRepository } from '@/server/repositories/product.repository';
import { libraryRepository } from '@/server/repositories/library.repository';
import { auditRepository } from '@/server/repositories/audit.repository';
import { emailService } from '@/server/services/email.service';
import { OrderRecord } from '@/server/types/supabase.types';
import { NotFoundError, ValidationError } from '@/server/utils/custom-errors';
import crypto from 'crypto';

export class PaymentService {
  async createRazorpayOrder(productId: string, userId: string): Promise<{ orderId: string; amount: number; currency: string; keyId: string }> {
    const product = await productRepository.findBySlugOrId(productId);
    if (!product || !product.active) {
      throw new NotFoundError('Product is unavailable for purchase');
    }

    const amountInPaise = Math.round(product.price * 100);
    const razorpay = getRazorpayClient();

    if (razorpay) {
      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_${product.id}_${Date.now()}`,
        notes: {
          productId: product.id,
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
        const orderRecord: Partial<OrderRecord> = {
          order_id: `ord_${razorpayPaymentId}`,
          user_id: userId || 'usr_demo_123',
          product_id: productId || 'GYM001',
          status: 'SUCCESS',
          payment_gateway: 'RAZORPAY',
          payment_id: razorpayPaymentId,
          razorpay_order_id: razorpayOrderId,
          amount: payment.amount / 100,
          currency: 'INR',
        };

        const createdOrder = await orderRepository.create(orderRecord);
        await libraryRepository.addToLibrary(orderRecord.user_id!, orderRecord.product_id!, createdOrder.id);
        await auditRepository.logAction('PAYMENT_WEBHOOK_PROCESSED', { orderId: createdOrder.order_id, amount: createdOrder.amount });

        // Trigger automated Thank You order receipt email
        const userEmail = payment.email || 'customer@stockvault.pro';
        const product = await productRepository.findBySlugOrId(orderRecord.product_id!);
        
        await emailService.sendOrderConfirmationEmail({
          toEmail: userEmail,
          customerName: payment.notes?.customerName || 'Valued Creator',
          productTitle: product?.title || '4K Digital Stock Vault',
          orderId: createdOrder.order_id,
          amount: createdOrder.amount,
          downloadUrl: `https://stockvault-umber.vercel.app/api/download/${createdOrder.order_id}`,
        });
      }
    }
  }
}

export const paymentService = new PaymentService();
