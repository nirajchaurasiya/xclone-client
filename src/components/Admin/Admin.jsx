import React from "react";
import "./admin.css";
import TopComponent from "../TopComponent/TopComponent";
export default function Admin() {
  return (
    <>
      <TopComponent title="Analytics" />
      <div className="admin-panel-container">
        <h3>Want to view Analytics of your account?</h3>
        <p>Click the button below</p>
        <div className="button">
          <a href="https://admin-panel.xclone.xyz" target="_blank">
            <button>Go To Analytics Center</button>
          </a>
        </div>
      </div>
    </>
  );
}
