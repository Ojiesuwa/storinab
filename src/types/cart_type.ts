export interface cart {
  accountId: string;
  totalItems: number;
  totalPrice: number;
  updatedAt: Date;
  storeCart: storeCart[];
}

interface storeCart {
  storeId: string;
  name: string;
  products: storeCartProduct[];
}

interface storeCartProduct {
  productId: string;
  name: string;
  imageURL: string;
  quantity: number;
  price: number;
  selectedVariant: {};
}

export interface CartType {
  cartImage: string;
  productName: string;
  price: number;
  quantity: number;
  storeName: string;
  variation: any;
  productId: string;
  category?:[]
}
