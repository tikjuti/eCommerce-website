import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "swiper/css";
import SingleProduct from "./shop/SingleProduct.jsx";
import { SnackbarProvider } from "notistack";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// fonts and icons
import "././assets/css/icofont.min.css";
import "././assets/css/animate.css";
import "././assets/css/style.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home/Home.jsx";
import Shop from "./shop/Shop.jsx";
import CartPage from "./shop/CartPage.jsx";
import About from "./about/About.jsx";
import Contact from "./contactPage/Contact.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Order from "./orderPage/Order.jsx";

import { Provider as ReduxProvider } from "react-redux";
import store from "./utilis/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/shop/:id", element: <SingleProduct /> },
      {
        path: "/cart-page",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/order",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ReduxProvider store={store}>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <RouterProvider router={router}></RouterProvider>
        </SnackbarProvider>
      </ReduxProvider>
    </AuthProvider>
  </React.StrictMode>
);
