import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { ShowAlert } from "../../Redux/Actions/AlertAction";

import Loader from "../Loader/Loader";

const ProtectedRoute = ({ children, isadmin = false }) => {
  const dispatch = useDispatch();

  const { loading, isAuthenticated, details } = useSelector(
    (state) => state.User
  );
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      dispatch(ShowAlert("Please Login first", false));
    }
  }, [isAuthenticated, loading, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : isAuthenticated ? (
        isadmin ? (
          details.role === "admin" ? (
            children
          ) : (
            <Navigate to="/profile" />
          )
        ) : (
          children
        )
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoute;
