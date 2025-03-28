import { useEffect, useState } from "react";
import "./ProductImageList.css";
const ProductImageList: React.FC<{
  imageList: string[] | undefined | null;
  setActiveImage: any;
}> = ({ imageList, setActiveImage }) => {
  const [localActive, setLocalActive] = useState(imageList?.[0]);
  useEffect(() => {
    setActiveImage(imageList?.[0]);
  }, [imageList]);
  useEffect(() => {
    setActiveImage(localActive);
  }, [localActive, imageList]);
  return (
    <div className="product-image-list">
      {imageList?.map((url) => (
        <img
          src={url}
          className={localActive === url ? "current-active-image" : ""}
          onClick={() => setLocalActive(url)}
        />
      ))}
    </div>
  );
};

export default ProductImageList;
