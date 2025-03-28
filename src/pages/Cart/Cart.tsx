import React, { useState } from "react";
import { RecommendedProducts } from "../../components/RecommendedProducts/RecommendedProducts";
import "./Cart.css";
import { CartType } from "../../types/cart_type";
import useAuth from "../../hooks/useAuth";
import useAccount from "../../hooks/useAccount";
import { formatNumberWithSpaces } from "../../utils/formatNumber";

const Cart = () => {
  const { accountDetail } = useAuth();
  const { accountCart, incrementUsersCart, deleteAccountCart } = useAccount();
  const workingCart = accountCart;
  return (
    <div className="cart">
      <div className="left-wrapper  fade-right">
        <h3 className="mt-2 mb-2">Cart</h3>
        {workingCart.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            {" "}
            <p>No Cart Present</p>
          </div>
        ) : (
          <div className="cart-container">
            {workingCart.map((data) => (
              <CartItem
                data={data}
                incrementUsersCart={incrementUsersCart}
                deleteAccountCart={deleteAccountCart}
              />
            ))}
          </div>
        )}

        <RecommendedProducts />
        <div className="recommended-container"></div>
      </div>
      <div className="right-wrapper fade-down">
        <CheckoutContainer data={accountCart} />
      </div>
      <MobileCheckoutContainer />
    </div>
  );
};

export default Cart;

const MobileCheckoutContainer = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className={
        "mobile-checkout-container fade-up " +
        (isVisible ? "active-mobile-checkout" : "inactive-mobile-checkout")
      }
    >
      <div className="header-wrapper" onClick={() => setIsVisible((p) => !p)}>
        <h3>Checkout (N20, 000) </h3>
        <i
          className={
            isVisible ? "fa-light fa-chevron-down" : "fa-light fa-chevron-up"
          }
        ></i>
      </div>
      <div className="line"></div>

      <div className="checkout-item-wrapper">
        <div className="checkout-item">
          <p className="title">Total Item</p>
          <p className="value">20 Items</p>
        </div>
        <div className="checkout-item">
          <p className="title">Total Price</p>
          <p className="value">N100, 000</p>
        </div>
      </div>
      <button>
        Checkout <i className="fa-light fa-credit-card"></i>
      </button>
    </div>
  );
};

const CheckoutContainer: React.FC<{ data: CartType[] }> = ({ data }) => {
  const calculateTotalPrice = () => {
    data = data || [];
    if (data.length === 0) return 0;

    const price = data.map((cartItem) => cartItem?.quantity * cartItem.price);

    return price.reduce(
      (cummulator: number, current: number) => cummulator + current
    );
  };
  return (
    <div className="checkout-container">
      <h3>Checkout</h3>
      <div className="line"></div>

      <div className="checkout-item">
        <p className="title">Total Item</p>
        <p className="value">{data?.length} Items</p>
      </div>
      <div className="checkout-item">
        <p className="title">Total Price</p>
        <p className="value">
          N{formatNumberWithSpaces(calculateTotalPrice() as any)}
        </p>
      </div>
      <div className="line"></div>
      <button>
        Checkout <i className="fa-light fa-credit-card"></i>
      </button>
    </div>
  );
};

const CartItem: React.FC<{
  data?: CartType;
  incrementUsersCart: any;
  deleteAccountCart: any;
}> = ({ data, incrementUsersCart, deleteAccountCart }) => {
  const convertVariationToArray = () => {
    const keys = Object.keys(data?.variation);
    return keys.map((key: string) => ({
      title: key,
      value: data?.variation[key],
    }));
  };

  return (
    <div className="cart-item">
      <div className="image-container">
        <img src={data?.cartImage} alt="" />
      </div>
      <div className="name-container">
        <div className="product-name-wrapper">
          <p className="product-name" title={data?.productName}>
            {" "}
            {data?.productName}
          </p>
          <div className="var-box">
            {convertVariationToArray().map((value) => (
              <p>
                <b>{value.title}</b> : {value.value}
              </p>
            ))}
          </div>
        </div>
        <div className="product-store-wrapper">
          <i className="fa-light fa-shop"></i>
          <p>{data?.storeName}</p>
        </div>
        <div className="store-name"></div>
      </div>
      <div className="quantity-container">
        <p className="product-price">
          <b>Cost</b>: N {formatNumberWithSpaces(data?.price)}
        </p>
        <div className="variation-item">
          <div className="flex items-center gap-4">
            <div className="quantity-wrapper">
              <i
                className="fa-light fa-minus"
                onClick={() => {
                  if ((data?.quantity || 1) <= 1) {
                    return;
                  }
                  incrementUsersCart(data?.productId, false);
                }}
              ></i>
              <p>{data?.quantity}</p>
              <i
                className="fa-light fa-plus"
                onClick={() => incrementUsersCart(data?.productId, true)}
              ></i>
            </div>
          </div>
        </div>
        <div className="price-wrapper">
          <p className="total-price-per-cart">
            <b>Total</b> : N
            {formatNumberWithSpaces((data?.price || 0) * (data?.quantity || 0))}
          </p>
        </div>
      </div>
      <div className="action-container">
        <button
          className="mobile-del"
          onClick={() => deleteAccountCart(data?.productId)}
        >
          Delete Item <i className="fa-light fa-trash"></i>
        </button>
        <i
          className="fa-light fa-trash desktop-del"
          onClick={() => deleteAccountCart(data?.productId)}
        ></i>
      </div>
    </div>
  );
};
