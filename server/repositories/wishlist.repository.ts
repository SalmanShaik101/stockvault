import { adminDb } from '@/server/config/firebase-admin.config';
import { WishlistDocument } from '@/server/types/models.types';

export class WishlistRepository {
  private collection = adminDb.collection('wishlist');

  async getUserWishlist(userId: string): Promise<WishlistDocument[]> {
    try {
      const snapshot = await this.collection.where('userId', '==', userId).get();
      return snapshot.docs.map((d) => d.data() as WishlistDocument);
    } catch (err) {
      return [];
    }
  }

  async add(userId: string, productId: string): Promise<WishlistDocument> {
    const id = `${userId}_${productId}`;
    const doc: WishlistDocument = {
      id,
      userId,
      productId,
      addedAt: new Date().toISOString(),
    };
    try {
      await this.collection.doc(id).set(doc);
    } catch (err) {}
    return doc;
  }

  async remove(userId: string, productId: string): Promise<void> {
    const id = `${userId}_${productId}`;
    try {
      await this.collection.doc(id).delete();
    } catch (err) {}
  }
}

export const wishlistRepository = new WishlistRepository();
