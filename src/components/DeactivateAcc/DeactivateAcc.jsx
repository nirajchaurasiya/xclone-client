import React, { useContext, useState } from "react";
import "./deactivateAcc.css";
import TopComponent from "../TopComponent/TopComponent";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { checkPass } from "../../checkPasswordFunc/checkPass";
export default function DeactivateAcc() {
  const [, , , , userData, , , , , , , , , , ,] = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [password, setPassword] = useState("");
  async function handleDeactivateFunc(e) {
    e.preventDefault();
    try {
      const deactivate_password_field = document.querySelector(
        "#deactivate_password_field"
      );
      const matchPassword = password
        ? await checkPass(userData?.email, password)
        : 0;
      // let matchPassword = true;
      if (!password || matchPassword !== 1) {
        return deactivate_password_field.classList.add("border_red");
      }
      deactivate_password_field.classList.remove("border_red");

      axios
        .put(`${backendURL}/update/flag/${userData?._id}`)
        .then((data) => {
          if (data?.data?.status === 1) {
            Cookies.remove("xid");
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      console.log("Error", error);
    }
  }
  return (
    <div className="deactivate_acc_container">
      <div className="deactivate_acc_top_">
        <TopComponent title="Account Deactivation" />
      </div>
      <div className="deactivate_acc_mid_container">
        <div
          className="deactivate_acc_profile_container"
          onClick={() => {
            navigate(`/p/${userData?.username}`);
          }}
        >
          <div className="deactivate_acc_profile">
            <img src={`${userData?.profilepicture}`} alt="profile" />
          </div>
          <div className="deactivate_acc_name">
            <p>{userData?.fullname}</p>
            <span>@{userData?.username}</span>
          </div>
        </div>
        <div className="deactivate_acc_alert">
          <h2>This will deactivate your account</h2>
        </div>
        <div className="deactivate_acc_desc">
          You’re about to start the process of deactivating your Xclone account.
          Your display name ,<br /> @username, and public profile will no longer
          be viewable on Xclone.xyz.
        </div>
        <br />
        <div className="border_bottom"></div>
        <div className="deactivate_acc_btn border_bottom">
          <button
            onClick={() => {
              setShowPasswordForm(!showPasswordForm);
            }}
          >
            Deactivate
          </button>
        </div>
      </div>
      {showPasswordForm && (
        <form
          onSubmit={handleDeactivateFunc}
          className="verify_password_container"
          style={{ padding: "0 5px" }}
        >
          <div className="border_bottom">
            <div className="confirm_password">
              <p>Confirm your password</p>
            </div>
            <div className="confirm_password_alert">
              Please enter your password to verify.
            </div>
          </div>
          <br />
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="password"
                placeholder="Enter your password"
                id="deactivate_password_field"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label htmlFor="deactivate_password_field">
                Enter your password
              </label>
            </div>
          </div>
          <div className="verify_password_container_forgot_password">
            <p
              onClick={() => {
                navigate(`/settings/account/forgot-password`);
              }}
            >
              Forgot password?
            </p>
          </div>
          <div className="forgot_password_submit_btn">
            <button
              type="submit"
              style={{ backgroundColor: "red", color: "white" }}
            >
              Deactivate
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
