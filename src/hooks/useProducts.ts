import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { ProductType } from "../types/product_type";
import { algoliasearch } from "algoliasearch";
import { CategoryType } from "../types/category_type";
import { db } from "../firebase/config";
import { useLocation } from "react-router-dom";

const useProducts = (setIsLoading: (isLoading: boolean) => void) => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [fullProducts, setFullProducts] = useState<ProductType[]>([]);

  const [categoryData, setCategoryData] = useState<CategoryType>({
    brand: "",
    category: queryParams.get("category") || "",
    store: "",
    price: { higher: null, lower: null },
    discount: { higher: null, lower: null },
  });
  const [categorizedData, setCategorizedData] = useState<ProductType[]>();

  const client = algoliasearch(
    "B62DG2AHGE",
    "45f61e6780d23c41cd3f148028e195d0"
  );

  console.log(products);

  const updateProducts = (products: ProductType[]) => {
    const filteredProduct = products.filter((product) =>
      doesProductFitCategory(product)
    );
    setProducts(filteredProduct);
  };

  const doesProductFitCategory = (product: ProductType) => {
    const isInbrand =
      product.brand === categoryData.brand || categoryData.brand === "";

    const isInCategory =
      categoryData.category === "" ||
      product.category[0] === categoryData.category;

    const isInStore =
      product.storeName === categoryData.store || categoryData.store === "";

    const isInLowerPrice =
      categoryData.price.lower === null ||
      categoryData.price.lower === 0 ||
      isNaN(categoryData.price.lower) ||
      parseInt(categoryData.price.lower) <= product.price;

    const isInHigherPrice =
      categoryData.price.higher === null ||
      categoryData.price.higher === 0 ||
      isNaN(categoryData.price.higher) ||
      parseInt(categoryData.price.higher) >= product.price;

    const isInLowerDiscount =
      categoryData.discount.lower === null ||
      categoryData.discount.lower === 0 ||
      isNaN(categoryData.discount.lower) ||
      parseInt(categoryData.discount.lower) <= product.discount;

    const isInHigherDiscount =
      categoryData.discount.higher === null ||
      categoryData.discount.higher === 0 ||
      isNaN(categoryData.discount.higher) ||
      parseInt(categoryData.discount.higher) >= product.discount;

    return (
      isInbrand &&
      isInCategory &&
      isInStore &&
      isInLowerPrice &&
      isInHigherPrice &&
      isInLowerDiscount &&
      isInHigherDiscount
    );
  };

  const searchProducts = async (keyword: string) => {
    try {
      if (keyword === "") {
        fetchProducts(true);
        return;
      }
      setIsLoading(true);
      const { results } = await client.search({
        requests: [
          {
            indexName: "algolia-test",
            query: keyword,
          },
        ],
      });

      const resultFormatted = ({ ...results[0] } as any).hits;
      updateProducts(resultFormatted);
      setFullProducts(resultFormatted);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't perform search");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async (isFirst: boolean | null) => {
    try {
      setIsLoading(true);
      const colRef = collection(db, "Product");
      const q = query(colRef, orderBy("updatedAt", "desc"));

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((data) => ({ ...data.data() }));

      console.log(data);

      updateProducts(data as ProductType[]);
      setFullProducts(data as ProductType[]);
    } catch (error) {
      console.error(error);
      toast.error("Error loading products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCateogorizeData = () => {
    const data = products.filter((product) => {
      const isInCategory =
        product.category[0] === categoryData?.category ||
        categoryData?.category === "";

      const isInBrand =
        product.brand === categoryData?.brand || categoryData?.brand === "";

      const isInStore =
        product.storeName === categoryData?.store || categoryData?.store === "";

      const isInPriceRange =
        categoryData?.price.lower === null &&
        categoryData?.price.higher === null
          ? true
          : product.price >= parseInt(categoryData?.price.lower) &&
            product.price <= parseInt(categoryData?.price.higher);

      const isinDiscountRange =
        (categoryData?.discount.lower === null ||
          categoryData?.discount.lower === 0) &&
        (categoryData.discount.higher === null ||
          categoryData?.discount.higher === 0)
          ? true
          : product.discount >= parseInt(categoryData?.discount.higher) &&
            product.discount <= parseInt(categoryData?.discount.higher);

      console.log(
        isInCategory,
        isInBrand,
        isInPriceRange,
        isInStore,
        isinDiscountRange
      );

      return (
        isInCategory &&
        isInBrand &&
        isInPriceRange &&
        isInStore &&
        isinDiscountRange
      );
    });
    setCategorizedData(data);
  };

  const resetProducts = () => {
    setCategoryData({
      brand: "",
      category: "",
      store: "",
      price: { higher: null, lower: null },
      discount: { higher: null, lower: null },
    });
  };

  useEffect(() => {
    fetchProducts(true);
  }, []);

  useEffect(() => {
    console.log(categoryData);

    updateProducts(fullProducts);
  }, [categoryData]);

  return {
    products,
    fetchProducts: () => {},
    searchProducts,
    handleCateogorizeData,
    setCategoryData,
    categorizedData,
    resetProducts,
  };
};

export default useProducts;
