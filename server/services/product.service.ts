import { productRepository } from '@/server/repositories/product.repository';
import { googleDriveService } from '@/server/services/gdrive.service';
import { supabaseStorageService } from '@/server/services/supabase-storage.service';
import { auditRepository } from '@/server/repositories/audit.repository';
import { ProductRecord } from '@/server/types/supabase.types';

export class ProductService {
  async getCatalog(category?: string, searchQuery?: string): Promise<ProductRecord[]> {
    return productRepository.listProducts(category, searchQuery);
  }

  async getProductBySlug(slugOrId: string): Promise<ProductRecord | null> {
    const product = await productRepository.findBySlugOrId(slugOrId);
    if (product) {
      await productRepository.incrementViews(product.id);
    }
    return product;
  }

  async uploadAndPublishBundle(
    title: string,
    category: string,
    price: number,
    thumbnailUrlOrBuffer?: string | Buffer,
    previewUrlOrBuffer?: string | Buffer,
    driveAccount: string = 'drive_acc_01'
  ): Promise<ProductRecord> {
    const categoryCode = category.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(100 + Math.random() * 900);
    const productId = `${categoryCode}${randomNum}`;
    const slug = `${category.toLowerCase()}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${randomNum}`;

    let thumbnailUrl = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80';
    if (thumbnailUrlOrBuffer) {
      if (typeof thumbnailUrlOrBuffer === 'string' && thumbnailUrlOrBuffer.startsWith('http')) {
        thumbnailUrl = thumbnailUrlOrBuffer;
      } else if (Buffer.isBuffer(thumbnailUrlOrBuffer)) {
        thumbnailUrl = await supabaseStorageService.uploadMedia(thumbnailUrlOrBuffer, `${slug}.webp`, 'thumbnails', 'image/webp');
      }
    }

    let previewUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
    if (previewUrlOrBuffer) {
      if (typeof previewUrlOrBuffer === 'string' && previewUrlOrBuffer.startsWith('http')) {
        previewUrl = previewUrlOrBuffer;
      } else if (Buffer.isBuffer(previewUrlOrBuffer)) {
        previewUrl = await supabaseStorageService.uploadMedia(previewUrlOrBuffer, `${slug}.mp4`, 'previews', 'video/mp4');
      }
    }

    const generatedDriveFileId = `1aB9_${category}_${productId}_${Date.now()}`;

    const newProduct: Partial<ProductRecord> = {
      product_id: productId,
      title,
      slug,
      description: `High quality ${category} stock video bundle with 3.5 GB of unwatermarked 4K and 9:16 footage.`,
      price,
      original_price: price * 3,
      category: category.toLowerCase(),
      thumbnail_url: thumbnailUrl,
      preview_url: previewUrl,
      drive_file_id: generatedDriveFileId,
      drive_account: driveAccount,
      folder_name: category.toLowerCase(),
      total_files: 500,
      zip_size: '3.5 GB',
      downloads: 0,
      views: 0,
      sales: 0,
      favorites: 0,
      resolution: '1080x1920',
      aspect_ratio: '9:16',
      format: 'MP4',
      tags: [category.toLowerCase(), 'reels', '4k', 'stock'],
      active: true,
    };

    const savedProduct = await productRepository.create(newProduct);
    await auditRepository.logAction('PRODUCT_PUBLISHED', { productId, slug, driveAccount });

    return savedProduct;
  }
}

export const productService = new ProductService();
