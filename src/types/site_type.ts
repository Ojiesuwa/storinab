export interface site {
  name: string;
  platformFeePercentage: number;
  contact: { email: string; phone: number };
  socialMedia: {};
  termsAndConditions: string;
  aboutUs: string;
  totalOrders: number;
  ordersToday: number;
  totalRevenue: number;
  revenueToday: number;
  revenueThisMonth: number;
  totalStores: number;
  activeStoresToday: number;
  totalProducts: number;
  mostViewedProducts: [];
  categoriesWithMostSales: [];
  totalAccounts: number;
  featuredStores: { storeId: string; name: string; bannerURL: string }[];
  announcement: { type: string; message: string; date: Date }[];
  topPerformingStores: {
    storeId: string;
    imageURL: string;
    name: string;
    revenue: number;
    products: number;
    followers: number;
  }[];
}
