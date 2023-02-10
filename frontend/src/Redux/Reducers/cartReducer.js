import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  CLEAR_CART
} from "../Constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const items = action.payload;

      // const isItemExist = state.cartItems.find(
      //   (i) => i.product === item.product
      // );

      // if (isItemExist) {

      //   return {
      //     ...state,
      //     cartItems: state.cartItems.map((i) =>
      //       i.product === isItemExist.product ? item : i
      //     ),
      //   };
      // } else {
      //   return {
      //     ...state,
      //     cartItems: [...state.cartItems, item],
      //   };
      // }
      return{
        ...items
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case CLEAR_CART:
      localStorage.removeItem("cartItems");
      return { ...state, cartItems: [] }

    default:
      return state;
  }
};
