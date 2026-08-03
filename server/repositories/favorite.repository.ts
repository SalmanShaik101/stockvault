import { supabaseAdmin } from '@/lib/supabase/admin';
import { FavoriteRecord } from '@/server/types/supabase.types';

export class FavoriteRepository {
  async getUserFavorites(userId: string): Promise<FavoriteRecord[]> {
    const { data } = await supabaseAdmin
      .from('favorites')
      .select('*, products(*)')
      .eq('user_id', userId);

    return (data as FavoriteRecord[]) || [];
  }

  async addFavorite(userId: string, productId: string): Promise<FavoriteRecord> {
    const record = { user_id: userId, product_id: productId };
    const { data } = await supabaseAdmin
      .from('favorites')
      .upsert(record, { onConflict: 'user_id,product_id' })
      .select()
      .single();

    return (data as FavoriteRecord) || record;
  }

  async removeFavorite(userId: string, productId: string): Promise<void> {
    await supabaseAdmin
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
  }
}

export const favoriteRepository = new FavoriteRepository();
