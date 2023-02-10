import { UPDATE_USER } from "../Constants/UserConstants";

export const userReducer = (
  state = {
    isAuthenticated: false,
    loading:true,
    details: {},
  },
  action
) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
