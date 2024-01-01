import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import "./singlemessages.css";
import { MessageContext } from "../../useContext/MessageContext/MessageContext";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { convertDate } from "../CovertDateTime/ConvertDateTime";
import axios from "axios";
import Loader from "../Loader/InfoLoader";
import { VerifiedAcccount } from "../../TweetCard/TweetCard";
export default function SingleMessagesBox({ socket }) {
  const [, , , , userData, , , , , , , , , , , ,] = useContext(AuthContext);
  const [allMessages, setAllMessages] = useContext(MessageContext);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [flaggedStatus, setFlaggedStatus] = useState(false);
  const { userId } = useParams();
  const [file, setFile] = useState("");
  const [isUserExists, setIsUserExists] = useState(true);
  const [profileData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const chatContainerRef = useRef(null);
  // Function to scroll the chat container to the bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    } else {
    }
  };
  scrollToBottom();
  useLayoutEffect(() => {
    scrollToBottom();
  }, [allMessages, userId, chatContainerRef]);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        await axios
          .get(`${backendURL}/user/auth/getUser/${userId}`)
          .then((data) => {
            const response = data.data;
            if (response.status === 1) {
              setProfileData(response.data);
              setFlaggedStatus(response.data.flag);
              setIsUserExists(true);
              document.title = `@${response.data.username} / Messages`;
            } else {
              setIsUserExists(false);
            }
          })
          .catch((err) => {})
          .finally(() => {
            setIsLoading(false);
          });
      } catch (error) {}
    };
    fetchUser(userId);
  }, [userId, backendURL, setAllMessages, socket, userData?._id]);
  useEffect(() => {
    setAllMessages([]);
    socket?.emit("saveAllMessages", {
      senderusername: userData?.username,
      senderId: userData?._id,
      receiverId: userId,
    });
    setIsLoading(false);
  }, [userId, setAllMessages, socket, userData?._id, userData?.username]);
  const navigate = useNavigate();
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  function handleMessage(e) {
    e.preventDefault();
    setCount(count + 1);
    const data = {
      senderId: userData?._id,
      senderUsername: userData?.username,
      receiverId: userId,
      message: message,
      file: file, // You can include the file data if needed
    };

    socket?.emit("addMsg", data);

    setMessage("");
    setFile(""); // Clear the file input if needed
  }
  return isLoading ? (
    <Loader />
  ) : (
    <div style={{ width: "100%" }}>
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
          <p>
            {isUserExists && flaggedStatus === false
              ? profileData?.fullname
              : "The account has been deactivated!"}
          </p>
        </div>
      </div>
      <>
        <div className="messages_container_">
          <div className="messages_mid_container">
            {/* Messages */}

            <div className="users_conversation" ref={chatContainerRef}>
              {isLoading ? (
                <Loader />
              ) : isUserExists && flaggedStatus === false ? (
                <div
                  className="user_credentials_messages"
                  onClick={() => navigate(`/p/${profileData?.username}`)}
                >
                  <div className="message_user_profile">
                    ``
                    <img src={profileData?.profilepicture} alt="" />
                  </div>
                  <div className="messsage_username_name">
                    <div
                      style={{
                        display: "flex",
                        gap: "2px",
                        justifyContent: "center",
                      }}
                    >
                      <p>{profileData?.fullname}</p>
                      <p
                        title="Verified"
                        style={{ width: "15px", marginTop: "2px" }}
                      >
                        <VerifiedAcccount />
                      </p>
                    </div>
                    <span>@{profileData?.username}</span>
                  </div>
                  <div className="message_user_bio">
                    <p>{profileData?.bio}</p>
                  </div>
                  <div className="joined_and_followers_num">
                    <p>{convertDate(profileData?.createdAt)}</p>
                    {"  •  "}
                    <p>{profileData?.followers?.length} followers</p>
                  </div>
                </div>
              ) : (
                <div className="user_credentials_messages">
                  ;
                  <div className="message_user_profile">
                    <img src={`/xlogo.png`} alt="" />
                  </div>
                  <div className="messsage_username_name">
                    <p>This account has been deactivated!</p>
                  </div>
                </div>
              )}
              {!isLoading && allMessages.length > 0
                ? allMessages?.map((e, i) => (
                    <div key={i} className="user_conversation_container">
                      {e.senderId === userData._id ? (
                        <div className="my_msg_container">
                          <div className="my_messages">
                            <p>{e?.message}</p>
                          </div>
                          <span>{convertDate(e?.createdAt)}</span>
                        </div>
                      ) : (
                        <div className="user_msg_container">
                          <div className="other_user_messages">
                            <p>{e?.message}</p>
                          </div>
                          <span>{convertDate(e?.createdAt)}</span>
                          {/* <img src={backendURL + `/${e?.file}`} alt="file" /> */}
                        </div>
                      )}
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
        <div className="message_input_form">
          <form onSubmit={handleMessage} id="message_input" action="">
            <input
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              id="msg_input"
              placeholder={
                isUserExists && flaggedStatus === false
                  ? "Enter Message"
                  : "This account has been deactivated."
              }
              autoComplete="off"
              disabled={isUserExists && flaggedStatus === false ? false : true}
            />
            <button
              className="message_input_btn"
              disabled={isUserExists && flaggedStatus === false ? false : true}
            >
              Send
            </button>
          </form>
        </div>
      </>
    </div>
  );
}
