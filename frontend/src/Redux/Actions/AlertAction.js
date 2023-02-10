import { UPDATE_ALERT_MESSAGE } from "../Constants/Alertconstants";

export const ShowAlert = (msg, success = true) => async (dispatch) => {

  const id = setInterval(() => {
    dispatch({
      type: UPDATE_ALERT_MESSAGE,
      payload: { msg: null, id: null, success },
    });
  }, 5000);

  dispatch({
    type: UPDATE_ALERT_MESSAGE,
    payload: { msg, id, success },
  });
};
