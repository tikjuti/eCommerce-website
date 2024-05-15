import { useState, useEffect } from "react";
import AxiosInstance from "../api/AxiosInstance";
import PageHeader from "../components/PageHeader";
import delImgUrl from "../assets/images/shop/del.png";
import OrderDetail from "./OrderDetail";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await AxiosInstance.get("order/");
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <PageHeader title={"Order"} curPage={"Order Page"} />

      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Total</th>
                    <th className="cat-price">Country</th>
                    <th className="cat-quantity">City</th>
                    <th className="cat-toprice">Date</th>
                    <th className="cat-edit">Status</th>
                    <th className="cat-edit">Action</th>
                    <th className="cat-edit">Detail</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((item, index) => (
                    <tr key={index}>
                      <td className="product-item cat-product">
                        <div className="p-content">${item.total_price}</div>
                      </td>
                      <td className="cat-price">
                        <div className="p-content">{item.country}</div>
                      </td>

                      <td className="cat-price">
                        <div className="p-content">{item.city}</div>
                      </td>
                      <td className="cat-price">
                        <div className="p-content">
                          {item.order_date.split("T")[0]}
                        </div>
                      </td>
                      <td className="cat-toprice">
                        {item.order_status == false ? "Pending" : "Completed"}
                      </td>
                      {item.order_status != false ? (
                        <td className="cat-edit">
                          <span>No action</span>
                        </td>
                      ) : (
                        <td className="cat-edit">
                          <a href="">
                            <img src={delImgUrl} alt="" />
                          </a>
                        </td>
                      )}
                      <td className="cat-price">
                        <div className="p-content">
                          <a
                            href={`/order/${item.id}`}
                            className="icofont-rounded-down"
                          ></a>
                        </div>
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
export default Order;
