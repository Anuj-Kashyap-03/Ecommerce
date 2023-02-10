import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon />
      <p>Page Not Found </p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
