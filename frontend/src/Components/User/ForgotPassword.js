import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.scss";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MetaData from "../layout/MetaData";
import { Button, CircularProgress } from "@mui/material";
import { PostRequest } from "../../Requests/Requests";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showLoadingInSend, setshowLoadingInSend] = useState(false);
  const [disableButton, setvdisableButton] = useState(false);
  const [responsemessage, setresponsemessage] = useState(null);

  const forgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setvdisableButton(true);
    setshowLoadingInSend(true);
    const response = await PostRequest("/api/v1/password/forgot", false, {
      email: email,
    });
    if (response.success === true) {
      setresponsemessage({
        msg: "Email Send successfully for reset the password",
      });
    } else {
      setresponsemessage({
        error: true,
        msg: "User not found with email address",
      });
    }
    setvdisableButton(false);
    setshowLoadingInSend(false);
  };

  useEffect(() => {}, []);

  return (
    <Fragment>
      <MetaData title="Forgot Password" />
      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
          <h2 className="forgotPasswordHeading">Forgot Password</h2>

          <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
            <div className="forgotPasswordEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              fullWidth={true}
              type="submit"
              variant="contained"
              className="signUpBtn"
              disabled={disableButton}
            >
              <span>Send Link</span>
              {showLoadingInSend && (
                <CircularProgress
                  sx={{ color: "white", marginLeft: "30px" }}
                  size={20}
                  disableShrink
                />
              )}
            </Button>

            {responsemessage && (
              <p
                style={{
                  color: responsemessage.error ? "red" : "green",
                  marginTop: "20px",
                }}
              >
                {responsemessage.msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
