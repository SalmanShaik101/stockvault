import { NextRequest } from 'next/server';
import { productService } from '@/server/services/product.service';
import { ApiResponse } from '@/server/utils/api-response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;

    const products = await productService.getCatalog(category);
    return ApiResponse.success(products, 'Products retrieved successfully', 200, products.length);
  } catch (error: any) {
    return ApiResponse.error(error.message || 'Failed to fetch products', error.statusCode || 500);
  }
}
