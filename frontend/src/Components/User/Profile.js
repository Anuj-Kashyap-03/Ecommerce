import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.scss";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import dateFormat from "dateformat";
import { GetRequest, PutRequest } from "../../Requests/Requests";
import { UpdateUser } from "../../Redux/Actions/UserAction";
import MetaData from "../layout/MetaData";
import UserInforForm from "./UserInforForm";

const Profile = () => {
  /* Using the useDispatch hook to get the dispatch function from the Redux store. */
  const dispatch = useDispatch();

  /* Using the useNavigate hook to navigate to a different page. */
  const navigate = useNavigate();

  //Redux State
  /* Destructuring the details and isAuthenticated from the state.User object. */
  const { details, isAuthenticated } = useSelector((state) => state.User);

  // account Image state
  /* Setting up the state for the component. */
  const [EditPicture, setEditPicture] = useState(false);
  const [avatarAlt, setavatarAlt] = useState("");
  const [avatarSrc, setavatarSrc] = useState("");
  const [disableButtons, setdisableButtons] = useState(false);
  const [resultMessage, setresultMessage] = useState(null);

  const [avatarValue, setavatarValue] = useState(null);

  /**
   * It takes a file from the user, sends it to the server, and then updates the user's profile picture.
   * @param e - the event object
   */
  const updateProfilePicture = async (e) => {
    setresultMessage(null);

    e.preventDefault();
    setdisableButtons(true);
    const Imageform = new FormData();
    Imageform.set("avatar", avatarValue);
    // dispatch(updateProfileImage(Imageform));
    const url = "/api/v1/me/update/image";
    const result = await PutRequest(url, true, Imageform);
    if (result.success === true) {
      setEditPicture(false);
      setresultMessage({ error: false, message: "Updated Successfully" });

      dispatch(UpdateUser({ details: result.data.user }));
    } else {
      setresultMessage({
        error: true,
        message: "Not Updated, try again",
      });
    }
    setdisableButtons(false);
  };

  // On click handlers
  const EditPicturehandler = () => {
    setresultMessage(null);
    setEditPicture(true);
  };

  const CancelImageUpload = (e) => {
    setresultMessage(null);
    setEditPicture(false);
    setavatarSrc(details.avatar ? details.avatar.url : "anuj");
    setavatarValue(null);
  };

  /**
   * When the file is changed, read the file as a data URL and set the avatarSrc and avatarValue to the
   * result.
   * @param e - the event object
   */
  const FileIsChanged = (e) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      setavatarSrc(reader.result);
      setavatarValue(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const logoutUser = async () => {
    const result = await GetRequest("/api/v1/logout");
    if (result.success === true) {
      dispatch(UpdateUser({ isAuthenticated: false, details: {} }));
      navigate("/");
    }
  };

  /* Checking if the user is authenticated or not. If the user is authenticated, it is setting the state
of the component. */
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    setavatarSrc(details.avatar ? details.avatar.url : "anuj");
  }, [isAuthenticated, details, navigate]);
  /* The above code is a React component that is responsible for displaying the user's profile. */
  return (
    <Fragment>
      <MetaData title="My Profile" />
      <section>
        <div className="container-xxl">
          <div className="accountInfo  p-0 rounded-lg">
            <div className="row">
              <div className="col-md-5 ">
                <div className="imagediv  bg-white shadow p-4 p-md-5 ">
                  <div className="avatar">
                    <Avatar
                      alt={avatarAlt.toUpperCase()}
                      src={avatarSrc}
                      sx={{ width: 200, height: 200 }}
                    />
                  </div>
                  <div className="updateimage">
                    {!EditPicture ? (
                      <Button
                        className="editimage"
                        fullWidth={true}
                        variant="outlined"
                        onClick={() => EditPicturehandler()}
                        disabled={disableButtons}
                      >
                        Edit Picture
                      </Button>
                    ) : (
                      <>
                        <form
                          encType="multipart/form-data"
                          onSubmit={updateProfilePicture}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={FileIsChanged}
                            required
                          />
                          <span className="upload">
                            <Button
                              fullWidth={true}
                              type="submit"
                              variant="outlined"
                              className="mt-2"
                              disabled={disableButtons}
                            >
                              Upload
                            </Button>
                          </span>
                        </form>
                        <Button
                          fullWidth={true}
                          type="submit"
                          variant="contained"
                          onClick={CancelImageUpload}
                          color="error"
                          className="mt-2"
                          disabled={disableButtons}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {resultMessage && (
                      <p
                        style={{
                          color: resultMessage.error ? "red" : "green",
                          marginTop: "16px",
                        }}
                      >
                        {resultMessage.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="detailsdiv bg-white shadow p-4 ">
                  <div className="name">
                    <h1>
                      {`${details.firstname} ${details.lastname}` ||
                        details.email}
                    </h1>
                  </div>
                  <div className="join">
                    <h4>Joined On</h4>
                    <p> {dateFormat(details.createdAt, "fullDate")}</p>
                  </div>
                  <div className="links">
                    <div>
                      <Link className="link" to="/orders">
                        My Orders
                      </Link>
                    </div>
                    <div>
                      <Link className="link" to="/update/password">
                        Manage Passwords
                      </Link>
                    </div>
                    {details.role === "admin" && (
                      <div className="adminlink">
                        <Link className="link" to="/admin">
                          Go to Admin Dashboard
                        </Link>
                      </div>
                    )}
                    <div className="desktop">
                      <Button
                        color="error"
                        startIcon={<LogoutIcon />}
                        onClick={logoutUser}
                      >
                        log out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <UserInforForm />
        </div>
        <div className="logout">
          <Button color="error" startIcon={<LogoutIcon />} onClick={logoutUser}>
            log out
          </Button>
        </div>
      </section>
    </Fragment>
  );
};

export default Profile;
