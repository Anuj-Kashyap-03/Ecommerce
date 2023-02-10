import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.scss";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { Button, CircularProgress } from "@mui/material";
import { PutRequest } from "../../Requests/Requests";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  let { token } = useParams();
  const navigate = useNavigate();

  const [IsPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showLoadingInSend, setshowLoadingInSend] = useState(false);
  const [disableButton, setvdisableButton] = useState(false);
  const [responsemessage, setresponsemessage] = useState(null);

  const resetPasswordSubmit = async (e) => {
    e.preventDefault();
    setvdisableButton(true);
    setshowLoadingInSend(true);
    if (password === confirmPassword && password.length > 7) {
      const response = await PutRequest(
        `/api/v1/password/reset/${token}`,
        false,
        {
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      if (response.success === true) {
        setresponsemessage({
          msg: "Password Updated Sucessfully",
        });
        setIsPasswordUpdated(true);
      } else {
        setresponsemessage({
          error: true,
          msg: "Password not Updated. Token is expired.",
        });
      }
    } else {
      setresponsemessage({
        error: true,
        msg: "Please Check password length should be equal to or greater than 8 character and both passwords are same",
      });
    }
    setvdisableButton(false);
    setshowLoadingInSend(false);
  };

  useEffect(() => {
    if (IsPasswordUpdated) {
      navigate("/login");
    }
  }, [IsPasswordUpdated, navigate]);
  return (
    <Fragment>
      <MetaData title="Reset Password" />
      <div className="resetPasswordContainer">
        <div className="resetPasswordBox">
          <h2 className="resetPasswordHeading">Update Profile</h2>

          <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
            <div>
              <LockOpenIcon />
              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockIcon />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button
              fullWidth={true}
              type="submit"
              variant="contained"
              className="signUpBtn"
              disabled={disableButton}
            >
              <span>Update</span>
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

export default ResetPassword;
