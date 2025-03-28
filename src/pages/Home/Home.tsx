import Recommended from "../../components/Recommended/Recommended";
import TodayDeal from "../../components/TodayDeal/TodayDeal";
import TopSales from "../../components/TopSales/TopSales";
import VerifiedStore from "../../components/VerifiedStore/VerifiedStore";
import "./Home.css";
import AdVideo from "../../assets/Cinematic Shoe Commercial _ Adidas Yeezy _ Spec Ad.mp4";
import useSite from "../../hooks/useSite";
import { capitalizeFirstLetter } from "../../utils/formatText";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
const Home = () => {
  const { siteCategories } = useSite();
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="home-category-wrapper fade-down">
        {siteCategories.map((data) => (
          <p
            onClick={() =>
              navigate(routes.catalog.base + "?" + `category=${data}`)
            }
          >
            {capitalizeFirstLetter(data)}
          </p>
        ))}
      </div>
      <div className="site-ad fade-up">
        <video
          // src="https://img.freepik.com/premium-vector/coffee-banner-ads-with-illustratin-latte-woodcut-style-decorations-kraft-paper-background_281653-538.jpg?w=1480"
          src={AdVideo}
          autoPlay
          muted
          loop
          className="home-ad-image"
        ></video>
      </div>
      <div className="today-deal-wrapper fade-up">
        <TodayDeal />
      </div>
      <div className="verified-store-wrapper">
        <VerifiedStore />
      </div>
      <div className="recommended-wrapper">
        <Recommended />
      </div>
      <div className="top-sales-wrapper">
        <TopSales />
      </div>
    </div>
  );
};

export default Home;
