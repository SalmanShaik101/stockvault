import { adminDb } from '@/server/config/firebase-admin.config';
import { ActivityLogDocument } from '@/server/types/models.types';

export class AuditRepository {
  private collection = adminDb.collection('activity_logs');

  async logAction(action: string, details: Record<string, any>, userId: string | null = null, ipAddress: string = '127.0.0.1'): Promise<void> {
    try {
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
    } catch (err) {
      console.error('Audit Log Error:', err);
    }
  }
}

export const auditRepository = new AuditRepository();
