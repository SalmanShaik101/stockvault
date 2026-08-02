import { adminDb } from '@/server/config/firebase-admin.config';
import { DownloadDocument, ActivityLogDocument } from '@/server/types/models.types';

export class DownloadRepository {
  private collection = adminDb.collection('downloads');

  async logDownload(download: DownloadDocument): Promise<DownloadDocument> {
    const docRef = this.collection.doc();
    download.id = docRef.id;
    await docRef.set(download);
    return download;
  }
}

export class AuditRepository {
  private collection = adminDb.collection('activity_logs');

  async logAction(action: string, details: Record<string, any>, userId: string | null = null, ipAddress: string = '127.0.0.1'): Promise<void> {
    const docRef = this.collection.doc();
    const log: ActivityLogDocument = {
      id: docRef.id,
      userId,
      action,
      details,
      ipAddress,
      timestamp: new Date().toISOString(),
    };
    await docRef.set(log);
  }
}

export const downloadRepository = new DownloadRepository();
export const auditRepository = new AuditRepository();
