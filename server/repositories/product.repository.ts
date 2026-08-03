import { supabaseAdmin } from '@/lib/supabase/admin';
import { ProductRecord } from '@/server/types/supabase.types';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export class ProductRepository {
  async findBySlugOrId(identifier: string): Promise<ProductRecord | null> {
    try {
      const { data } = await supabaseAdmin
        .from('products')
        .select('*')
        .or(`slug.eq.${identifier},product_id.eq.${identifier},id.eq.${identifier}`)
        .single();

      if (data) return data as ProductRecord;
    } catch (err) {}

    // Fallback to mock data store
    const mock = MOCK_PRODUCTS.find((p) => p.productId === identifier || p.id === identifier);
    if (mock) {
      const m = mock as any;
      return {
        id: m.id || m.productId,
        product_id: m.productId,
        title: m.title,
        slug: m.productId.toLowerCase(),
        description: m.description || m.desc || `High quality ${m.category} stock video bundle with unwatermarked 4K and 9:16 footage.`,
        price: m.price,
        original_price: m.originalPrice,
        category: m.category,
        thumbnail_url: m.thumbnailUrl,
        preview_url: m.previewVideoUrl,
        drive_file_id: m.driveFileId,
        drive_account: m.driveAccountId || 'drive_acc_01',
        folder_name: m.category,
        total_files: m.clipCount || 500,
        zip_size: m.fileSize || '3.5 GB',
        downloads: m.downloadCount || 0,
        views: 120,
        sales: m.downloadCount || 0,
        favorites: 45,
        resolution: m.resolution || '1080x1920',
        aspect_ratio: m.aspectRatio || '9:16',
        format: m.format || 'MP4',
        tags: m.tags || [m.category],
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    return null;
  }

  async listProducts(category?: string, searchQuery?: string): Promise<ProductRecord[]> {
    try {
      let query = supabaseAdmin.from('products').select('*').eq('active', true);

      if (category && category !== 'all') {
        query = query.eq('category', category.toLowerCase());
      }

      if (searchQuery) {
        query = query.textSearch('fts', searchQuery, { config: 'english' });
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as ProductRecord[];
      }
    } catch (err) {}

    // Fallback
    let products = MOCK_PRODUCTS.map((m: any) => ({
      id: m.id || m.productId,
      product_id: m.productId,
      title: m.title,
      slug: m.productId.toLowerCase(),
      description: m.description || m.desc || `High quality ${m.category} stock video bundle with unwatermarked 4K and 9:16 footage.`,
      price: m.price,
      original_price: m.originalPrice,
      category: m.category,
      thumbnail_url: m.thumbnailUrl,
      preview_url: m.previewVideoUrl,
      drive_file_id: m.driveFileId,
      drive_account: m.driveAccountId || 'drive_acc_01',
      folder_name: m.category,
      total_files: m.clipCount || 500,
      zip_size: m.fileSize || '3.5 GB',
      downloads: m.downloadCount || 0,
      views: 120,
      sales: m.downloadCount || 0,
      favorites: 45,
      resolution: m.resolution || '1080x1920',
      aspect_ratio: m.aspectRatio || '9:16',
      format: m.format || 'MP4',
      tags: m.tags || [m.category],
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    if (category && category !== 'all') {
      products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    return products;
  }

  async create(product: Partial<ProductRecord>): Promise<ProductRecord> {
    const { data, error } = await supabaseAdmin
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) {
      console.error('Error creating product in Supabase:', error);
      return product as ProductRecord;
    }
    return data as ProductRecord;
  }

  async incrementViews(productId: string): Promise<void> {
    try {
      await supabaseAdmin.rpc('increment_product_views', { p_id: productId });
    } catch (err) {}
  }
}

export const productRepository = new ProductRepository();
