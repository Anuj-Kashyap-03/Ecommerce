import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./Loader.scss"

const Loader = () => {
  return (
    <div className="centerloader">
      <CircularProgress />
    </div>
  );
};

export default Loader;
