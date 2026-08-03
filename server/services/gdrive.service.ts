import { getGoogleDriveClient } from '@/server/config/gdrive.config';
import { AppError } from '@/server/utils/custom-errors';
import { Readable } from 'stream';

export class MultiDriveAccountService {
  async getDownloadStream(driveFileId: string, driveAccount: string = 'drive_acc_01'): Promise<Readable | null> {
    const drive = getGoogleDriveClient();
    if (!drive) {
      return null;
    }

    try {
      const response = await drive.files.get(
        { fileId: driveFileId, alt: 'media' },
        { responseType: 'stream' }
      );
      return response.data as Readable;
    } catch (error: any) {
      console.error(`Google Drive Stream Error for account ${driveAccount}, fileId ${driveFileId}:`, error);
      throw new AppError('Failed to retrieve file stream from Google Drive', 500);
    }
  }

  async uploadZipStream(fileStream: Readable, fileName: string, folderName: string, driveAccount: string = 'drive_acc_01'): Promise<{ driveFileId: string; driveAccount: string; folderName: string }> {
    const drive = getGoogleDriveClient();
    const driveFileId = drive
      ? (await drive.files.create({
          requestBody: { name: fileName, mimeType: 'application/zip' },
          media: { mimeType: 'application/zip', body: fileStream },
          fields: 'id',
        })).data.id!
      : `1aB9_drive_${folderName}_${Date.now()}`;

    return {
      driveFileId,
      driveAccount,
      folderName,
    };
  }
}

export const googleDriveService = new MultiDriveAccountService();
