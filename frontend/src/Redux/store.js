import { configureStore } from "@reduxjs/toolkit";
import {
  newReviewReducer,
  productDetailsReducer,
  Products,
} from "./Reducers/ProductReducers";
import { Alert } from "./Reducers/AlertReducer"
import { userReducer } from "./Reducers/UserReducer";
import { cartReducer } from "./Reducers/cartReducer";
import { newOrderReducer, myOrdersReducer } from "./Reducers/orderReducer";

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const store = configureStore({
  reducer: {
    alert: Alert,
    User: userReducer,
    products: Products,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    newReview: newReviewReducer
  },
  preloadedState: initialState,
});

export default store