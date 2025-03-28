import "./AvatarDropDown.css";
import useAuth from "../../hooks/useAuth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";

const AvatarDropDown: React.FC<{ isVisible: any; onHide: any }> = ({
  isVisible,
  onHide,
}) => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleDropdownClick = (e: React.MouseEvent<HTMLElement>) => {
    const text = e.currentTarget.querySelector("p")?.textContent;

    switch (text) {
      case "Signout":
        signout();
        onHide();
        return;
      case "My Account":
        navigate(routes.account.base);
        onHide();
        return;
      case "My Favourites":
        navigate(routes.favourite.base);
        onHide();
        return;
    }
  };

  return (
    <div
      className={
        "drop-down-wrapper " +
        (isVisible ? "drop-down-wrapper-active" : "drop-down-wrapper-inactive")
      }
      onClick={onHide}
    >
      <div className={"avatar-drop-down "} onClick={(e) => e.stopPropagation()}>
        <div className="drop-down-item" onClick={handleDropdownClick}>
          <i className="drop-down-icon fa-light fa-user"></i>
          <p className="drop-down-text">My Account</p>
        </div>
        <div className="drop-down-item" onClick={handleDropdownClick}>
          <i className="drop-down-icon fa-light fa-heart"></i>
          <p className="drop-down-text">My Favourites</p>
        </div>
        <div className="drop-down-item" onClick={handleDropdownClick}>
          <i className="drop-down-icon fa-light fa-shop"></i>
          <p className="drop-down-text">My Store</p>
        </div>
        <div className="signout-btn" onClick={handleDropdownClick}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <p>Signout</p>
        </div>
      </div>
    </div>
  );
};

export default AvatarDropDown;
