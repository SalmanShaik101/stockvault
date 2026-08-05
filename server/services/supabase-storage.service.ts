import { supabaseAdmin } from '@/lib/supabase/admin';
import { AppError } from '@/server/utils/custom-errors';

export class SupabaseStorageService {
  private bucketName = 'stockvault';

  async uploadMedia(
    fileBuffer: Buffer,
    fileName: string,
    folder: 'thumbnails' | 'previews' | 'logos' | 'icons' | 'banners' = 'thumbnails',
    contentType: string = 'image/webp'
  ): Promise<string> {
    try {
      const filePath = `${folder}/${Date.now()}_${fileName}`;
      const { data, error } = await supabaseAdmin.storage
        .from(this.bucketName)
        .upload(filePath, fileBuffer, {
          contentType,
          upsert: true,
        });

      if (error) throw error;

      const { data: publicUrlData } = supabaseAdmin.storage
        .from(this.bucketName)
        .getPublicUrl(data.path);

      return publicUrlData.publicUrl;
    } catch (err: any) {
      console.error(`Supabase Storage Upload Error in folder ${folder}:`, err);
      // Fallback preview URL
      return folder === 'previews'
        ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
        : 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80';
    }
  }
}

export const supabaseStorageService = new SupabaseStorageService();
