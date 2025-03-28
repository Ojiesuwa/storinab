import useSite from "../../hooks/useSite";
import ProductCard from "../ProductCard/ProductCard";
import "./TodayDeal.css";

const TodayDeal = () => {
  const { todaysDeal } = useSite();
  return (
    <div className="today-deal">
      <div className="deal-title">
        <h3>Today's Deal</h3>
      </div>
      <div className="deal-card-wrapper">
        {todaysDeal.map((data) => (
          <ProductCard data={data} />
        ))}
      </div>
    </div>
  );
};

export default TodayDeal;
