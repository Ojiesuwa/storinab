import { useEffect, useState } from "react";
import { ProductType } from "../types/product_type";
import { toast } from "react-toastify";
import { getDocumentById, updateDocumentById } from "../firebase/firebaseTools";
import useAuth from "./useAuth";
import { CartType } from "../types/cart_type";

const useProductView = (productId: string) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { accountDetail, setIsAuthVisible } = useAuth();

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res: any = await getDocumentById("Product", productId);
      setProduct(res);
    } catch (error) {
      console.error(error);
      setError("Error loading product");
      toast.error("Error loading product");
    } finally {
      setIsLoading(false);
    }
  };

  const addProductToOfflineCart = (quantity: number) => {
    quantity;
    toast.success("Log in to add to cart");
    setIsAuthVisible(true);
  };

  const addProductToOnlineCart = async (quantity: number, variation: any) => {
    try {
      // Get product details

      const cartInformation: CartType = {
        cartImage: product?.images[0] || "",
        price: product?.price || 0,
        quantity,
        storeName: product?.storeName || "",
        variation: variation,
        productId: product?.productId || "",
        productName: product?.name || "",
        category: product?.category as any,
      };

      // Filter cart information if already existent
      const newCart = ((accountDetail?.cart as CartType[]) || []).filter(
        (cart: CartType) => cart.productId !== productId
      );

      const isNewCart = newCart.length === accountDetail?.cart?.length;

      newCart.push(cartInformation);

      await updateDocumentById("Account", accountDetail?.accountId || "", {
        cart: newCart,
      });

      toast.success(isNewCart ? "Product Added to Cart" : "Cart Updated");
    } catch (error) {
      console.error(error);
      toast.error("Error adding product to cart");
    }
  };

  const addProductToCart = (quantity?: number, variation?: any) => {
    if (!variation) {
      variation = {};
      product?.variants?.forEach((element: any) => {
        // Add properties to varationObj dynamically
        if (element?.title) {
          variation[element.title] = element.default;
        }
      });
    }
    if (accountDetail) {
      addProductToOnlineCart(quantity || 1, variation);
    } else {
      addProductToOfflineCart(quantity || 1);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return { product, isLoading, error, refetch: fetchProduct, addProductToCart };
};

export default useProductView;
