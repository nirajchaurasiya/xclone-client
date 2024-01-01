import React from "react";
import "./infoloader.css";

export const BTNLoader = () => {
  return (
    <div className="btn-loader-container">
      <div></div>
    </div>
  );
};

const Loader = () => {
  return (
    <div className="inloader-container">
      <div className="inloader"></div>
    </div>
  );
};
export const InfoLoader = () => {
  return (
    <div className="inloader-container">
      <div className="inloader"></div>
    </div>
  );
};
export default Loader;
