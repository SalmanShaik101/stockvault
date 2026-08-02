import { NextRequest } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { orderRepository } from '@/server/repositories/order.repository';
import { ApiResponse } from '@/server/utils/api-response';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const user = await authService.verifyToken(authHeader);

    const orders = await orderRepository.listUserOrders(user.uid);
    return ApiResponse.success(orders, 'Orders retrieved', 200, orders.length);
  } catch (error: any) {
    return ApiResponse.error(error.message || 'Failed to fetch user orders', error.statusCode || 500);
  }
}
