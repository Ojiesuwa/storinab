import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCollectionByName } from "../firebase/firebaseTools";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import useAuth from "./useAuth";

const useSite = () => {
  const [siteCategories, setSiteCategories] = useState([]);
  const [siteBrands, setSiteBrands] = useState([]);
  const [siteStores, setSiteStores] = useState([]);
  const [todaysDeal, setTodaysDeal] = useState([]);
  const [topSales, setTopSales] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const { accountDetail } = useAuth();

  // const fetchAllProductInformation = async () => {
  //   try {
  //     const siteProductInformation = await getDocumentById(
  //       "Site",
  //       "productInformation"
  //     );

  //     setSiteCategories(siteProductInformation.productCategories || []);
  //     setSiteBrands(siteProductInformation.productBrands || []);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Error fetching categories");
  //   }
  // };

  const fetchAllInformation = async () => {
    try {
      const data = await getCollectionByName("Site");

      const productInformation = data.find(
        (id) => id.docId === "productInformation"
      );

      const storeInformation = data.find(
        (id) => id.docId === "storeInformation"
      );

      console.log(storeInformation);

      setSiteCategories(productInformation?.productCategories || []);
      setSiteBrands(productInformation?.productBrands || []);
      setSiteStores(storeInformation?.allStores || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodaysDeal = async () => {
    try {
      const collectionRef = collection(db, "Product");
      const q = query(collectionRef, orderBy("createdAt", "desc"), limit(15));

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((value) => ({ ...value.data() }));
      setTodaysDeal(data as any);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const fetchRecommended = async () => {
    try {
      if (!accountDetail) return;
      const collectionRef = collection(db, "Product");
      const q = query(
        collectionRef,
        where(
          "category",
          "array-contains-any",
          accountDetail.recentlyViewedCategory
        ),
        limit(10)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((value) => ({ ...value.data() }));
      setRecommended(data as any);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const fetchTopSales = async () => {
    try {
      const collectionRef = collection(db, "Product");
      const q = query(collectionRef, orderBy("totalSales", "desc"), limit(20));

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((value) => ({ ...value.data() }));
      setTopSales(data as any);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    // fetchAllCategories();
    fetchAllInformation();
    fetchTodaysDeal();
    fetchTopSales();
    fetchRecommended();
  }, [accountDetail]);
  return {
    siteCategories,
    siteBrands,
    siteStores,
    todaysDeal,
    topSales,
    recommended,
  };
};

export default useSite;
