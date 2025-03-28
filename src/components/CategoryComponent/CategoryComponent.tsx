import { useState } from "react";
import useSite from "../../hooks/useSite";
import { capitalizeFirstLetter } from "../../utils/formatText";
import "./CategoryComponent.css";
import { CategoryType } from "../../types/category_type";
import { useLocation } from "react-router-dom";

const CategoryComponent: React.FC<{
  isVisible: boolean;
  setIsVisible: any;
  onCategoryChange?: any;
  onReset?: any;
}> = ({ setIsVisible, onCategoryChange, onReset }) => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const { siteCategories, siteBrands, siteStores } = useSite();
  const [categoryData, setCategoryData] = useState<CategoryType>({
    brand: "",
    category: queryParams.get("category") || "",
    store: "",
    price: { higher: null, lower: null },
    discount: { higher: null, lower: null },
  });

  const handleInput = (value: string, max: number, min: number) => {
    function isStrictNumber(str: string) {
      return /^-?\d*\.?\d*$/.test(str); // Allows numbers with optional decimals
    }

    // Remove invalid characters while preserving number format
    const filteredString = value
      .split("")
      .filter((char) => isStrictNumber(char))
      .join("");

    const num = parseFloat(filteredString);

    // Ensure it's a valid number
    if (!isNaN(num)) {
      if (num > max) return max.toString(); // Return max if beyond max
      if (num < min) return min.toString(); // Return min if below min
      return num.toString(); // Return valid number
    }

    return "";
  };

  return (
    <div className={"category-component "}>
      <div className="flex items-center justify-between">
        <h3>Filter Catalog</h3>
        <div>
          <i
            className="fa-light fa-arrow-rotate-left"
            onClick={() => {
              setCategoryData({
                brand: "",
                category: "",
                store: "",
                price: { higher: null, lower: null },
                discount: { higher: null, lower: null },
              });
              onReset();
            }}
          ></i>
          <i
            className="fa-light fa-xmark"
            onClick={() => setIsVisible(false)}
          ></i>
        </div>
      </div>
      <div className="filter-container">
        <div className="filter-wrapper">
          <p className="b-cat">Category</p>
          <select
            name=""
            id=""
            onChange={(e) =>
              setCategoryData((p) => {
                onCategoryChange({ ...p, category: e.target.value });
                return { ...p, category: e.target.value };
              })
            }
            value={categoryData.category}
          >
            <option value="">All Category</option>
            {siteCategories.map((data) => (
              <option value={data}>{capitalizeFirstLetter(data)}</option>
            ))}
          </select>
        </div>
        <div className="filter-wrapper">
          <p className="b-cat">Store</p>
          <select
            name=""
            id=""
            onChange={(e) =>
              setCategoryData((p) => {
                onCategoryChange({ ...p, store: e.target.value });
                return { ...p, store: e.target.value };
              })
            }
            value={categoryData.store}
          >
            <option value="">All Stores</option>
            {siteStores.map((data) => (
              <option value={data}>{capitalizeFirstLetter(data)}</option>
            ))}
          </select>
        </div>
        <div className="filter-wrapper">
          <p className="b-cat">Brands</p>
          <select
            name=""
            id=""
            onChange={(e) =>
              setCategoryData((p) => {
                onCategoryChange({ ...p, brand: e.target.value });
                return { ...p, brand: e.target.value };
              })
            }
            value={categoryData.brand}
          >
            <option value="">All Brands</option>
            {siteBrands.map((data) => (
              <option value={data}>{capitalizeFirstLetter(data)}</option>
            ))}
          </select>
        </div>
        <div className="filter-wrapper">
          <p className="b-cat">Price range</p>
          <p className="small-text">Select a price range</p>
          <div
            className="p-range-wrapper
          "
          >
            <input
              type="text"
              placeholder="N0.00"
              onChange={(e) =>
                setCategoryData((p) => ({
                  ...p,
                  price: {
                    ...p.price,
                    lower: parseInt(handleInput(e.target.value, Infinity, 0)),
                  },
                }))
              }
              value={categoryData.price.lower || 0}
            />
            <p className="small-text">to</p>
            <input
              type="text"
              placeholder="N20, 000"
              onChange={(e) =>
                setCategoryData((p) => ({
                  ...p,
                  price: { ...p.price, higher: parseInt(e.target.value) },
                }))
              }
              value={categoryData.price.higher || 0}
            />
          </div>
        </div>
        <div className="filter-wrapper">
          <p className="b-cat">Discount range</p>
          <p className="small-text">Select a discount range</p>
          <div
            className="p-range-wrapper
          "
          >
            <input
              type="text"
              placeholder="0%"
              onChange={(e) =>
                setCategoryData((p) => ({
                  ...p,
                  discount: {
                    ...p.discount,
                    lower: parseInt(handleInput(e.target.value, 90, 0)),
                  },
                }))
              }
              value={categoryData.discount.lower || 0}
            />
            <p className="small-text">to</p>
            <input
              type="text"
              placeholder="100%"
              onChange={(e) =>
                setCategoryData((p) => ({
                  ...p,
                  discount: {
                    ...p.discount,
                    higher: parseInt(handleInput(e.target.value, 100, 0)),
                  },
                }))
              }
              value={categoryData.discount.higher || 0}
              max={100}
            />
          </div>
        </div>
        <button
          className="button-blue"
          onClick={() => onCategoryChange(categoryData)}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default CategoryComponent;
