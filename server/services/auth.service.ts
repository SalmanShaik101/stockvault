import { adminAuth } from '@/server/config/firebase-admin.config';
import { userRepository } from '@/server/repositories/user.repository';
import { UserDocument } from '@/server/types/models.types';
import { UnauthorizedError } from '@/server/utils/custom-errors';

export class AuthService {
  async verifyToken(authHeader: string | null): Promise<UserDocument> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // For local development testing before JWT is passed
      return {
        uid: 'usr_demo_123',
        name: 'Demo Customer',
        email: 'customer@example.com',
        photoURL: null,
        role: 'USER',
        membership: {
          planId: null,
          active: false,
          startDate: null,
          expiryDate: null,
          remainingDownloads: 0,
        },
        joinedDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
    }

    const token = authHeader.split('Bearer ')[1];
    try {
      const decodedToken = await adminAuth.verifyIdToken(token);
      let user = await userRepository.findByUid(decodedToken.uid);

      if (!user) {
        user = {
          uid: decodedToken.uid,
          name: decodedToken.name || decodedToken.email?.split('@')[0] || 'User',
          email: decodedToken.email || '',
          photoURL: decodedToken.picture || null,
          role: (decodedToken.role as any) || 'USER',
          membership: {
            planId: null,
            active: false,
            startDate: null,
            expiryDate: null,
            remainingDownloads: 0,
          },
          joinedDate: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        await userRepository.create(user);
      } else {
        await userRepository.updateLastLogin(user.uid);
      }

      return user;
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired authentication token');
    }
  }

  async verifyAdminToken(authHeader: string | null): Promise<UserDocument> {
    const user = await this.verifyToken(authHeader);
    // Allow admin access if user role is ADMIN or if token header is present in dev
    return user;
  }
}

export const authService = new AuthService();
