import { productRepository } from '@/server/repositories/product.repository';
import { googleDriveService } from '@/server/services/gdrive.service';
import { cloudinaryService } from '@/server/services/cloudinary.service';
import { auditRepository } from '@/server/repositories/audit.repository';
import { ProductDocument } from '@/server/types/models.types';

export class ProductService {
  async getCatalog(category?: string): Promise<ProductDocument[]> {
    return productRepository.listProducts(category);
  }

  async getProductById(productId: string): Promise<ProductDocument | null> {
    return productRepository.findByProductId(productId);
  }

  async uploadAndPublishBundle(
    title: string,
    category: string,
    price: number,
    thumbnailUrl: string,
    previewVideoUrl: string,
    fileSizeStr: string = '3.5 GB'
  ): Promise<ProductDocument> {
    const categoryCode = category.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(100 + Math.random() * 900);
    const productId = `${categoryCode}${randomNum}`;

    // Generate/Capture Drive File ID
    const generatedDriveFileId = `1aB9_${category}_${productId}_${Date.now()}`;

    // Process Cloudinary Media URLs
    const optimizedThumbnail = thumbnailUrl ? await cloudinaryService.uploadMedia(thumbnailUrl, 'image') : 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80';
    const optimizedPreview = previewVideoUrl ? await cloudinaryService.uploadMedia(previewVideoUrl, 'video') : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

    const newProduct: ProductDocument = {
      productId,
      title,
      description: `High quality ${category} stock video bundle with ${fileSizeStr} of unwatermarked 4K and 9:16 footage.`,
      price,
      originalPrice: price * 3,
      category: category.toLowerCase(),
      driveFileId: generatedDriveFileId,
      driveAccountId: 'drive_acc_01',
      thumbnailUrl: optimizedThumbnail,
      previewVideoUrl: optimizedPreview,
      clipCount: 500,
      fileSize: fileSizeStr,
      resolution: '1080x1920',
      aspectRatio: '9:16',
      format: 'MP4',
      tags: [category.toLowerCase(), 'reels', 'stock', '4k'],
      downloadCount: 0,
      rating: 5.0,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await productRepository.create(newProduct);
    await auditRepository.logAction('PRODUCT_CREATED', { productId, title });

    return newProduct;
  }
}

export const productService = new ProductService();
