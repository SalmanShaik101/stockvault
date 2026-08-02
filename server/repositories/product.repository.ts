import { adminDb } from '@/server/config/firebase-admin.config';
import { ProductDocument } from '@/server/types/models.types';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export class ProductRepository {
  private collection = adminDb.collection('products');

  async findByProductId(productId: string): Promise<ProductDocument | null> {
    try {
      const doc = await this.collection.doc(productId).get();
      if (doc.exists) {
        return doc.data() as ProductDocument;
      }
    } catch (err) {
      // Fallback to mock data store
    }
    const mock = MOCK_PRODUCTS.find((p) => p.productId === productId || p.id === productId);
    return mock ? (mock as unknown as ProductDocument) : null;
  }

  async listProducts(category?: string): Promise<ProductDocument[]> {
    try {
      let query: FirebaseFirestore.Query = this.collection.where('active', '==', true);
      if (category && category !== 'all') {
        query = query.where('category', '==', category.toLowerCase());
      }
      const snapshot = await query.get();
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => doc.data() as ProductDocument);
      }
    } catch (err) {
      // Fallback
    }

    let products = MOCK_PRODUCTS as unknown as ProductDocument[];
    if (category && category !== 'all') {
      products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    return products;
  }

  async create(product: ProductDocument): Promise<ProductDocument> {
    await this.collection.doc(product.productId).set(product);
    return product;
  }

  async update(productId: string, data: Partial<ProductDocument>): Promise<void> {
    await this.collection.doc(productId).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
  }

  async incrementDownloadCount(productId: string): Promise<void> {
    try {
      await this.collection.doc(productId).update({
        downloadCount: FirebaseFirestore.FieldValue.increment(1),
      });
    } catch (err) {
      // Ignore if document not in live Firestore
    }
  }
}

export const productRepository = new ProductRepository();
