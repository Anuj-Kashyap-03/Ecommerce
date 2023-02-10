import { UPDATE_ALERT_MESSAGE } from "../Constants/Alertconstants";

export const Alert = (
  state = { id: null, msg: null, success: false },
  action
) => {
  switch (action.type) {
    case UPDATE_ALERT_MESSAGE:
      if (state.id) {
        clearInterval(state.id);
      }

      return {
        id: action.payload.id,
        msg: action.payload.msg,
        success: action.payload.success,
      };
    default:
      return state;
  }
};
