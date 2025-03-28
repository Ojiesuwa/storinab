import useSite from "../../hooks/useSite";
import ProductCard from "../ProductCard/ProductCard";
import "./TopSales.css";
const TopSales = () => {
  const { topSales } = useSite();
  return (
    <div className="today-deal top-sales">
      <div className="deal-title">
        <h3>Top Sales</h3>
      </div>
      <div className="deal-card-wrapper card-wrapper-full">
        {topSales.map((data) => (
          <ProductCard data={data} />
        ))}
      </div>
    </div>
  );
};

export default TopSales;
