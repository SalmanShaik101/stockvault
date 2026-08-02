import { adminDb } from '@/server/config/firebase-admin.config';
import { UserDocument } from '@/server/types/models.types';

export class UserRepository {
  private collection = adminDb.collection('users');

  async findByUid(uid: string): Promise<UserDocument | null> {
    const doc = await this.collection.doc(uid).get();
    return doc.exists ? (doc.data() as UserDocument) : null;
  }

  async create(user: UserDocument): Promise<UserDocument> {
    await this.collection.doc(user.uid).set(user);
    return user;
  }

  async update(uid: string, data: Partial<UserDocument>): Promise<void> {
    await this.collection.doc(uid).update(data);
  }

  async updateLastLogin(uid: string): Promise<void> {
    await this.collection.doc(uid).update({
      lastLogin: new Date().toISOString(),
    });
  }

  async updateMembership(uid: string, membership: UserDocument['membership']): Promise<void> {
    await this.collection.doc(uid).update({ membership });
  }

  async listAll(limit: number = 50): Promise<UserDocument[]> {
    const snapshot = await this.collection.limit(limit).get();
    return snapshot.docs.map((doc) => doc.data() as UserDocument);
  }
}

export const userRepository = new UserRepository();
