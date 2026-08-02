import { NextRequest } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { productService } from '@/server/services/product.service';
import { ApiResponse } from '@/server/utils/api-response';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    await authService.verifyAdminToken(authHeader);

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const price = Number(formData.get('price'));
    const thumbnailUrl = formData.get('thumbnailUrl') as string;
    const previewVideoUrl = formData.get('previewVideoUrl') as string;

    if (!title || !category || !price) {
      return ApiResponse.error('Missing required bundle fields (title, category, price)', 400);
    }

    const product = await productService.uploadAndPublishBundle(
      title,
      category,
      price,
      thumbnailUrl,
      previewVideoUrl
    );

    return ApiResponse.success(product, 'Bundle uploaded and published successfully!', 201);
  } catch (error: any) {
    console.error('Admin Upload API Error:', error);
    return ApiResponse.error(error.message || 'Failed to upload bundle', error.statusCode || 500);
  }
}
