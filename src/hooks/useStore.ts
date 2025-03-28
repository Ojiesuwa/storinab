import { useState } from "react";
import { StoreType } from "../types/store_type";

const useStore = () => {
  const [store, setStore] = useState<StoreType>();
  return {
    setStore,
    store,
  };
};

export default useStore;
