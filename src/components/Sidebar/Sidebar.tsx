import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { routes } from "../../routes/routes";
import { useEffect } from "react";
const Sidebar: React.FC<{ isVisible: boolean; onHide: any }> = ({
  isVisible,
  onHide,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = (e: React.MouseEvent<HTMLDivElement>) => {
    const text = e.currentTarget.querySelector("p")?.textContent;
    switch (text) {
      case "Home":
        navigate(routes.home.base);
        onHide();
        break;
      case "Cart":
        navigate(routes.cart.base);
        onHide();
        break;
      case "Favourites":
        navigate(routes.favourite.base);
        onHide();
        break;
      case "Stores":
        navigate(routes.stores.base);
        onHide();
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    onHide();
  }, [location]);

  return (
    <div
      className="sidebar-wrapper-2"
      style={{ left: isVisible ? "0" : "-100%" }}
      onClick={onHide}
    >
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-control">
          <i className="fa-light fa-xmark" onClick={onHide}></i>
        </div>
        <div className="sidebar-list">
          <div className="sidebar-wrapper">
            <h4 className="sidebar-wrapper-title">Navigations</h4>
            <div className="sidebar-item" onClick={handleNavigate}>
              <p>Home</p>
              <i className="fa-light fa-chevron-right"></i>
            </div>
            <div className="sidebar-item" onClick={handleNavigate}>
              <p>Cart</p>
              <i className="fa-light fa-chevron-right"></i>
            </div>
            <div className="sidebar-item" onClick={handleNavigate}>
              <p>Order</p>
              <i className="fa-light fa-chevron-right"></i>
            </div>
            <div className="sidebar-item" onClick={handleNavigate}>
              <p>Favourites</p>
              <i className="fa-light fa-chevron-right"></i>
            </div>
            <div className="sidebar-item" onClick={handleNavigate}>
              <p>Stores</p>
              <i className="fa-light fa-chevron-right"></i>
            </div>
          </div>
          <div className="sidebar-wrapper">
            <h4 className="sidebar-wrapper-title">Stores</h4>
            <div className="sidebar-item" onClick={handleNavigate}>
              <p>Store Dashboard</p>
              <i className="fa-light fa-chevron-right"></i>
            </div>
            <div className="sidebar-item" onClick={handleNavigate}>
              <p>JUMJUM Stores</p>
              <i className="fa-light fa-chevron-right"></i>
            </div>
            <div className="sidebar-item">
              <p>Confetti Stores</p>
              <i className="fa-light fa-chevron-right"></i>
            </div>
          </div>
          <div className="sidebar-wrapper">
            <h4 className="sidebar-wrapper-title">Admin</h4>
            <div className="sidebar-item">
              <p>Dashboard</p>
              <i className="fa-light fa-chevron-right"></i>
            </div>
            <div className="sidebar-item">
              <p>Store Management</p>
              <i className="fa-light fa-chevron-right"></i>
            </div>
            <div className="sidebar-item">
              <p>Product Management</p>
              <i className="fa-light fa-chevron-right"></i>
            </div>
            <div className="sidebar-item">
              <p>Account Management</p>
              <i className="fa-light fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
