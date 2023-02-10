import "./App.scss";
import { useEffect } from "react";
// This is a React Router v6 app
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import LoginSignUp from "./Components/User/LoginSignUp";
import Profile from "./Components/User/Profile";
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import { GetRequest } from "./Requests/Requests";
import { UpdateUser } from "./Redux/Actions/UserAction";
import { useDispatch } from "react-redux";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
import UpdatePassword from "./Components/User/UpdatePassword";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Components/Admin/Admin";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import ProductDetails from "./Components/Product/ProductDetails";
import Cart from "./Components/Cart/Cart";
import Order from "./Components/Cart/Order";
import Orders from "./Components/Orders/Orders";
import NotFound from "./Components/Not Found/NotFound";
import MyAlert from "./Components/Alert/Alert";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const result = await GetRequest("/api/v1/me");
      if (result.success === true) {
        dispatch(
          UpdateUser({
            loading: false,
            isAuthenticated: true,
            details: result.data.user,
          })
        );
      } else {
        dispatch(
          UpdateUser({
            loading: false,
            isAuthenticated: false,
          })
        );
      }
    };

    loadUser();
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div className="header_"></div>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/order"
          element={<ProtectedRoute children={<Order />} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute children={<Orders />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute children={<Profile />} />}
        />

        <Route
          path="/update/password"
          element={<ProtectedRoute children={<UpdatePassword />} />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute isadmin={true} children={<Admin />} />}
        />


        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/login" element={<LoginSignUp />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

      <MyAlert />

      <div className="bottom_div"></div>
    </Router>
  );
}

export default App;
