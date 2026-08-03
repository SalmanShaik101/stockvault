import { NextRequest } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { favoriteRepository } from '@/server/repositories/favorite.repository';
import { ApiResponse } from '@/server/utils/api-response';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const user = await authService.verifyToken(authHeader);

    const favorites = await favoriteRepository.getUserFavorites(user.id);
    return ApiResponse.success(favorites);
  } catch (error: any) {
    return ApiResponse.error(error.message || 'Failed to fetch favorites', error.statusCode || 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const user = await authService.verifyToken(authHeader);
    const { productId } = await req.json();

    const favorite = await favoriteRepository.addFavorite(user.id, productId);
    return ApiResponse.success(favorite, 'Product added to favorites', 201);
  } catch (error: any) {
    return ApiResponse.error(error.message || 'Failed to add favorite', error.statusCode || 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const user = await authService.verifyToken(authHeader);
    const { productId } = await req.json();

    await favoriteRepository.removeFavorite(user.id, productId);
    return ApiResponse.success({ status: 'removed' }, 'Product removed from favorites');
  } catch (error: any) {
    return ApiResponse.error(error.message || 'Failed to remove favorite', error.statusCode || 500);
  }
}
