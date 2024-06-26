import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import delImgUrl from "../assets/images/shop/del.png";
import CheckoutPage from "./CheckoutPage";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  //   caculate price
  const caculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  //   handle quantity inscrease

  const handleIncrease = (item) => {
    item.quantity += 1;
    setCartItems([...cartItems]);

    // update local storage with new cart items
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  //   handle quantity inscrease
  const handleDescrease = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartItems([...cartItems]);

      // update local storage with new cart items
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  //   handle remove item
  const handleRemoveItems = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);

    // update new cart
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const updateLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const cartSubTotal = cartItems.reduce((total, item) => {
    return total + caculateTotalPrice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  const getCountry = () => {
    return document.getElementById("country").value;
  };
  const getCity = () => {
    return document.getElementById("city").value;
  };

  const [country, setCountry] = useState("United Kingdom (UK)");
  const [city, setCity] = useState("New York");

  const address = {
    country: country,
    city: city,
  };

  return (
    <div>
      <PageHeader title={"Shop Cart"} curPage={"Cart Page"} />

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
                    <th className="cat-edit">Edit</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item, index) => (
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
                      <td className="cat-quantity">
                        <div className="cart-plus-minus">
                          <div
                            className="dec qtybutton"
                            onClick={() => handleDescrease(item)}
                          >
                            -
                          </div>
                          <input
                            type="text"
                            className="cart-plus-minus-box"
                            name="qtybutton"
                            value={item.quantity}
                          />
                          <div
                            className="inc qtybutton"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </div>
                        </div>
                      </td>

                      <td className="cat-toprice">
                        ${caculateTotalPrice(item)}
                      </td>
                      <td className="cat-edit">
                        <a href="" onClick={() => handleRemoveItems(item)}>
                          <img src={delImgUrl} alt="" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-bottom">
              <div className="cart-checkout-box">
                <form action="" className="coupon">
                  <input
                    type="text"
                    name="coupon"
                    id="coupon"
                    placeholder="Coupon code ..."
                    className="cart-page-input-text"
                  />
                  <input type="submit" value="Apply Coupon" />
                </form>

                <form action="" className="cart-checkout">
                  <div>
                    <CheckoutPage address={address} total={orderTotal} />
                  </div>
                </form>
              </div>

              <div className="shiping-box">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="calculate-shiping">
                      <h3>Address Shipping</h3>
                      <div className="outline-select">
                        <select
                          id="country"
                          name="country"
                          onChange={() => setCountry(getCountry())}
                        >
                          <option value="United Kingdom (UK)">
                            United Kingdom (UK)
                          </option>
                          <option value="Bangladesh">Bangladesh </option>
                          <option value="Pakisthan">Pakisthan</option>
                          <option value="India">India</option>
                          <option value="Nepal">Nepal</option>
                        </select>
                        <span className="select-icon">
                          <i className="icofont-rounded-down"></i>
                        </span>
                      </div>

                      <div className="outline-select shipping-select">
                        <select
                          id="city"
                          name="city"
                          onChange={() => setCity(getCity())}
                        >
                          <option value="New York">New York</option>
                          <option value="London">London</option>
                          <option value="Dhaka">Dhaka</option>
                          <option value="Korachi">Korachi</option>
                          <option value="New Dilh">New Dilh</option>
                        </select>
                        <span className="select-icon">
                          <i className="icofont-rounded-down"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="cart-overview">
                      <h3>Cart Totals</h3>
                      <ul className="lab-ul">
                        <li>
                          <span className="pull-left">Cart SubTotal</span>
                          <p className="pull-right">${cartSubTotal}</p>
                        </li>
                        <li>
                          <span className="pull-left">
                            Shipping and Handling
                          </span>
                          <p className="pull-right">Free Shipping</p>
                        </li>
                        <li>
                          <span className="pull-left">OrderTotal</span>
                          <p className="pull-right">${orderTotal.toFixed(2)}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
