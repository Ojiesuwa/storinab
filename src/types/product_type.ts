export interface productType {
  productId: string;
  storeId: string;
  name: string;
  description: string;
  category: string[];
  tags: string[];
  brand: string | null;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  discount: number;
  stockQuantity: number;
  isAvailable: boolean;
  images: string[];
  videoURL: string;
  weight: string;
  dimension: { length: string; width: string; height: string };
  hasVariants: boolean;
  variants: {};
  totalSales: number;
  totalRating: number;
  totalRatingCount: number;
  isVisible: boolean;
}
