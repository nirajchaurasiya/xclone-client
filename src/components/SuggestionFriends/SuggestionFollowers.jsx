import React, { useContext, useEffect, useState } from "react";
import "./SuggestionFriends.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { VerifiedAcccount } from "../../TweetCard/TweetCard";
export default function SuggestionFollowers() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [, , , , userData, , , , , , , , , , ,] = useContext(AuthContext);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  // eslint-disable-next-line
  const [allPeople, setAllPeople] = useState([]);
  const [, setLoader] = useState(true);

  useEffect(() => {
    async function getRelevantPeople() {
      setLoader(true);
      try {
        await axios
          .get(
            `${backendURL}/peopleaction/getFollowersFromUserId/${userData?._id}`
          )
          .then((data) => {
            if (data.data.status === 1) {
              return setAllPeople(data.data.followers);
            }
          })
          .then(() => {
            setLoader(false);
          })
          .catch((err) => {});
      } catch (error) {}
    }
    getRelevantPeople();
  }, [username, backendURL, userData?._id, userData?.followers.length]);
  return (
    <div className="friend_suggestion_container">
      <div className="friend_suggestion_mid_container">
        <p className="whotofollow">Your Followers</p>
        {allPeople?.length > 0 ? (
          allPeople?.slice(0, 5)?.map((e) => (
            <div
              key={e?._id}
              className="friend_suggestion_card"
              onClick={() => navigate(`/p/${e?.username}`)}
            >
              <div className="friend_suggestion_image">
                <img src={`${e?.profilepicture}`} alt="" />
                <div className="friend_suggestion_credentials">
                  <div
                    style={{
                      display: "flex",
                      gap: "2px",
                    }}
                  >
                    <p>{e?.fullname}</p>
                    <p
                      title="Verified"
                      style={{ width: "15px", marginTop: "2px" }}
                    >
                      <VerifiedAcccount />
                    </p>
                  </div>
                  <p className="friend_suggestion_username">@{e?.username}</p>
                </div>
              </div>

              <div className="friend_suggestion_follow_btn">
                <button>View</button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: "0 10px 15px 10px" }}>
            <div>Can't find user at the moment.</div>
          </div>
        )}
        {allPeople?.length > 0 && (
          <div
            onClick={() => {
              navigate(`/p/${userData?.username}/followers`);
            }}
            className="show_more_friend"
          >
            <p>Show more</p>
          </div>
        )}
      </div>
    </div>
  );
}
