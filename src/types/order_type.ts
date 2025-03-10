import { storeOrder } from "./store_order_type";

export interface orderInformationType{
  orderId:string;
  buyerId: string;
  totalAmount: number;
  paymentStatus: "pending" | "paid",
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
  stored: storeOrder[];
}