import React, { useEffect, useState } from "react";
import "./followingviewpage.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import FollowersFollowingCard from "../FollowersFollowingCard/FollowersFollowingCard";
import PeopleSkeleton from "../PeopleSkeleton/PeopleSkeleton";
export default function FollowingViewPage() {
  const [allFollowing, setAllFollowing] = useState([]);
  const { username } = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchAllFollowings() {
      const allFollowing = await axios.get(
        `${backendURL}/getPeople/getallfollowings/${username}`
      );
      if (allFollowing.data.status === 1) {
        setAllFollowing(allFollowing.data.following);
        setLoading(false);
      }
      try {
      } catch (error) {
        setLoading(false);
      }
    }
    fetchAllFollowings();
    // eslint-disable-next-line
  }, [username]);
  return loading ? (
    <PeopleSkeleton />
  ) : (
    <div className="follower_following_card_container">
      <div className="follower_following_card_midContainer">
        {allFollowing?.length > 0 ? (
          allFollowing?.map((e) => <FollowersFollowingCard key={e} data={e} />)
        ) : (
          <div className="msg_following">
            <div>
              <p>When this account follow someone</p> <p>It appears here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
