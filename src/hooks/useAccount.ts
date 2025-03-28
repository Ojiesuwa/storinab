import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { AccountType } from "../types/account_type";
import { toast } from "react-toastify";
import { getDocumentById, updateDocumentById } from "../firebase/firebaseTools";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { ProductType } from "../types/product_type";
import { CartType } from "../types/cart_type";

const useAccount = (productIdSource?: string) => {
  productIdSource;
  const { userCredential, accountDetail } = useAuth();
  const [account, setAccount] = useState<AccountType | null>(null);
  const [mainFetch, setMainFetch] = useState<ProductType[] | null>(null);
  const [accountFavourites, setAccountFavorites] = useState<
    ProductType[] | null
  >(null);

  const [accountCart, setAccountCart] = useState<CartType[]>([]);
  const localStoreId = "storinab-local-store-favourite";

  const handleFavouriteProduct = async (productId: string) => {
    try {
      if (!userCredential) {
        const previousLocalStoreValue: string[] = JSON.parse(
          localStorage.getItem(localStoreId) || "[]"
        );

        if (previousLocalStoreValue.some((id) => id === productId)) {
          localStorage.setItem(
            localStoreId,
            JSON.stringify(
              previousLocalStoreValue.filter((id) => id !== productId)
            )
          );
          toast.success("Product removed from favourite");
        } else {
          localStorage.setItem(
            localStoreId,
            JSON.stringify([...previousLocalStoreValue, productId])
          );
          toast.success("Product added to favourite");
        }
        fetchAccountFavourites();
        return;
      }

      if (isProductFavourited(productId)) {
        await updateDocumentById(
          "Account",
          accountDetail?.accountId as string,
          {
            favourites: arrayRemove(productId),
          }
        );
        toast.success("Product removed from favourite");
      } else {
        await updateDocumentById(
          "Account",
          accountDetail?.accountId as string,
          {
            favourites: arrayUnion(productId),
          }
        );
        toast.success("Product added to favourite");
      }
      fetchAccountFavourites(); // Refresh favourites after updating Firestore
    } catch (error) {
      console.error(error);
      toast.error("Error updating favourites");
    }
  };

  const isProductFavourited = (productId?: string) => {
    if (!userCredential) {
      const previousLocalStoreValue: string[] = JSON.parse(
        localStorage.getItem(localStoreId) || "[]"
      );
      return previousLocalStoreValue.some((id) => id === productId);
    }
    return (accountDetail?.favourites || []).some((id) => id === productId);
  };

  const fetchAccountFavourites = async () => {
    try {
      let favouriteIds: string[];

      if (!userCredential) {
        favouriteIds = JSON.parse(localStorage.getItem(localStoreId) || "[]");
      } else {
        favouriteIds = accountDetail?.favourites || [];
      }

      if (favouriteIds.length === 0) {
        setAccountFavorites([]);
        setMainFetch([]);
        return;
      }

      const productPromise = favouriteIds.map((productId: string) =>
        getDocumentById("Product", productId)
      );

      const response = await Promise.all(productPromise);
      const validFavourites = response.filter(
        (product) => product !== undefined
      );

      validFavourites.reverse();

      setAccountFavorites(validFavourites as any);
      setMainFetch(validFavourites as any);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching favourites");
    }
  };

  const incrementUsersCart = async (productId: string, positive?: boolean) => {
    try {
      if (!accountDetail) throw new Error();
      const accountCart = accountDetail?.cart;
      const newCart = accountCart?.map((cart) => {
        if (cart.productId === productId) {
          return {
            ...cart,
            quantity: positive ? cart.quantity + 1 : cart.quantity - 1,
          };
        }
        return cart;
      });

      setAccountCart(newCart as any);

      await updateDocumentById("Account", accountDetail.accountId, {
        cart: newCart,
      });
    } catch (error) {
      console.error(error);
      toast.error("We couldn't alter cart");
    } finally {
    }
  };
  const handleAccountLogin = async () => {
    if (!userCredential) return;
    const localStorageValue = localStorage.getItem(localStoreId);
    console.log(localStorageValue);

    if (localStorageValue) {
      updateDocumentById("Account", userCredential?.uid as string, {
        favourites: arrayUnion(...JSON.parse(localStorageValue || "[]")),
      });
      localStorage.setItem(localStoreId, "");
      toast.success("Favourite merged with account");
    }
  };

  const handleFilterAccountFavoriteByKeyword = (keyword: string) => {
    const newFavouriteList: ProductType[] | any = mainFetch?.filter((product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
    console.log(newFavouriteList);

    setAccountFavorites(newFavouriteList);
  };

  const deleteAccountCart = async (productId: string) => {
    try {
      const newCart = accountDetail?.cart?.filter(
        (data) => data.productId !== productId
      );

      setAccountCart(newCart as any);

      await updateDocumentById("Account", accountDetail?.accountId || "", {
        cart: newCart,
      });

      toast.success("Cart deleted");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting cart");
    }
  };

  const fetchAccountCart = () => {
    try {
      const cart = accountDetail?.cart || [];

      setAccountCart(cart);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching cart");
    }
  };

  useEffect(() => {
    setAccount(accountDetail);
    fetchAccountFavourites();
    handleAccountLogin();
    fetchAccountCart();
  }, [accountDetail, userCredential]);

  return {
    account,
    handleFavouriteProduct,
    isProductFavourited,
    accountFavourites,
    fetchAccountFavourites,
    handleFilterAccountFavoriteByKeyword,
    accountCart,
    incrementUsersCart,
    deleteAccountCart,
  };
};

export default useAccount;
