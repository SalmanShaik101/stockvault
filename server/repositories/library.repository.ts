import { supabaseAdmin } from '@/lib/supabase/admin';
import { UserLibraryRecord } from '@/server/types/supabase.types';

export class LibraryRepository {
  async addToLibrary(userId: string, productId: string, orderId?: string): Promise<UserLibraryRecord> {
    const record = {
      user_id: userId,
      product_id: productId,
      order_id: orderId || null,
      purchase_date: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from('user_library')
      .upsert(record, { onConflict: 'user_id,product_id' })
      .select()
      .single();

    if (error) {
      console.error('Error adding to library:', error);
      return record as UserLibraryRecord;
    }
    return data as UserLibraryRecord;
  }

  async hasAccess(userId: string, productId: string): Promise<boolean> {
    const { data } = await supabaseAdmin
      .from('user_library')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    return !!data;
  }

  async getUserLibrary(userId: string): Promise<UserLibraryRecord[]> {
    const { data, error } = await supabaseAdmin
      .from('user_library')
      .select('*, products(*)')
      .eq('user_id', userId);

    if (error || !data) return [];
    return data as unknown as UserLibraryRecord[];
  }
}

export const libraryRepository = new LibraryRepository();
