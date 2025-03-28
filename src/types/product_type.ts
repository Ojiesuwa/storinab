export interface ProductType {
  productId: string;
  storeId: string;
  storeName: string;
  name: string;
  description: string;
  category: string[] | any;
  tags: string[];
  brand: string | null;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  oldPrice: number | null;
  discount: number;
  stockQuantity: number;
  isAvailable: boolean;
  images: string[];
  videoURL: string;
  weight: string;
  dimension: { length: string; width: string; height: string };
  hasVariants: boolean;
  variants: {}[];
  totalSales: number;
  totalRating: number;
  totalRatingCount: number;
  isVisible: boolean;
  reviewId?: string;
  seo?: string[];
}
