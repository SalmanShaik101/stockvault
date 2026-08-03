import { supabaseAdmin } from '@/lib/supabase/admin';
import { ProfileRecord } from '@/server/types/supabase.types';

export class ProfileRepository {
  async findById(id: string): Promise<ProfileRecord | null> {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return data as ProfileRecord;
  }

  async upsertProfile(profile: ProfileRecord): Promise<ProfileRecord> {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .upsert(profile, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Error upserting profile:', error);
      return profile;
    }
    return data as ProfileRecord;
  }

  async updateLastLogin(id: string): Promise<void> {
    await supabaseAdmin
      .from('profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('id', id);
  }
}

export const profileRepository = new ProfileRepository();
