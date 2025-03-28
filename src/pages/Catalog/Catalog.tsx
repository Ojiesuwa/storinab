import { ReactElement, useEffect, useRef, useState } from "react";
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Catalog.css";
import useProducts from "../../hooks/useProducts";
import LoadingBar from "../../components/LoadingBar/LoadingBar";

const Catalog = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const [isFilter, setIsFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const {
    fetchProducts,
    searchProducts,
    products,
    setCategoryData,
    resetProducts,
  } = useProducts(setIsLoading);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      if (!isSearched) {
      }
    }
  };

  return (
    <div className="catalog fade">
      <div
        className={
          "category-wrapper fade-right " +
          (isFilter ? "mobile-filter-active" : "mobile-filter-inactive")
        }
      >
        <CategoryComponent
          isVisible={isFilter}
          setIsVisible={setIsFilter}
          onCategoryChange={setCategoryData}
          onReset={resetProducts}
        />
      </div>
      <div className="all-products-wrapper w-full">
        <div className="search-container fade-down flex items-center gap-4">
          <i
            className="fa-light fa-bars-filter"
            onClick={() => setIsFilter(true)}
          ></i>
          <SearchBar
            onSearch={(key: string) => {
              searchProducts(key);
              setIsSearched(key !== "");
            }}
          />
        </div>
        {products?.length === 0 ? (
          <div className="no-product w-full h-full flex items-center justify-center flex-col gap-2">
            {/* <i className="fa-solid fa-xmark"></i> */}
            <h4>No Products Available</h4>
            <p>Please check back shortly</p>
          </div>
        ) : (
          <div
            className="catalog-list fade-up w-full"
            ref={divRef}
            onScroll={handleScroll}
          >
            {products?.map((data, index) => (
              <ProductCard data={data} key={index} />
            ))}
          </div>
        )}
      </div>
      <LoadingBar isVisible={isLoading} />
    </div>
  );
};

export default Catalog;
