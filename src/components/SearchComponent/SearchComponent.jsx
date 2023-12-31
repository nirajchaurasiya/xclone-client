import React, { useEffect, useState } from "react";
import "../LikedUser/LikedUser.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/InfoLoader";
import { VerifiedAcccount } from "../../TweetCard/TweetCard";
export default function SearchComponent({ searchQuery }) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [searchedUser, setSearchedUser] = useState([]);
  useEffect(() => {
    async function getAllUsers() {
      const getUsers = await axios.get(`${backendURL}/getPeople/all`);
      const res = getUsers.data;
      if (res.status === 1) {
        setAllUser(res.allPeople);
      }
    }
    getAllUsers();
  }, []);

  useEffect(() => {
    searchQuery && handleSearch();
    !searchQuery && setSearchedUser([]);
  }, [searchQuery]);

  const handleSearch = () => {
    setIsLoading(true);
    const filteredUsers = allUser.filter((user) =>
      `${user.fullname} ${user.email} ${user.bio}`
        .toLowerCase()
        .includes(searchQuery?.toLowerCase())
    );
    setIsLoading(false);
    setSearchedUser(filteredUsers);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="friend_suggestion_container">
      <div
        className="friend_suggestion_mid_container"
        style={{
          borderRadius: "0px",
          marginTop: "px",
          backgroundColor: "transparent",
        }}
      >
        {searchedUser.length > 0 ? (
          searchedUser?.map((e) => {
            if (!e.isActivated) return null;
            return (
              <div key={e?._id} className="friend_suggestion_card">
                <Link to={`/p/${e?.username}`}>
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
                      <p className="friend_suggestion_username">
                        @{e?.username}
                      </p>
                    </div>
                  </div>
                  <p style={{ marginTop: "5px", marginLeft: "50px" }}>
                    {e?.bio}
                  </p>
                </Link>
                <div className="friend_suggestion_follow_btn">
                  <button>Visit</button>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h3 style={{ padding: "0 20px" }}>Search a user</h3>
          </div>
        )}
      </div>
    </div>
  );
}
