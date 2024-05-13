import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AxiosInstance from "../api/AxiosInstance";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(
    Cookies.get("token")
      ? jwtDecode(JSON.parse(Cookies.get("token")).access)
      : null
  );
  const [authTokens, setAuthTokens] = useState(
    // Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null
    Cookies.get("token") ? Cookies.get("token") : null
  );

  const registerUser = async (username, email, password, phone_number) => {
    const response = await AxiosInstance.post("auth/register/", {
      username: username,
      email: email,
      password: password,
      phone_number: phone_number,
    });

    if (response.status === 201) {
      loginUser(email, password);
      return true;
    } else {
      alert("something went wrong");
      return false;
    }
  };

  const loginUser = async (email, password) => {
    const response = await AxiosInstance.post("auth/login/", {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      let data = await response.data;
      setAuthTokens(JSON.stringify(data));
      setUser(jwtDecode(data.access));
      Cookies.set("token", JSON.stringify(data));
      return data;
    } else {
      alert("something went wrong");
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    Cookies.remove("token");
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(JSON.parse(authTokens).access));
      setLoading(false);
    }
  }, [authTokens, loading]);

  let contextData = {
    authTokens,
    user,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
