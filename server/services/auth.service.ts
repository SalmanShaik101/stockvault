import { supabaseAdmin } from '@/lib/supabase/admin';
import { profileRepository } from '@/server/repositories/profile.repository';
import { ProfileRecord } from '@/server/types/supabase.types';
import { UnauthorizedError } from '@/server/utils/custom-errors';

export class AuthService {
  async verifyToken(authHeader: string | null): Promise<ProfileRecord> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Demo Customer Fallback
      return {
        id: 'usr_demo_123',
        email: 'customer@example.com',
        full_name: 'Demo Customer',
        avatar_url: null,
        role: 'USER',
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };
    }

    const token = authHeader.split('Bearer ')[1];
    try {
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      if (error || !user) {
        throw new UnauthorizedError('Invalid or expired Supabase token');
      }

      let profile = await profileRepository.findById(user.id);
      if (!profile) {
        profile = {
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          avatar_url: user.user_metadata?.avatar_url || null,
          role: (user.user_metadata?.role as any) || 'USER',
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        await profileRepository.upsertProfile(profile);
      } else {
        await profileRepository.updateLastLogin(user.id);
      }

      return profile;
    } catch (error) {
      throw new UnauthorizedError('Authentication failed');
    }
  }

  async verifyAdminToken(authHeader: string | null): Promise<ProfileRecord> {
    const profile = await this.verifyToken(authHeader);
    return profile;
  }
}

export const authService = new AuthService();
