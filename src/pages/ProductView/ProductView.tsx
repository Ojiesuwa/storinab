import { useEffect, useState } from "react";
import "./ProductView.css";
import ProductImageList from "../../components/ProductImageList/ProductImageList";
import StarReview from "../../components/StarReview/StarReview";
import ReviewCompoenent from "../../components/ReviewCompoenent/ReviewCompoenent";
import useProductView from "../../hooks/useProductView";
import { useParams } from "react-router-dom";
import { formatNumberWithSpaces } from "../../utils/formatNumber";
import useAccount from "../../hooks/useAccount";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const ProductView = () => {
  const [activeImage, setActiveImage] = useState("");
  const params = useParams();
  const { product, isLoading, refetch, addProductToCart } = useProductView(
    params?.productId || ""
  );
  const { isProductFavourited, handleFavouriteProduct, accountCart } =
    useAccount();
  const [selectedVariation, setSelectedVariation] = useState<any>({});
  const [quantity, setQuantity] = useState(1);

  const isInCart = accountCart?.some(
    (cart: any) => cart.productId === product?.productId
  );

  const handleAddToCart = (e: React.MouseEvent<HTMLElement>) => {
    addProductToCart(quantity, selectedVariation);
  };

  useEffect(() => {
    // Define the type for varationObj
    let varationObj: { [key: string]: any } = {};

    // Check if product and product.variants are defined
    if (product?.variants) {
      product.variants.forEach((element: any) => {
        // Add properties to varationObj dynamically
        if (element?.title) {
          varationObj[element.title] = element.default;
        }
      });

      // Update state
      setSelectedVariation(varationObj);
    }
  }, [product]); // Add product to the dependency array
  return (
    <div className="product-view">
      <div className="image-container">
        <div className="active-image-wrapper fade-right">
          <img src={activeImage || product?.images[0]} alt="" />
        </div>
        <div className="image-list-wrapper fade-up">
          <ProductImageList
            imageList={product?.images}
            setActiveImage={setActiveImage}
          />
        </div>
      </div>
      <div className="information-container fade-up">
        <h2>{product?.name}</h2>
        <div className="store-container">
          <i className="fa-light fa-shop"></i>
          <p>{product?.storeName}</p>

          <p className="brand-text">-{product?.brand} Brand</p>
        </div>
        <div className="review-container">
          <StarReview
            rating={
              product?.totalRating === 0 && product.totalRatingCount === 0
                ? 0
                : (product?.totalRating || 1) / (product?.totalRatingCount || 1)
            }
          />
          <p>
            {(
              (product?.totalRating || 1) / (product?.totalRatingCount || 1)
            ).toFixed(1)}{" "}
            ({product?.totalRatingCount} Reviews)
          </p>
        </div>
        <div className="price-container">
          <div className="new-price">
            N{formatNumberWithSpaces(product?.price)}
          </div>
          {product?.oldPrice && (
            <div className="old-price">
              N{formatNumberWithSpaces(product?.oldPrice)}
            </div>
          )}
          <div className="discount">-{product?.discount}%</div>
        </div>
        <div className="description-container">
          <p>{product?.description}</p>
        </div>
        <div className="variation-container">
          {product?.variants?.map((data: any) => (
            <div className="variation-item">
              <h4 className="variation-title">{data?.title}</h4>
              <div className="variation-wrapper">
                {data.values.map((value: string) => (
                  <p
                    className={
                      selectedVariation[data?.title] === value
                        ? "value-select"
                        : ""
                    }
                    onClick={() =>
                      setSelectedVariation((p: any) => ({
                        ...p,
                        [data?.title]: value,
                      }))
                    }
                  >
                    {value}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="variation-item">
            <h4 className="variation-title">Quantity</h4>
            <div className="flex items-center gap-4">
              <div className="quantity-wrapper">
                <i
                  className="fa-light fa-minus"
                  onClick={() => setQuantity((p) => (p === 1 ? 1 : p - 1))}
                ></i>
                <p>{quantity}</p>
                <i
                  className="fa-light fa-plus"
                  onClick={() =>
                    setQuantity((p) =>
                      p >= (product?.stockQuantity as number) ? p : p + 1
                    )
                  }
                ></i>
              </div>
              <h5>{product?.stockQuantity} Stocks left</h5>
            </div>
          </div>
        </div>
        <div className="action-container">
          {isInCart ? (
            <button className="cart-btn button-blue" onClick={handleAddToCart}>
              Update Cart <i className="fa-light fa-pen"></i>
            </button>
          ) : (
            <button className="cart-btn" onClick={handleAddToCart}>
              Add to Cart <i className="fa-light fa-shopping-cart"></i>
            </button>
          )}

          <div
            className="heart-btn"
            onClick={() => handleFavouriteProduct(product?.productId as string)}
          >
            {isProductFavourited(product?.productId as string) ? (
              <i className="fa-solid fa-heart red"></i>
            ) : (
              <i className="fa-light fa-heart"></i>
            )}
          </div>
        </div>
        <div className="make-review-container"></div>
        <ReviewCompoenent
          productId={product?.productId || ""}
          onRefreshProductView={refetch}
        />
      </div>
      <LoadingScreen isVisible={isLoading} />
    </div>
  );
};

export default ProductView;
