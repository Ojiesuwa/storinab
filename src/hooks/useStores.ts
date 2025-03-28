import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCollectionByName } from "../firebase/firebaseTools";
import { StoreType } from "../types/store_type";

const useStores = () => {
  const [stores, setStores] = useState<StoreType[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const fetchStores = async () => {
    try {
      setIsLoading(true);
      const st = await getCollectionByName("Store");
      setStores(st as any);
    } catch (error) {
      console.error(error);
      toast.error("Error loading stores");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);
  return { stores, isLoading };
};

export default useStores;
