export interface ProfileRecord {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'USER' | 'ADMIN';
  created_at: string;
  last_login: string;
}

export interface ProductRecord {
  id: string;
  product_id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  thumbnail_url: string;
  preview_url: string;
  drive_file_id: string;
  drive_account: string;
  folder_name: string;
  total_files: number;
  zip_size: string;
  downloads: number;
  views: number;
  sales: number;
  favorites: number;
  resolution: string;
  aspect_ratio: string;
  format: string;
  tags: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MembershipRecord {
  id: string;
  user_id: string;
  plan: 'MONTHLY_PASS' | 'ANNUAL_PASS';
  price: number;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  remaining_downloads: number;
  start_date: string;
  expiry_date: string;
  created_at: string;
  updated_at: string;
}

export interface OrderRecord {
  id: string;
  order_id: string;
  user_id: string;
  product_id: string;
  payment_gateway: 'RAZORPAY';
  payment_id: string;
  razorpay_order_id: string;
  amount: number;
  currency: 'INR';
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  created_at: string;
}

export interface UserLibraryRecord {
  id: string;
  user_id: string;
  product_id: string;
  order_id?: string | null;
  purchase_date: string;
}

export interface DownloadRecord {
  id: string;
  user_id: string;
  product_id: string;
  order_id?: string | null;
  download_date: string;
  device?: string | null;
  ip_address?: string | null;
}

export interface FavoriteRecord {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

export interface ProductViewRecord {
  id: string;
  product_id: string;
  user_id?: string | null;
  ip_address?: string | null;
  timestamp: string;
}

export interface CouponRecord {
  id: string;
  code: string;
  discount_type: 'PERCENTAGE' | 'FLAT';
  discount_value: number;
  min_purchase_amount: number;
  max_uses: number;
  used_count: number;
  expiry_date: string;
  active: boolean;
  created_at: string;
}

export interface AuditLogRecord {
  id: string;
  user_id?: string | null;
  action: string;
  details?: Record<string, any> | null;
  ip_address?: string | null;
  timestamp: string;
}
