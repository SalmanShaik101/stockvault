import { cloudinary } from '@/server/config/cloudinary.config';
import { AppError } from '@/server/utils/custom-errors';

export class CloudinaryService {
  async uploadMedia(filePathOrUrl: string, resourceType: 'image' | 'video' = 'image', folder: string = 'stockvault'): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(filePathOrUrl, {
        folder,
        resource_type: resourceType,
        transformation: resourceType === 'video' ? [{ quality: 'auto', fetch_format: 'mp4' }] : [{ quality: 'auto', fetch_format: 'webp' }],
      });
      return result.secure_url;
    } catch (error) {
      // Fallback
      return filePathOrUrl;
    }
  }

  async deleteAsset(publicId: string, resourceType: 'image' | 'video' = 'image'): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    } catch (error) {
      console.error('Cloudinary Deletion Error:', error);
    }
  }
}

export const cloudinaryService = new CloudinaryService();
