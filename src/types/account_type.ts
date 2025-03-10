export interface accountType {
  accountId: string;
  email: string;
  fullname: string;
  phoneNumber: string;
  profileImage: string;
  role: [];
  stores: [];
  accountStatus: boolean;
  createdAt: Date;
  updateAt: Date;
  theme: "light" | "dark";
  totalStores: number;
  totalProductsUploaded: number;
  totalSales: number;
  lastLogin: Date;
}
