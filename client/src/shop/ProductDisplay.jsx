import { useState } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const desc = "lorem ipsum dolor sit amet, consectetur adipiscing elit. ";

const ProductDisplay = ({ item }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { title, id, price, seller, ratings_count, image } = item;
  const [prevQuantity, setPrevQuantity] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [size, setSize] = useState("Select Size");
  const [color, setColor] = useState("Select Color");

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleDecrease = () => {
    if (prevQuantity > 1) setPrevQuantity((prevQuantity) => prevQuantity - 1);
  };
  const handleIncrease = () => {
    setPrevQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      id: id,
      image: image,
      title: title,
      price: price,
      quantity: prevQuantity,
      size: size,
      color: color,
      coupon: coupon,
    };

    const exitingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const exitingProductIndex = exitingCart.findIndex((item) => item.id === id);

    if (exitingProductIndex !== -1) {
      exitingCart[exitingProductIndex].quantity += prevQuantity;
    } else {
      exitingCart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(exitingCart));
    setPrevQuantity(1);
    setSize("Select Size");
    setColor("Select Color");
    setCoupon("");

    enqueueSnackbar("Product added to cart", {
      variant: "success",
    });
  };

  return (
    <div>
      <div>
        <h4>{title}</h4>
        <p className="rating">
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <span>({ratings_count} reviews)</span>
        </p>
        <h4>${price}</h4>
        <h6>{seller}</h6>
        <p>{desc}</p>
      </div>

      <div>
        <form action="" onSubmit={handleSubmit}>
          <div className="select-product size">
            <select name="" id="" value={size} onChange={handleSizeChange}>
              <option>Select Size</option>
              <option>SM</option>
              <option>MD</option>
              <option>LG</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          <div className="select-product color">
            <select name="" id="" value={color} onChange={handleColorChange}>
              <option>Select Color</option>
              <option>Pink</option>
              <option>Ash</option>
              <option>Red</option>
              <option>White</option>
              <option>Blue</option>
              <option>Black</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          <div className="cart-plus-minus">
            <div className="dec qtybutton" onClick={handleDecrease}>
              -
            </div>
            <input
              readOnly
              className="cart-plus-minus-box"
              type="text"
              name="qtyButton"
              id="qtyButton"
              value={prevQuantity}
              onChange={(e) => setPrevQuantity(parseInt(e.target.value, 10))}
            />
            <div className="inc qtybutton" onClick={handleIncrease}>
              +
            </div>
          </div>
          <div className="discount-code mb-2">
            <input
              type="text"
              placeholder="Enter discount code"
              onChange={(e) => setCoupon(e.target.value)}
            />
          </div>
          <button type="submit" className="lab-btn">
            <span>Add to Cart</span>
          </button>
          <Link to="/cart-page" className="lab-btn bg-primary">
            <span>Check Out</span>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default ProductDisplay;
