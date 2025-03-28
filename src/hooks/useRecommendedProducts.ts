import { useEffect, useState } from "react";
import { ProductType } from "../types/product_type";
import { toast } from "react-toastify";
import useAuth from "./useAuth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const useRecommendedProducts = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<
    ProductType[] | null
  >(null);

  // Hooks
  const { accountDetail } = useAuth();

  const fetchRecommendedProducts = async () => {
    try {
      if (!accountDetail) return;
      if (accountDetail?.cart?.length === 0) return;
      const categories = accountDetail.cart?.map(
        (data: any) => data.category[0]
      );

      // categories?);
      console.log(categories);

      const productRef = collection(db, "Product");
      const q = query(
        productRef,
        where("category", "array-contains-any", categories || ["all"]),
        limit(20)
      );

      const snapshot = await getDocs(q);
      const products: ProductType[] | any = snapshot.docs.map((data) => ({
        ...data.data(),
      }));

      const filteredProducts = products.filter(
        (product: any) =>
          !accountDetail.cart?.some(
            (cart) => cart.productId === product.productId
          )
      );
      setRecommendedProducts(filteredProducts);
    } catch (error) {
      console.error(error);
      toast.error("Error loading recommended products");
    }
  };

  useEffect(() => {
    fetchRecommendedProducts();
  }, [accountDetail]);

  return {
    recommendedProducts,
  };
};

export default useRecommendedProducts;
