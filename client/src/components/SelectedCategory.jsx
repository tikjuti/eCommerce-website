import { useState, useEffect, useContext } from "react";
import AxiosInstance from "../api/AxiosInstance";
import { AuthContext } from "../contexts/AuthProvider";

const SelectedCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategorys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategorys = async () => {
    const response = await AxiosInstance.get("product/category/");

    if (response.status === 200) {
      setCategories(response.data);
    }
  };

  return (
    <select>
      {categories &&
        categories.map((cat, index) => (
          <option key={index} value={cat.title}>
            {cat.title}
          </option>
        ))}
    </select>
  );
};

export default SelectedCategory;
