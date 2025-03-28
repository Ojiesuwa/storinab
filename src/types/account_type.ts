import { CartType } from "./cart_type";

export interface AccountType {
  accountId: string;
  email: string | null;
  fullname: string | null;
  phoneNumber: string | null;
  profileImage: string | null;
  role: string[];
  stores: string[];
  accountStatus: boolean;
  createdAt: Date;
  updateAt: Date;
  theme: "light" | "dark";
  totalStores: number;
  totalProductsUploaded: number;
  totalSales: number;
  lastLogin: Date;
  favourites: [];
  recentlyViewedCategory?: [];
  cart?: CartType[];
  followingStores?: []
}
