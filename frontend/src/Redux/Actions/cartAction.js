import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../Constants/cartConstants";
import axios from "axios";
import { ShowAlert } from "./AlertAction";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  const cartState = getState().cart
  // console.log("🚀 ~ file: cartAction.js:14 ~ addItemsToCart ~ cartState", cartState)


  const item = {
    product: data.product._id,
    name: data.product.name,
    price: data.product.price,
    image: data.product.images[0].url,
    stock: data.product.Stock,
    quantity,
  };

  const isItemExist = cartState.cartItems.find(
    (i) => i.product === data.product._id
  );

  if (data.product.Stock < quantity) {
    dispatch(ShowAlert(`You can't add more then available stock ${data.product.Stock} in cart`, false));
    return
  }

  if (isItemExist) {
    const cartUpdatedState = cartState.cartItems.map((i) =>
      i.product === isItemExist.product ? item : i
    )
    dispatch({
      type: ADD_TO_CART,
      payload: { ...cartState, cartItems: cartUpdatedState },
    });

    dispatch(ShowAlert("Item Updated in Cart successfully"));

  } else {
    dispatch({
      type: ADD_TO_CART,
      payload: { ...cartState, cartItems: [...cartState.cartItems, item] }
    });

    dispatch(ShowAlert("Item added to Cart successfully"));
  }


  // console.log(JSON.stringify(getState().cart.cartItems));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

  // showing alert

};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

  dispatch(ShowAlert("Item removed from Cart successfully"));

};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
