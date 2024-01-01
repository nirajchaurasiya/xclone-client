import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Rightbar from "../Rightbar/Rightbar";
import "./home.css";
import Messages from "../Messages/Messages";
import PostField from "../PostField/PostField";
import Settings from "../Settings/Settings";

export default function Home({
  children,
  socket,
  messages,
  showMessage,
  account_info,
  settings,
  changePassword,
  tweetPrivacy,
  update_username,
  update_phone,
  update_email,
  update_protected_posts,
  update_country,
  update_languages,
  update_gender,
  update_dob,
  name,
  deactivateAcc,
  adminPanel,
  forgotPass,
}) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  useEffect(() => {
    document.title = "Xclone / Foryou";
  }, [location.pathname]);
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="main_content">
      {location.pathname === "/home/compose/tweet" && (
        <div className="post_field_in_phone_and_pc">
          <div className="real_post_div">
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
                <p>Tweets</p>
              </div>
            </div>
            <br />
            <PostField />
          </div>
        </div>
      )}

      <div className="three_grid">
        <div className="sidebar">
          <div className="column">
            <Sidebar showMessage={showMessage} socket={socket} />
          </div>
        </div>
        {messages ? (
          <>
            <div className="rightbar">
              <div className="column">
                {userId ? (
                  <Messages />
                ) : location.pathname === "/messages" ? (
                  <Messages />
                ) : (
                  <Rightbar />
                )}
              </div>
            </div>
            <div className="tweetfields">
              <div className="column">{children}</div>
              {/* Tweet btn */}

              {!showMessage && !messages && (
                <div
                  onClick={() => {
                    location.pathname === "/home/compose/tweet"
                      ? navigate(`/home`)
                      : navigate(`/home/compose/tweet`);
                  }}
                  className="tweet_btn_on_phone"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
                    </g>
                  </svg>
                </div>
              )}
            </div>
          </>
        ) : settings ||
          changePassword ||
          tweetPrivacy ||
          account_info ||
          update_username ||
          update_phone ||
          update_email ||
          update_protected_posts ||
          update_country ||
          update_languages ||
          update_gender ||
          update_dob ||
          name ||
          deactivateAcc ||
          forgotPass ||
          adminPanel ? (
          <>
            <div className={` ${"rightbar"} `}>
              {location.pathname === "/settings" ? (
                <div
                  className="column"
                  style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "20px",
                  }}
                >
                  <div>
                    <h2>Open Settings</h2>
                    <p style={{ marginLeft: "5px", marginTop: "5px" }}>
                      Click on the right tab to open!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="column">
                  {settings ||
                  changePassword ||
                  tweetPrivacy ||
                  account_info ||
                  update_username ||
                  update_phone ||
                  update_email ||
                  update_protected_posts ||
                  update_country ||
                  update_languages ||
                  update_gender ||
                  update_dob ||
                  name ||
                  deactivateAcc ||
                  adminPanel ||
                  forgotPass ? (
                    <Settings />
                  ) : (
                    <Rightbar />
                  )}
                </div>
              )}
            </div>
            <div className={` ${"tweetfields"} `}>
              {location.pathname !== "/settings" ? (
                <div className="column">{children}</div>
              ) : (
                <div className="column">
                  {settings ||
                  changePassword ||
                  tweetPrivacy ||
                  account_info ||
                  update_username ||
                  update_phone ||
                  update_email ||
                  update_protected_posts ||
                  update_country ||
                  update_languages ||
                  update_gender ||
                  update_dob ||
                  name ||
                  deactivateAcc ? (
                    <Settings />
                  ) : (
                    <Rightbar />
                  )}
                </div>
              )}
              {/* Tweet btn */}

              {!showMessage && !messages && (
                <div
                  onClick={() => {
                    location.pathname === "/home/compose/tweet"
                      ? navigate(`/home`)
                      : navigate(`/home/compose/tweet`);
                  }}
                  className="tweet_btn_on_phone"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
                    </g>
                  </svg>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="tweetfields">
              <div className="column">{children}</div>
              {/* Tweet btn */}

              {!showMessage && !messages && (
                <div
                  onClick={() => {
                    location.pathname === "/home/compose/tweet"
                      ? navigate(`/home`)
                      : navigate(`/home/compose/tweet`);
                  }}
                  className="tweet_btn_on_phone"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
                    </g>
                  </svg>
                </div>
              )}
            </div>
            <div className="rightbar">
              <div className="column">
                {userId ? (
                  <Messages userId={userId} />
                ) : location.pathname === "/messages" ? (
                  <Messages />
                ) : (
                  <Rightbar />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
