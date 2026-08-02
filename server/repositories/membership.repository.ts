import { adminDb } from '@/server/config/firebase-admin.config';
import { MembershipDocument, CouponDocument, WishlistDocument } from '@/server/types/models.types';

export class MembershipRepository {
  private collection = adminDb.collection('memberships');

  async findActiveByUserId(userId: string): Promise<MembershipDocument | null> {
    try {
      const snapshot = await this.collection
        .where('userId', '==', userId)
        .where('status', '==', 'ACTIVE')
        .limit(1)
        .get();

      if (!snapshot.empty) {
        return snapshot.docs[0].data() as MembershipDocument;
      }
    } catch (err) {}
    return null;
  }

  async create(membership: MembershipDocument): Promise<MembershipDocument> {
    await this.collection.doc(membership.membershipId).set(membership);
    return membership;
  }
}

export class CouponRepository {
  private collection = adminDb.collection('coupons');

  async findByCode(code: string): Promise<CouponDocument | null> {
    try {
      const doc = await this.collection.doc(code.toUpperCase()).get();
      return doc.exists ? (doc.data() as CouponDocument) : null;
    } catch (err) {
      return null;
    }
  }

  async incrementUsage(code: string): Promise<void> {
    try {
      await this.collection.doc(code.toUpperCase()).update({
        usedCount: FirebaseFirestore.FieldValue.increment(1),
      });
    } catch (err) {}
  }
}

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
    await this.collection.doc(id).set(doc);
    return doc;
  }

  async remove(userId: string, productId: string): Promise<void> {
    const id = `${userId}_${productId}`;
    await this.collection.doc(id).delete();
  }
}

export const membershipRepository = new MembershipRepository();
export const couponRepository = new CouponRepository();
export const wishlistRepository = new WishlistRepository();
