import useRecommendedProducts from "../../hooks/useRecommendedProducts";
import ProductCard from "../ProductCard/ProductCard";
import "./RecommendedProducts.css";

export const RecommendedProducts = () => {
  const { recommendedProducts } = useRecommendedProducts();
  if (!recommendedProducts) return null;
  return (
    <div className="recommended-products">
      <h3>Products we think you might like</h3>
      <div className="recommended-list">
        {recommendedProducts?.map((data) => (
          <ProductCard data={data} />
        ))}
      </div>
    </div>
  );
};
