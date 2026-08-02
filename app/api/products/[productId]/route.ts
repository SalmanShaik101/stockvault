import { NextRequest } from 'next/server';
import { productService } from '@/server/services/product.service';
import { ApiResponse } from '@/server/utils/api-response';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const product = await productService.getProductById(productId);

    if (!product) {
      return ApiResponse.error('Product not found', 404);
    }

    return ApiResponse.success(product);
  } catch (error: any) {
    return ApiResponse.error(error.message || 'Failed to fetch product details', error.statusCode || 500);
  }
}
