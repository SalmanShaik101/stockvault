import { NextRequest } from 'next/server';
import { productService } from '@/server/services/product.service';
import { ApiResponse } from '@/server/utils/api-response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const q = searchParams.get('q') || searchParams.get('search') || undefined;

    const products = await productService.getCatalog(category, q);
    return ApiResponse.success(products, 'Catalog retrieved successfully', 200, products.length);
  } catch (error: any) {
    return ApiResponse.error(error.message || 'Failed to fetch catalog', error.statusCode || 500);
  }
}
