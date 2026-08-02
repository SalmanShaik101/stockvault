import { NextResponse } from 'next/server';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export async function POST(req: Request) {
  try {
    const { productId, userId } = await req.json();

    const product = MOCK_PRODUCTS.find((p) => p.productId === productId || p.id === productId);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const amountInPaise = Math.round(product.price * 100);

    // If Razorpay keys are configured in .env.local, call official Razorpay SDK
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      const Razorpay = require('razorpay');
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_${product.productId}_${Date.now()}`,
        notes: {
          productId: product.productId,
          userId: userId || 'demo_user',
        },
      });

      return NextResponse.json({
        success: true,
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      });
    }

    // Fallback Mock Order response for instant testing without keys
    const mockRazorpayOrderId = `order_mock_${Date.now()}`;
    return NextResponse.json({
      success: true,
      orderId: mockRazorpayOrderId,
      amount: amountInPaise,
      currency: 'INR',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mockKey123',
      productTitle: product.title,
      isMock: true,
    });
  } catch (error: any) {
    console.error('Create Order Error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
