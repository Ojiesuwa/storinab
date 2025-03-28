export interface CategoryType {
  category: string;
  brand: string;
  store: string;
  price: { higher: any; lower: any };
  discount: { higher: any; lower: any };
}
