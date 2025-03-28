import { useNavigate } from "react-router-dom";
import useStores from "../../hooks/useStores";
import { StoreType } from "../../types/store_type";
import "./Stores.css";
import { routes } from "../../routes/routes";
const Stores = () => {
  const { stores } = useStores();
  const navigate = useNavigate();
  return (
    <div className="stores fade">
      <div className="header-wrapper">
        <h3>Stores</h3>
      </div>
      <div className="body-wrapper">
        {stores?.map((data: StoreType, index) => (
          <div
            className="store-item"
            key={index}
            onClick={() => navigate(routes.storeView.base + "/" + data.storeId)}
          >
            <div className="left-cont">
              <img
                src="https://th.bing.com/th/id/OIP.ZcjgKcmbTVYH5Xa9rpcgFgHaHa?rs=1&pid=ImgDetMain"
                alt=""
              />
              <div className="name-cont">
                <h4>{data?.name}</h4>
                <p>12k Followers</p>
              </div>
            </div>
            <div className="right-cont flex gap-3">
              <i className="fa-light fa-circle-plus"></i>
              <i className="fa-regular fa-arrow-right"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Stores;
