import Logo from "../Logo/Logo";
import "./Header.css";
import UnknownImage from "../../assets/unknown.jpg";
import useAuth from "../../hooks/useAuth";
import Sidebar from "../Sidebar/Sidebar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import AvatarDropDown from "../AvatarDropDown/AvatarDropDown";

const Header = () => {
  const { accountDetail, setIsAuthVisible, userCredential } = useAuth();
  const navigate = useNavigate();
  console.log(accountDetail);

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  console.log(isDropDownVisible);

  const handleAvatarClick = () => {
    if (userCredential === null) {
      setIsAuthVisible(true);
    } else if (!isDropDownVisible) {
      setIsDropDownVisible(true);
    }
  };

  const handleHeaderNavigate = (e: React.MouseEvent<HTMLDivElement>) => {
    const text = e.currentTarget.querySelector("p")?.textContent;

    switch (text) {
      case "Cart":
        navigate(routes.cart.base);
        return;

      case "Favourite":
        navigate(routes.favourite.base);
        return;

      case "Search":
        navigate(routes.catalog.base);
        return;

      default:
        return;
    }
  };

  // const run = async () => {
  //   try {
  //     const stores: StoreType[] | any = await getCollectionByName("Store");
  //     stores.forEach(async (element: StoreType) => {
  //       const payload: StoreType = {
  //         storeId: element.storeId,
  //         ownerId: accountDetail?.accountId || "",
  //         name: element.name,
  //         description: `This store belongs to ${element.name}`,
  //         logoURL:
  //           "https://cdn.pixabay.com/photo/2020/01/09/20/34/bmw-4753868_1280.jpg",
  //         bannerURL:
  //           "https://cdn.pixabay.com/photo/2016/04/22/15/55/boardinghouse-1346004_1280.jpg",
  //         category: [],
  //         tags: [],
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         isActive: true,
  //         email: accountDetail?.email || "",
  //         phone: "",
  //         socialLink: [],
  //         shippingCost: 1000,
  //         returnPolicy: `At ${element.name}, we want you to be completely satisfied with your purchase. If you are not, you may request a return within 5 days, provided the item is unused, in its original packaging, and in resalable condition. Certain items, such as digital products, personalized goods, or final sale items, are non-returnable. Once we receive and inspect the returned item, we will process a refund to your original payment method within 5 business days, though shipping costs may be non-refundable. If you received a defective or incorrect item, we offer exchanges at no additional cost. To initiate a return, please contact our customer support team at ${accountDetail?.email} with your order details.`,
  //         totalSales: Math.round(Math.random() * 20),
  //         totalOrders: Math.round(Math.random() * 30),
  //         totalProducts: Math.round(Math.random() * 20),

  //         followers: 10,
  //       };

  //       await updateDocumentById("Store", element.storeId, { payload });
  //     });
  //     toast.success("Successful");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Error bruteforcing");
  //   }
  // };

  return (
    <div className="header fade-down">
      <div className="left-wing flex items-center gap-3">
        <i
          className="fa-light fa-bars"
          onClick={() => setIsSidebarVisible(true)}
        ></i>
        <Logo />
      </div>
      <div className="right-wing">
        <div className="header-item search-item" onClick={handleHeaderNavigate}>
          <i className="fa-light fa-search"></i>
          <p>Search</p>
        </div>
        <div
          className="header-item favourite-item"
          onClick={handleHeaderNavigate}
        >
          <i className="fa-light fa-heart"></i>
          <p>Favourite</p>
        </div>
        <div
          className="header-item notification-item"
          onClick={handleHeaderNavigate}
        >
          <i className="fa-light fa-bell"></i>
          <p>Notification</p>
        </div>
        <div className="header-item cart-item " onClick={handleHeaderNavigate}>
          <div className="relative">
            <i className="fa-light fa-shopping-cart"></i>
            <div className="cart-count">{accountDetail?.cart?.length || 0}</div>
          </div>
          <p>Cart</p>
        </div>
        <div className="avatar-cont relative" onClick={handleAvatarClick}>
          <img
            src={accountDetail?.profileImage || UnknownImage}
            alt=""
            className="account-avatar"
          />
          <AvatarDropDown
            isVisible={isDropDownVisible}
            onHide={() => setIsDropDownVisible(false)}
          />
        </div>
      </div>
      <Sidebar
        isVisible={isSidebarVisible}
        onHide={() => setIsSidebarVisible(false)}
      />
    </div>
  );
};

export default Header;
