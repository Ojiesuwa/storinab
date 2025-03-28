import { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./StoreView.css";

const StoreView = () => {
  
  useEffect(() => {
    document.title = "Storinab - JUMJUM Store";
  }, []);

  return (
    <div className="store-view">
      <div className="banner-container fade-down">
        <img
          src="https://cdn.pixabay.com/photo/2016/04/22/15/55/boardinghouse-1346004_1280.jpg"
          alt=""
        />
        <div className="overlay"></div>
      </div>
      <div className="information-container fade-up">
        <div className="left-wrapper">
          <img
            src="https://cdn.pixabay.com/photo/2020/01/09/20/34/bmw-4753868_1280.jpg"
            alt=""
          />
          <div className="store-detail-wrapper">
            <h3 className="store-name">JUMJUM Store</h3>
            <div className="follower-wrapper">
              <i className="fa-solid fa-circle-plus"></i>
              <p className="store-follower">12 000 Followers</p>
            </div>
            <div className="contact-wrapper">
              <i className="fa-solid fa-envelope"></i>
              <p className="store-email">oluwarotimiadeola@gmail.com</p>
            </div>
            <button title="Follow store to get notifications">
              Follow <i className="fa-light fa-circle-plus"></i>{" "}
            </button>
          </div>
        </div>
        <div className="right-wrapper">
          <div className="stat-cont">
            <i className="fa-light fa-chart-simple"></i>
            <p>80 Sales</p>
          </div>
          <div className="stat-cont">
            <i className="fa-light fa-bag-shopping"></i>
            <p>200 Products</p>
          </div>
        </div>
      </div>
      <div className="product-container fade-up">
        <div className="top-sales-container">
          <div className="head-wrapper">
            <h3>Top Sales</h3>
          </div>
          <div className="product-container deal-card-wrapper">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
        <div className="all-product-container mt-5">
          <div className="head-wrapper">
            <h3>All Products</h3>
          </div>
          <div className="product-container deal-card-wrapper">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreView;
