import axios from "axios";
import {
  FAIL_ADD_NEW_PRODUCT,
  REQUEST_ADD_NEW_PRODUCT,
  SUCCESS_ADD_NEW_PRODUCT,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
} from "../Constants/ProductsConstants";
import { ShowAlert } from "./AlertAction";

/**
 * It takes in a productData object, dispatches a REQUEST_ADD_NEW_PRODUCT action, then sends a post
 * request to the server with the productData object, and then dispatches a SUCCESS_ADD_NEW_PRODUCT
 * action with the response data from the server.
 * @param productData - {
 */

export const AddNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ADD_NEW_PRODUCT });
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );
    dispatch({
      type: SUCCESS_ADD_NEW_PRODUCT,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ADD_NEW_PRODUCT,
      payload: error.response.data.message,
    });
  }
};

/**
 * It's an async function that takes in a keyword, currentPage, price, category, and ratings. It then
 * dispatches an action to the reducer. Then it makes an axios call to the backend and dispatches
 * another action to the reducer.
 * @param [keyword] - the search keyword
 * @param [currentPage=1] - The current page number
 * @param [price] - [0, 100000]
 * @param category - "",
 * @param [ratings=0] - 0
 */

export const getProducts =
  (keyword = "", currentPage = 1, price = [0, 100000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST, payload: { page: currentPage } });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message || true,
      });
    }
  };

// // Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    setTimeout(() => {
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message || true,
    });
  }
};

// // NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
    dispatch(ShowAlert("Review Submitted Successfully "));
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message || true,
    });
    dispatch(ShowAlert("Review not Submitted ", false));
  }
};

