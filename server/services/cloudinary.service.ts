import { cloudinary } from '@/server/config/cloudinary.config';
import { AppError } from '@/server/utils/custom-errors';

export class CloudinaryService {
  async uploadMedia(
    fileInput: string | Buffer,
    resourceType: 'image' | 'video' = 'image',
    folder: string = 'stockvault'
  ): Promise<string> {
    try {
      if (typeof fileInput === 'string') {
        const result = await cloudinary.uploader.upload(fileInput, {
          folder,
          resource_type: resourceType,
          transformation: resourceType === 'video'
            ? [{ quality: 'auto', fetch_format: 'mp4' }]
            : [{ quality: 'auto', fetch_format: 'webp' }],
        });
        return result.secure_url;
      } else if (Buffer.isBuffer(fileInput)) {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder,
              resource_type: resourceType,
              transformation: resourceType === 'video'
                ? [{ quality: 'auto', fetch_format: 'mp4' }]
                : [{ quality: 'auto', fetch_format: 'webp' }],
            },
            (error, result) => {
              if (error || !result) {
                return reject(error || new Error('Upload to Cloudinary failed'));
              }
              resolve(result.secure_url);
            }
          );
          uploadStream.end(fileInput);
        });
      }
      return typeof fileInput === 'string' ? fileInput : '';
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      return typeof fileInput === 'string' ? fileInput : '';
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
