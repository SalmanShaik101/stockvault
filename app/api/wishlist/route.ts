import { NextRequest } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { wishlistRepository } from '@/server/repositories/wishlist.repository';
import { ApiResponse } from '@/server/utils/api-response';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const user = await authService.verifyToken(authHeader);

    const wishlist = await wishlistRepository.getUserWishlist(user.uid);
    return ApiResponse.success(wishlist);
  } catch (error: any) {
    return ApiResponse.error(error.message || 'Failed to fetch wishlist', error.statusCode || 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const user = await authService.verifyToken(authHeader);
    const { productId } = await req.json();

    const item = await wishlistRepository.add(user.uid, productId);
    return ApiResponse.success(item, 'Item added to wishlist', 201);
  } catch (error: any) {
    return ApiResponse.error(error.message || 'Failed to add item to wishlist', error.statusCode || 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const user = await authService.verifyToken(authHeader);
    const { productId } = await req.json();

    await wishlistRepository.remove(user.uid, productId);
    return ApiResponse.success({ status: 'removed' }, 'Item removed from wishlist');
  } catch (error: any) {
    return ApiResponse.error(error.message || 'Failed to remove item from wishlist', error.statusCode || 500);
  }
}
