import { useEffect, useState } from "react";
import ProductData from "../utilis/productData";

const ShopCategory = ({
  filterItems,
  setItems,
  menuItems,
  setProducts,
  selectedCategory,
}) => {
  const products = ProductData();
  const [Data, setData] = useState(products);
  useEffect(() => {
    setData(Data);
  }, [Data]);
  return (
    <>
      <div className="widget-header">
        <h5 className="ms-2"> All Categories</h5>
      </div>
      <div>
        <button
          className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`}
          onClick={() => setProducts(products)}
        >
          All
        </button>
        {menuItems.map((item, index) => {
          return (
            <button
              key={index}
              className={`m-2 ${selectedCategory === item ? "bg-warning" : ""}`}
              onClick={() => filterItems(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ShopCategory;
