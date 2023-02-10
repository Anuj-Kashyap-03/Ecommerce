import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MailOutline from "@mui/icons-material/MailOutline";
import { LockOpen } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { PostRequest } from "../../Requests/Requests";
import { UpdateUser } from "../../Redux/Actions/UserAction";
import { ShowAlert } from "../../Redux/Actions/AlertAction";
import MetaData from "../layout/MetaData";

const LoginSignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.User);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [disableButtons, setdisableButtons] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoadingInLogin, setshowLoadingInLogin] = useState(false);
  const [loginMessage, setloginMessage] = useState(null);

  // Register form
  const [showLoadingInSigin, setshowLoadingInSigin] = useState(false);
  const [RegsisterErrorMessage, setRegsisterErrorMessage] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const { email, password, cpassword } = user;

  // Form Submit handlers
  // Login
/**
 * It's a function that sends a POST request to the server, and then sets the state of the component
 * based on the response.
 * @param e - the event object
 */
  const loginSubmit = async (e) => {
    e.preventDefault();
    // console.log("Login Submitted");
    setloginMessage(null);

    setdisableButtons(true);
    setshowLoadingInLogin(true);

    const result = await PostRequest("/api/v1/login", false, {
      email: loginEmail,
      password: loginPassword,
    });
    // console.log(result);
    setdisableButtons(false);
    setshowLoadingInLogin(false);

    if (result.success === true) {
      setloginMessage({ msg: "Login Successfully" });
    } else {
      // console.log("status", result.error.status);
      if (result.error.status === 500) {
        setloginMessage({
          err: true,
          msg: "Please try again",
        });
      } else {
        setloginMessage({
          err: true,
          msg: "Please Enter valid Email and password",
        });
      }
    }

    if (result.success === true) {
      dispatch(
        UpdateUser({ isAuthenticated: true, details: result.data.user })
      );
      dispatch(ShowAlert("Login Successfully"))

    }
  };

  // Register
/**
 * I'm trying to register a user and if the registration is successful, I want to update the user
 * state.
 * @param e - the event object
 */
  const registerSubmit = async (e) => {
    e.preventDefault();
    // console.log("register Submitted");

    setdisableButtons(true);
    setshowLoadingInSigin(true);

    if (password === cpassword && password.length > 7) {
      setRegsisterErrorMessage(null);
      const myForm = new FormData();
      myForm.set("email", user.email);
      myForm.set("password", user.cpassword);
      const result = await PostRequest("/api/v1/register", true, myForm);
      setdisableButtons(false);
      setshowLoadingInSigin(false);
      if (result.success === true) {
        setRegsisterErrorMessage({
          msg: "Registration Completed Successfully",
        });
      } else {
        // console.log("status", result.error.status);
        if (result.error.status === 500) {
          setRegsisterErrorMessage({
            err: true,
            msg: "Please try again",
          });
        } else {
          setRegsisterErrorMessage({
            err: true,
            msg: "Email Already exist",
          });
        }
      }

      if (result.success === true) {
        dispatch(
          UpdateUser({ isAuthenticated: true, details: result.data.user })
        );
        dispatch(ShowAlert("Registration Completed Successfully"))
      }

      // console.log(result);
    } else {
      setRegsisterErrorMessage({
        err: true,
        msg: "Please Check password length should be equal to or greater than 8 character and both passwords are same",
      });
      // console.log("anuj");

      setdisableButtons(false);
      setshowLoadingInSigin(false);
    }
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

/**
 * If the tab is login, add the class shiftToNeutral to the switcherTab, and remove the class
 * shiftToRight. If the tab is register, add the class shiftToRight to the switcherTab, and remove the
 * class shiftToNeutral.
 * @param e - event
 * @param tab - the tab that is clicked
 */
  useEffect(() => {
    if (isAuthenticated) {
      if (window.history.length>2){
        navigate(-1);
      }else{
        navigate("/profile")
      }
      
    }

    
  }, [isAuthenticated, navigate]);

  const switchTabs = (e, tab) => {
    // console.log("switcherTab", switcherTab)
    // console.log("loginTab", loginTab)
    // console.log("registerTab", registerTab)
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      
      <MetaData title="Login" />
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button className="loginsignup_toggle_btn" ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutline />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpen />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div className="forget">
              <Link to="/password/forgot">Forget Password ?</Link>
            </div>
            <Button
              fullWidth={true}
              type="submit"
              variant="contained"
              className="signUpBtn"
              disabled={disableButtons}
            >
              <span>Login</span>
              {showLoadingInLogin && (
                <CircularProgress
                  sx={{ color: "white", marginLeft: "30px" }}
                  size={20}
                  disableShrink
                />
              )}
            </Button>
            {loginMessage && (
              <div className="regsisterError">
                <p style={{ color: loginMessage.err ? "red" : "green" }}>
                  {loginMessage.msg}
                </p>
              </div>
            )}
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpEmail">
              <MailOutline />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <LockOpen />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <LockOpen />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                name="cpassword"
                value={cpassword}
                onChange={registerDataChange}
              />
            </div>
            <Button
              fullWidth={true}
              type="submit"
              variant="contained"
              className="signUpBtn"
              disabled={disableButtons}
            >
              <span>Register</span>
              {showLoadingInSigin && (
                <CircularProgress
                  sx={{ color: "white", marginLeft: "30px" }}
                  size={20}
                  disableShrink
                />
              )}
            </Button>
            {RegsisterErrorMessage && (
              <div className="regsisterError">
                <p
                  style={{ color: RegsisterErrorMessage.err ? "red" : "green" }}
                >
                  {RegsisterErrorMessage.msg}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignUp;
