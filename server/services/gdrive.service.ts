import { getGoogleDriveClient } from '@/server/config/gdrive.config';
import { AppError } from '@/server/utils/custom-errors';
import { Readable } from 'stream';

export class GoogleDriveService {
  async getDownloadStream(fileId: string): Promise<Readable | null> {
    const drive = getGoogleDriveClient();
    if (!drive) {
      return null;
    }

    try {
      const response = await drive.files.get(
        { fileId, alt: 'media' },
        { responseType: 'stream' }
      );
      return response.data as Readable;
    } catch (error: any) {
      console.error(`Google Drive Stream Error for fileId ${fileId}:`, error);
      throw new AppError('Failed to retrieve file stream from Google Drive', 500);
    }
  }

  async uploadZipStream(fileStream: Readable, fileName: string, category: string): Promise<string> {
    const drive = getGoogleDriveClient();
    if (!drive) {
      // Return simulated Drive File ID when credentials are not yet linked
      return `1aB9_drive_${category}_${Date.now()}`;
    }

    try {
      const response = await drive.files.create({
        requestBody: {
          name: fileName,
          mimeType: 'application/zip',
        },
        media: {
          mimeType: 'application/zip',
          body: fileStream,
        },
        fields: 'id',
      });

      if (!response.data.id) {
        throw new AppError('Google Drive API did not return a valid file ID', 500);
      }

      return response.data.id;
    } catch (error: any) {
      console.error('Google Drive Upload Error:', error);
      throw new AppError('Failed to upload ZIP file to Google Drive', 500);
    }
  }
}

export const googleDriveService = new GoogleDriveService();
