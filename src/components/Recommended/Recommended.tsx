import useSite from "../../hooks/useSite";
import ProductCard from "../ProductCard/ProductCard";
import "./Recommended.css";
const Recommended = () => {
  const { recommended } = useSite();

  if (!recommended) return null;
  return (
    <div className="recommended">
      <div className="title">
        <h3>Recommended Products</h3>
      </div>
      <div className="list">
        {recommended.map((data) => (
          <ProductCard data={data} />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
