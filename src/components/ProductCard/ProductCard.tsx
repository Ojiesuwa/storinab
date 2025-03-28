import { useNavigate } from "react-router-dom";
import StarReview from "../StarReview/StarReview";
import "./ProductCard.css";
import { routes } from "../../routes/routes";
import { ProductType } from "../../types/product_type";
import { formatNumberWithSpaces } from "../../utils/formatNumber";
import useAccount from "../../hooks/useAccount";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useProductView from "../../hooks/useProductView";

const ProductCard: React.FC<{
  data?: ProductType;
  handleUnFavorite?: any;
  isFavouritePage?: () => {};
}> = ({ data, handleUnFavorite }) => {
  const navigate = useNavigate();
  const { handleFavouriteProduct, isProductFavourited } = useAccount();
  const { accountDetail } = useAuth();
  const [isFavourited, setIsFavourited] = useState(false);
  const [reset, setReset] = useState(false);
  const { addProductToCart } = useProductView(data?.productId || "");

  const isInCart = accountDetail?.cart?.some(
    (cart: any) => cart.productId === data?.productId
  );

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addProductToCart();
  };

  useEffect(() => {
    setIsFavourited(isProductFavourited(data?.productId));
  }, [reset, isProductFavourited]);

  return (
    <div
      className="product-card"
      onClick={() => navigate(routes.productView.base + "/" + data?.productId)}
    >
      <img src={data?.images[0]} alt="" className="card-image" />
      <div className="info-wrapper">
        <h4>{data?.name}</h4>
        <div className="store-name">
          <i className="fa-light fa-shop"></i>
          <p>{data?.storeName}</p>
        </div>
        <div className="price-wrapper">
          <div className="new-price">
            N{formatNumberWithSpaces(data?.price)}
          </div>
          {data?.oldPrice && (
            <div className="old-price">
              N{formatNumberWithSpaces(data?.oldPrice)}
            </div>
          )}
        </div>
        <StarReview
          rating={(data?.totalRating || 1) / (data?.totalRatingCount || 1)}
        />
      </div>
      {isInCart ? (
        <button
          className="added-to-cart"
          onClick={(e) => {
            e.stopPropagation();
            navigate(routes.cart.base);
          }}
        >
          Added to Cart <i className="fa-light fa-check button-blue"></i>{" "}
        </button>
      ) : (
        <button onClick={handleAddToCart}>
          Add to Cart <i className="fa-light fa-shopping-cart"></i>
        </button>
      )}
      <div
        className="heart-product"
        onClick={(e) => {
          e.stopPropagation();
          console.log(typeof handleUnFavorite);

          handleFavouriteProduct(data?.productId || "");
          if (typeof handleUnFavorite !== "undefined") {
            handleUnFavorite();
          }

          setReset((p) => !p);
        }}
      >
        {isFavourited ? (
          <i className="fa-solid fa-heart"></i>
        ) : (
          <i className="fa-light fa-heart"></i>
        )}
      </div>
      <div className="discount-wrapper">
        <p>-{data?.discount}%</p>
      </div>
    </div>
  );
};

export default ProductCard;
