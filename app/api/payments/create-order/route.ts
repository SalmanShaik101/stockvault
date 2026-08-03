import { NextRequest } from 'next/server';
import { paymentService } from '@/server/services/payment.service';
import { authService } from '@/server/services/auth.service';
import { ApiResponse } from '@/server/utils/api-response';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const user = await authService.verifyToken(authHeader);

    const { productId } = await req.json();
    if (!productId) {
      return ApiResponse.error('productId is required', 400);
    }

    const orderData = await paymentService.createRazorpayOrder(productId, user.id);
    return ApiResponse.success(orderData, 'Order created successfully', 201);
  } catch (error: any) {
    return ApiResponse.error(error.message || 'Failed to create payment order', error.statusCode || 500);
  }
}
