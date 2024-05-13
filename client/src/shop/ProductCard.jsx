import { useContext } from "react";
import { Link } from "react-router-dom";
import Ratting from "../components/Ratting";
import { AuthContext } from "../contexts/AuthProvider";
import { useSnackbar } from "notistack";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ gridList, products }) => {
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleAddToCart = (pro) => {
    const product = {
      id: pro.id,
      image: pro.image,
      title: pro.title,
      price: pro.price,
      quantity: pro.prevQuantity || 1,
      size: pro.size,
      color: pro.color,
      coupon: pro.coupon,
    };

    const exitingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const exitingProductIndex = exitingCart.findIndex(
      (item) => item.id === pro.id
    );

    if (exitingProductIndex !== -1) {
      exitingCart[exitingProductIndex].quantity += product.quantity;
    } else {
      exitingCart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(exitingCart));
    enqueueSnackbar("Product added to cart", { variant: "success" });
  };
  return (
    <div
      className={`shop-product-wrap row justify-content-center ${
        gridList ? "grid" : "list"
      }`}
    >
      {
        // eslint-disable-next-line react/prop-types
        products.map((product, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-12">
            <div className="product-item">
              <div className="product-thumb">
                <div className="pro-thumb">
                  <img src={product.image} alt="" />
                </div>

                <div className="product-action-link">
                  <Link to={`/shop/${product.id}`}>
                    <i className="icofont-eye"></i>
                  </Link>
                  <a href="#">
                    <i className="icofont-heart"></i>
                  </a>
                  <Link
                    to="/cart-page"
                    onClick={() => {
                      user && handleAddToCart(product);
                    }}
                  >
                    <i className="icofont-cart-alt"></i>
                  </Link>
                </div>
              </div>

              <div className="product-content">
                <h5>
                  <Link to={`/shop/${product.id}`}>{product.title}</Link>
                </h5>
                <p className="productRating">
                  <Ratting />
                </p>
                <h6>${product.price}</h6>
              </div>
            </div>

            <div className="product-list-item">
              <div className="product-thumb">
                <div className="pro-thumb">
                  <img src={product.image} alt="" />
                </div>

                <div className="product-action-link">
                  <Link to={`/shop/${product.id}`}>
                    <i className="icofont-eye"></i>
                  </Link>
                  <a href="#">
                    <i className="icofont-heart"></i>
                  </a>
                  <Link
                    to="/cart-page"
                    onClick={() => {
                      user && handleAddToCart(product);
                    }}
                  >
                    <i className="icofont-cart-alt"></i>
                  </Link>
                </div>
              </div>

              <div className="product-content">
                <h5>
                  <Link to={`/shop/${product.id}`}>{product.title}</Link>
                </h5>
                <p className="productRating">
                  <Ratting />
                </p>
                <h6>${product.price}</h6>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};
export default ProductCard;
