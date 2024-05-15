import { useState, useEffect, useCallback } from "react";
import AxiosInstance from "../api/AxiosInstance";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const OrderDetail = () => {
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadedProductIds, setLoadedProductIds] = useState(new Set());
  let { id } = useParams();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await AxiosInstance.get(`order/${id}/`);
      if (response.status === 200) {
        setOrder(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchProducts = useCallback(async () => {
    if (order && order.order_details) {
      const newProducts = [];

      for (const item of order.order_details) {
        if (!loadedProductIds.has(item.id)) {
          try {
            const response = await AxiosInstance.get(
              `product/${item.product}/`
            );
            if (response.status === 200) {
              newProducts.push(response.data);
              newProducts[newProducts.length - 1].quantity =
                item.product_quantity;
              newProducts[newProducts.length - 1].price = item.product_price;
              loadedProductIds.add(item.id);
              console.log("loadedProductIds", loadedProductIds);
            }
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        }
      }

      if (newProducts.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      }
    }
  }, [order, loadedProductIds]);

  useEffect(() => {
    fetchProducts();
  }, [order, fetchProducts]);

  console.log(products);

  return (
    <div>
      <PageHeader title={"Order Detail"} curPage={"Order Detail Page"} />

      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Product</th>
                    <th className="cat-price">Price</th>
                    <th className="cat-quantity">Quantity</th>
                    <th className="cat-toprice">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((item, index) => (
                    <tr key={index}>
                      <td className="product-item cat-product">
                        <div className="p-thumb">
                          <Link to={`/shop/${item.id}`}>
                            <img src={item.image} alt="" />
                          </Link>
                        </div>
                        <div className="p-content">
                          <Link to={`/shop/${item.id}`}>{item.title}</Link>
                        </div>
                      </td>

                      <td className="cat-price">${item.price}</td>
                      <td className="cat-price" style={{ paddingLeft: 220 }}>
                        {item.quantity}
                      </td>
                      {/* <td className="cat-quantity">
                        <div className="cart-plus-minus">{item.quantity}</div>
                      </td> */}

                      <td className="cat-toprice">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetail;
