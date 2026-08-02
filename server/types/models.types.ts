export interface UserDocument {
  uid: string;
  name: string;
  email: string;
  photoURL: string | null;
  role: 'USER' | 'ADMIN';
  membership: {
    planId: string | null;
    active: boolean;
    startDate: string | null;
    expiryDate: string | null;
    remainingDownloads: number;
  };
  joinedDate: string;
  lastLogin: string;
}

export interface ProductDocument {
  productId: string;
  title: string;
  slug?: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  driveFileId: string;
  driveAccountId: string;
  thumbnailUrl: string;
  previewVideoUrl: string;
  clipCount: number;
  fileSize: string;
  resolution: string;
  aspectRatio: string;
  format: string;
  tags: string[];
  downloadCount: number;
  rating: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDocument {
  orderId: string;
  userId: string;
  productId: string;
  paymentStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  paymentGateway: 'RAZORPAY';
  paymentId: string;
  razorpayOrderId: string;
  amount: number;
  currency: 'INR';
  purchaseDate: string;
  downloadCount: number;
  lastDownloadedAt?: string;
}

export interface DownloadDocument {
  id: string;
  userId: string;
  productId: string;
  orderId: string | null;
  downloadTime: string;
  ipAddress: string;
  userAgent: string;
  device: string;
}

export interface MembershipDocument {
  membershipId: string;
  userId: string;
  plan: 'MONTHLY_PASS' | 'ANNUAL_PASS';
  price: number;
  startDate: string;
  expiryDate: string;
  remainingDownloads: number;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  razorpaySubscriptionId?: string;
  createdAt: string;
}

export interface WishlistDocument {
  id: string;
  userId: string;
  productId: string;
  addedAt: string;
}

export interface CouponDocument {
  code: string;
  discountType: 'PERCENTAGE' | 'FLAT';
  discountValue: number;
  minPurchaseAmount: number;
  maxUses: number;
  usedCount: number;
  expiryDate: string;
  active: boolean;
  createdAt: string;
}

export interface NotificationDocument {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'ORDER_SUCCESS' | 'MEMBERSHIP_EXPIRED' | 'SYSTEM';
  read: boolean;
  createdAt: string;
}

export interface ActivityLogDocument {
  id: string;
  userId: string | null;
  action: string;
  details: Record<string, any>;
  ipAddress: string;
  timestamp: string;
}
