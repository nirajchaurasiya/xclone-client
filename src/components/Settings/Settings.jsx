import React, { useEffect } from "react";
import "./Settings.css";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
const options = [
  {
    title: "Your account",
    link: "/settings/account",
  },
  {
    title: "Change password",
    link: "/settings/account/change-password",
  },
  {
    title: "Tweet privacy",
    link: "/settings/account/tweet-privacy",
  },
  {
    title: "Forgot Password",
    link: "/settings/account/forgot-password",
  },
  {
    title: "Admin Panel",
    link: "/settings/account/admin-panel",
  },
];
export default function Settings() {
  useEffect(() => {
    document.title = `Settings / Xclone`;
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const goBackToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <div className="settings_container">
      <div className="profile_top">
        <svg
          onClick={goBackToPreviousPage}
          fill="var(--theme-color)"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <g>
            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
          </g>
        </svg>
        <div
          className="top_tweetname"
          style={{ display: "flex", alignItems: "center" }}
        >
          <p>Setting</p>
        </div>
      </div>
      <div className="settings_midcontainer">
        {options.map((e, index) => (
          <Link to={e.link} key={index}>
            <div
              className={`setting_card ${
                location.pathname === e.link ? "setting_card_active" : ""
              }`}
            >
              <p className="setting_title_name">{e.title}</p>
              <p className="setting_title_svg">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path
                      fill="white"
                      d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"
                    ></path>
                  </g>
                </svg>
              </p>
            </div>
          </Link>
        ))}
        <div
          onClick={() => {
            Cookies.remove("xid");
            window.location.reload();
          }}
        >
          <div
            className="setting_card"
            style={{
              padding: "15px",
              cursor: "pointer",
              backgroundColor: "#200302",
            }}
          >
            <p className="setting_title_name">Logout</p>
            <p className="setting_title_svg">
              <svg
                stroke="var(--bg-color)"
                fill="var(--bg-color)"
                viewBox="0 0 1024 1024"
                className="logout_icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="red"
                  d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"
                ></path>
              </svg>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
