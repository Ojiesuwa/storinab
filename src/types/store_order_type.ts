import { productOrder } from "./product_order_type";

export interface storeOrder {
  storeId: string;
  storeName: string;
  subTotal: number;
  platformFee: number;
  storeEarnings: number;
  orderStatus: "pending" | "acknowledged" | "delivering" | "delivered";
  product: productOrder[];
}
