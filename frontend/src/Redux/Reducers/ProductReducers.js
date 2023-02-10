import {
  FAIL_ADD_NEW_PRODUCT,
  REQUEST_ADD_NEW_PRODUCT,
  SUCCESS_ADD_NEW_PRODUCT,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_REQUEST,
} from "../Constants/ProductsConstants";

/**
 * It returns a new state object based on the action type.
 * @param [state=null] - the current state of the reducer
 * @param action - {
 * @returns The reducer is returning the state.
 */
export const new_productReducer = (state = null, action) => {
  switch (action.type) {
    case REQUEST_ADD_NEW_PRODUCT:
      return {
        loading: true,
        error: null,
        createdproduct: null,
      };

    case SUCCESS_ADD_NEW_PRODUCT:
      return {
        loading: false,
        error: null,
        createdproduct: action.payload,
      };

    case FAIL_ADD_NEW_PRODUCT:
      return {
        loading: false,
        error: action.payload,
        createdproduct: null,
      };
    default:
      return state;
  }
};

/**
 * It returns a new state object based on the action type.
 * @param [state] - The current state of the store.
 * @param action - {
 * @returns The reducer is returning a new state object.
 */
export const Products = (
  state = {
    products: [],
  },
  action
) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      if (action.payload.page === 1) {
        return {
          // cancel:action.payload.cancelToken,
          products: [],
          last_request_for_page: action.payload.page,
          loading: true,
          error: null,
        };
      } else {
        return {
          ...state,
          loading: true,
          last_request_for_page: action.payload.page,
          error: null,
        };
      }
    case ALL_PRODUCT_SUCCESS:
      let products;
      if (
        Number(action.payload.resultforpageNo) === state.last_request_for_page
      ) {
        if (Number(action.payload.resultforpageNo) === 1) {
          products = [...action.payload.products];
        } else {
          products = [...state.products, ...action.payload.products];
        }
        return {
          ...state,
          productsCount: action.payload.productsCount,
          resultforpageNo: action.payload.resultforpageNo,
          resultPerPage: action.payload.resultPerPage,
          filteredProductsCount: action.payload.filteredProductsCount,
          loading: false,
          error: null,
          products: products,
        };
      }
      return state;

    case ALL_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        products: null,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { loading: true, product: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
