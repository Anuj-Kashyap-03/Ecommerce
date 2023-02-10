import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.scss";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Button, CircularProgress } from "@mui/material";
import { PutRequest } from "../../Requests/Requests";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [IsPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showLoadingInUpdate, setshowLoadingInUpdate] = useState(false);
  const [disableButton, setvdisableButton] = useState(false);
  const [responsemessage, setresponsemessage] = useState(null);

  const updatePasswordSubmit = async (e) => {
    e.preventDefault();
    setvdisableButton(true);
    setshowLoadingInUpdate(true);
    if (newPassword === confirmPassword && newPassword.length > 7) {
      const response = await PutRequest("/api/v1/password/update", false, {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });
      if (response.success === true) {
        setresponsemessage({
          msg: "Password Updated Sucessfully",
        });
        setIsPasswordUpdated(true);
      } else {
        setresponsemessage({
          error: true,
          msg: "Old password is incorrect",
        });
      }
    } else {
      setresponsemessage({
        error: true,
        msg: "Please Check password length should be equal to or greater than 8 character and both passwords are same",
      });
    }

    setvdisableButton(false);
    setshowLoadingInUpdate(false);
  };

  useEffect(() => {
    if (IsPasswordUpdated) {
      navigate("/profile");
    }
  });
  return (
    <Fragment>
      <MetaData title="Change Password" />
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Update Password</h2>
          <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
            <div className="loginPassword">
              <VpnKeyIcon />
              <input
                type="password"
                placeholder="Old Password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
              {showLoadingInUpdate && (
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

export default UpdatePassword;
