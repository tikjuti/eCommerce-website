import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo/logo.png";
import { AuthContext } from "../contexts/AuthProvider";
import DropDownProfile from "./DropDownProfile";
import { useSelector, useDispatch } from "react-redux";
import { updateCartCount } from "../actions/CartAction";

const NavItems = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [countCart, setCountCart] = useState(0);

  const countCart = useSelector((state) => state.count);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateCartFromLocalStorage = () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const parsedCart = JSON.parse(cart);
        dispatch(updateCartCount(parsedCart.length));
      }
    };

    updateCartFromLocalStorage();

    const localStorageListener = () => {
      updateCartFromLocalStorage();
    };
    window.addEventListener("storage", localStorageListener);

    return () => {
      window.removeEventListener("storage", localStorageListener);
    };
  }, [dispatch]);

  // useEffect(() => {
  //   const updateCartCount = () => {
  //     const cart = localStorage.getItem("cart");
  //     if (cart) {
  //       const parsedCart = JSON.parse(cart);
  //       setCountCart(parsedCart.length);
  //     }
  //   };
  //   updateCartCount();
  //   window.addEventListener("storage", updateCartCount);

  //   return () => {
  //     window.removeEventListener("storage", updateCartCount);
  //   };
  // }, []);

  // useEffect(() => {
  //   const cart = localStorage.getItem("cart");
  //   if (cart) {
  //     const parsedCart = JSON.parse(cart);
  //     setCountCart(parsedCart.length);
  //   }
  // }, []);

  const { user } = useContext(AuthContext);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  });

  return (
    <header
      className={`header-section style-4 ${
        headerFixed ? " header-fixed fadeInUp" : ""
      }`}
    >
      {/* header top */}
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-to-area">
            <Link to="/signup">
              <span className="lab-btn me-3">Signup</span>
            </Link>
            <Link to="/login">
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* header bottom */}

      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            {/* logo */}
            <div className="logo-search-acte">
              <div className="logo">
                <Link to="/">
                  <img src={Logo} alt="" />
                </Link>
              </div>
            </div>

            {/* menu area */}
            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="/cart-page">
                      <i className="icofont-cart" style={{ fontSize: 24 }}></i>
                      <div className="nav-cart-count">{countCart}</div>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* signup and login */}
              <Link to="/signup" className="lab-btn me-3 d-none d-md-block">
                Sign up
              </Link>
              {user ? (
                <div
                  className="avatar-user-login"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <img src={user.avatar} alt="" className="avatar" />
                </div>
              ) : (
                <Link to="/login" className="me-3 d-none d-md-block">
                  Log in
                </Link>
              )}
              {isOpen && <DropDownProfile />}

              {/* menu toggle */}
              <div
                onClick={() => setMenuToggle(!menuToggle)}
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>

              {/*  social toggle */}
              <div
                className="ellepsis-bar d-md-none"
                onClick={() => setSocialToggle(!socialToggle)}
              >
                <i className="icofont-info-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavItems;
