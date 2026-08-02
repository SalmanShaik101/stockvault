import { adminDb } from '@/server/config/firebase-admin.config';
import { OrderDocument } from '@/server/types/models.types';
import { MOCK_ORDERS } from '@/lib/mockData';

export class OrderRepository {
  private collection = adminDb.collection('orders');

  async findByOrderId(orderId: string): Promise<OrderDocument | null> {
    try {
      const doc = await this.collection.doc(orderId).get();
      if (doc.exists) {
        return doc.data() as OrderDocument;
      }
    } catch (err) {}

    const mock = MOCK_ORDERS.find((o) => o.orderId === orderId || o.id === orderId);
    if (mock) {
      return {
        orderId: mock.orderId,
        userId: mock.userId,
        productId: mock.productId,
        paymentStatus: mock.status as any,
        paymentGateway: 'RAZORPAY',
        paymentId: mock.razorpayPaymentId,
        razorpayOrderId: mock.razorpayOrderId,
        amount: mock.amount,
        currency: 'INR',
        purchaseDate: mock.createdAt,
        downloadCount: mock.downloadCount,
      };
    }

    return null;
  }

  async findUserPurchase(userId: string, productId: string): Promise<OrderDocument | null> {
    try {
      const snapshot = await this.collection
        .where('userId', '==', userId)
        .where('productId', '==', productId)
        .where('paymentStatus', '==', 'SUCCESS')
        .limit(1)
        .get();

      if (!snapshot.empty) {
        return snapshot.docs[0].data() as OrderDocument;
      }
    } catch (err) {}

    const mock = MOCK_ORDERS.find((o) => o.userId === userId && o.productId === productId && o.status === 'SUCCESS');
    if (mock) {
      return {
        orderId: mock.orderId,
        userId: mock.userId,
        productId: mock.productId,
        paymentStatus: 'SUCCESS',
        paymentGateway: 'RAZORPAY',
        paymentId: mock.razorpayPaymentId,
        razorpayOrderId: mock.razorpayOrderId,
        amount: mock.amount,
        currency: 'INR',
        purchaseDate: mock.createdAt,
        downloadCount: mock.downloadCount,
      };
    }

    return null;
  }

  async create(order: OrderDocument): Promise<OrderDocument> {
    await this.collection.doc(order.orderId).set(order);
    return order;
  }

  async listUserOrders(userId: string): Promise<OrderDocument[]> {
    try {
      const snapshot = await this.collection
        .where('userId', '==', userId)
        .orderBy('purchaseDate', 'desc')
        .get();

      if (!snapshot.empty) {
        return snapshot.docs.map((d) => d.data() as OrderDocument);
      }
    } catch (err) {}

    return MOCK_ORDERS.map((o) => ({
      orderId: o.orderId,
      userId: o.userId,
      productId: o.productId,
      paymentStatus: 'SUCCESS',
      paymentGateway: 'RAZORPAY',
      paymentId: o.razorpayPaymentId,
      razorpayOrderId: o.razorpayOrderId,
      amount: o.amount,
      currency: 'INR',
      purchaseDate: o.createdAt,
      downloadCount: o.downloadCount,
    }));
  }

  async incrementDownloadCount(orderId: string): Promise<void> {
    try {
      await this.collection.doc(orderId).update({
        downloadCount: FirebaseFirestore.FieldValue.increment(1),
        lastDownloadedAt: new Date().toISOString(),
      });
    } catch (err) {}
  }
}

export const orderRepository = new OrderRepository();
