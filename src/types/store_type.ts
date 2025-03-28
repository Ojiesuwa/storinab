export interface StoreType {
  storeId: string;
  ownerId: string;
  name: string;
  description: string;
  logoURL: string;
  bannerURL: string;
  category: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  email: string;
  phone: string;
  socialLink: string[];
  shippingCost: number;
  returnPolicy: string;
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalRating?: number;
  totalRatingCount?: number;
  followers: number;
}
