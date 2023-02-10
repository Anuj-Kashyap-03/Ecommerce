import { UPDATE_USER } from "../Constants/UserConstants";

/**
 * This function takes in data, and dispatches an action with the type UPDATE_USER and the data that
 * was passed in.
 * @param data - {
 */
export const UpdateUser = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_USER, data: data });
};
