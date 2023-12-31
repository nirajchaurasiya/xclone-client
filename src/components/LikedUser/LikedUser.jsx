import React, { useEffect, useState } from "react";
import "./LikedUser.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/InfoLoader";
import TopComponent from "../TopComponent/TopComponent";
export default function LikedUser() {
  const { username, tweetId } = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [likedUser, setLikedUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLikeUserFromTweet = () => {
      setIsLoading(true);
      try {
        axios
          .get(`${backendURL}/tweetaction/getALlLikes/${tweetId}`)
          .then((data) => {
            if (data.data.status === 1) {
              const allLikes = data.data.like;
              setLikedUser(allLikes);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      } catch (error) {
        console.log("error", error);
      }
    };
    getLikeUserFromTweet();
  }, [tweetId, username, backendURL]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="friend_suggestion_container">
      <TopComponent />
      <div
        className="friend_suggestion_mid_container"
        style={{
          borderRadius: "0px",
          marginTop: "px",
          backgroundColor: "transparent",
        }}
      >
        <p className="whotofollow">User who Liked</p>
        {likedUser.length > 0 ? (
          likedUser?.map((e) => (
            <div key={e?._id} className="friend_suggestion_card">
              <Link to={`/p/${e?.username}`}>
                <div className="friend_suggestion_image">
                  <img src={`${e?.profilepicture}`} alt="" />
                  <div className="friend_suggestion_credentials">
                    <p>{e?.fullname}</p>
                    <p className="friend_suggestion_username">@{e?.username}</p>
                  </div>
                </div>
                <p style={{ marginTop: "5px", marginLeft: "50px" }}>{e?.bio}</p>
              </Link>
              <div className="friend_suggestion_follow_btn">
                <button>Visit</button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}
