import { useState, useEffect } from "react";
import AxiosInstance from "../api/AxiosInstance";

const ProductData = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await AxiosInstance.get("product/");
      if (response.status === 200) {
        setProducts(response.data); // Gán dữ liệu nhận được từ API vào mảng products
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return products;
};

export default ProductData;
