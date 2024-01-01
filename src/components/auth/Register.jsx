import React, { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import "./login.css";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import Loader from "../Loader/Loader";
import MsgAlert from "../MsgAlertComp/MsgAlert";
import axios from "axios";
import { getAccessToken, getUserData } from "./callback";

export default function Register({ name, email }) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const initialFormData = {
    email: email || "",
    username: "",
    password: "",
    fullname: name || "",
    bio: "",
    location: "",
    website: "",
    gender: "",
    dob: "",
    profilepic: "",
    is_verified: false,
  };
  const [, , showRegister, setShowRegister] = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [loader, setLoader] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  };
  useEffect(() => {
    document.title = "Xclone / Login / Register";
  }, []);

  const statusHandlers = {
    0: () => {
      setMsgType("EMAIL_EXIST");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        setLoader(false);
      }, 2000);
    },
    1: () => {
      setMsgType("REGISTERED_SUCCESS");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        setLoader(false);
      }, 2000);
    },
    2: () => {
      setMsgType("USERNAME_EXIST");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        setLoader(false);
      }, 2000);
    },
    3: () => {
      setMsgType("SERVER_ERROR");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        setLoader(false);
      }, 2000);
    },
    5: () => {
      setMsgType("EMAIL_IS_NOT_VALID");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        setLoader(false);
      }, 2000);
    },
  };

  const registerUser = async () => {
    try {
      name &&
        setFormData({
          ...formData,
          is_verified: true,
        });
      const fd = new FormData();
      for (const key in formData) {
        fd.append(key, formData[key]);
      }

      const response = await axios.post(`${backendURL}/user/auth/register`, fd);
      const status = response.data.status;
      const handler = statusHandlers[status];
      if (handler) {
        handler();
      }
    } catch (error) {}
    // window.location.href = "/";
  };

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await getAccessToken();
        if (res) {
          localStorage.setItem("Xtempdata", res);
          const getUserDetails = async () => {
            const userData = await getUserData();
            setFormData({
              ...formData,
              fullname: userData.name,
              username: userData.login,
              email: userData.email,
              bio: userData.bio,
              website: userData.html_url,
              location: userData.location,
              is_verified: true,
            });
          };
          getUserDetails();
        } else {
        }
      } catch (error) {}
    }
    fetchToken();
  }, [setFormData, formData]);

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <>
      <div className="login_page">
        <div className="login_head">
          <ImCross
            id="cross"
            onClick={() => {
              setShowRegister(!showRegister);
              window.location.href = "/";
            }}
          />
          <div className="x_logo">
            <img src="/xlogo-removebg-preview.png" alt="logo" />
          </div>
        </div>
        {
          <>
            {step === 1 && (
              <div className="login_content">
                <div className="auth_head">
                  <h1>Register for a new account</h1>
                </div>
                <p style={{ fontSize: "15px", fontWeight: "600" }}>
                  Step 1 of 3
                </p>
                <div className="auth_btn">
                  <div className="login_input">
                    <br />
                    <br />
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      required
                      placeholder="Enter email *"
                    />
                    <br />
                    <br />
                    <input
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      type="text"
                      required
                      placeholder="Enter full name *"
                    />
                    <br />
                    <br />
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      type="password"
                      placeholder="Enter password *"
                    />
                    <br />
                    <br />
                    <input
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      type="text"
                      required
                      placeholder="Enter bio *"
                    />
                    <br />
                    <div className="social_media_btn">
                      <button
                        onClick={nextStep}
                        disabled={
                          !formData.email ||
                          !formData.fullname ||
                          !formData.password ||
                          !formData.bio
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="login_content">
                <div className="auth_head">
                  <h1>Just a few more fields</h1>
                </div>
                <p style={{ fontSize: "15px", fontWeight: "600" }}>
                  Step 2 of 3
                </p>
                <div className="auth_btn">
                  <div className="login_input">
                    <br />
                    <br />
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Enter your location *"
                    />
                    <br />
                    <br />
                    <input
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Website link"
                    />
                    <br />
                    <br />
                    <input
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Gender *"
                    />
                    <br />
                    <br />
                    <label>Your birthday *</label>
                    <br />
                    <br />
                    <input
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      type="date"
                      placeholder="month/day/year || 09/22/2003"
                    />
                    <br />
                    <br />
                    <div className="social_media_btn">
                      <button
                        onClick={nextStep}
                        disabled={
                          !formData.location ||
                          !formData.gender ||
                          !formData.dob
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="login_content">
                <div className="auth_head">
                  <h1>Choose a profile picture</h1>
                </div>
                <p style={{ fontSize: "15px", fontWeight: "600" }}>
                  Step 3 of 3
                </p>
                <div className="auth_btn">
                  <div className="login_input">
                    <br />
                    <br />
                    <input
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Enter username *"
                    />
                    <br />
                    <br />
                    <label>Profile Picture *</label>
                    <br />
                    <br />
                    <input
                      name="profilepic"
                      onChange={handleInputChange}
                      type="file"
                      placeholder="Choose profile picture"
                    />
                    <div className="image_register">
                      {formData.profilepic && (
                        <img
                          alt="profile"
                          src={URL?.createObjectURL(formData.profilepic)}
                        />
                      )}
                    </div>
                    <div className="social_media_btn">
                      <button
                        onClick={() => {
                          // setStep(4);
                          setLoader(true);
                          registerUser();
                        }}
                        disabled={!formData.profilepic}
                      >
                        Sign up
                      </button>
                      <button
                        onClick={() => {
                          window.location.href = "/";
                        }}
                      >
                        Goto Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        }

        {loader && <Loader />}
      </div>
      {showMsg && <MsgAlert msgType={msgType} />}
    </>
  );
}
