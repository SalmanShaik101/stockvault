export interface Product {
  id: string;
  productId: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  driveFileId: string;
  driveAccountId?: string;
  thumbnailUrl: string;
  previewVideoUrl: string;
  clipCount: number;
  fileSize: string;
  resolution: string;
  aspectRatio: string;
  format: string;
  tags: string[];
  downloads: number;
  rating: number;
  active: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  orderId: string;
  userId: string;
  productId: string;
  productTitle: string;
  productCategory: string;
  thumbnailUrl: string;
  driveFileId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  downloadCount: number;
  lastDownloadedAt?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  count: number;
}
