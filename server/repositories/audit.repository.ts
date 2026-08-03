import { supabaseAdmin } from '@/lib/supabase/admin';
import { AuditLogRecord } from '@/server/types/supabase.types';

export class AuditRepository {
  async logAction(
    action: string,
    details: Record<string, any> = {},
    userId: string | null = null,
    ipAddress: string | null = null
  ): Promise<void> {
    try {
      const record: Partial<AuditLogRecord> = {
        user_id: userId,
        action,
        details,
        ip_address: ipAddress,
        timestamp: new Date().toISOString(),
      };
      await supabaseAdmin.from('audit_logs').insert(record);
    } catch (err) {
      console.error('Audit Log Error:', err);
    }
  }
}

export const auditRepository = new AuditRepository();
