import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import CardSkeleton from "../TweetFields/Foryou/CardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import TweetCard from "../../TweetCard/TweetCard";
import "./bookmarks.css";
import InfoLoader from "../Loader/InfoLoader";
import TopComponent from "../TopComponent/TopComponent";
export default function Bookmarks({ socket }) {
  const [, , , , userData, , , , , , , , , , , ,] = useContext(AuthContext);
  const [initialPageCount, setInitialPageCount] = useState(15);
  const [loader, setLoader] = useState(true);
  const [getAllBookMark, setGetAllBookMark] = useState([]);
  const [showInitialArrayOfData, setShowInitialArrayOfData] = useState([]);
  useEffect(() => {
    async function getAllBookMark() {
      try {
        setGetAllBookMark(userData.bookmark);
        setShowInitialArrayOfData(userData.bookmark.slice(0, initialPageCount));
        setTimeout(() => {
          setLoader(false); // Disable the loader after updating data
        }, 200);
      } catch (error) {
        console.log(error);
      }
    }
    getAllBookMark();
  }, [userData?._id]);

  const fetchMoreData = () => {
    setLoader(true);
    const newPageCount = initialPageCount + 2;
    const newTweets = getAllBookMark.slice(
      initialPageCount,
      initialPageCount + 2
    );

    if (newTweets.length > 0) {
      // Concatenate the new tweets to the existing data
      setShowInitialArrayOfData((data) => [...data, ...newTweets]);
      setInitialPageCount(newPageCount);
    }

    setLoader(false); // Disable the loader after updating data
  };

  return (
    <div className="bookMark_container">
      <TopComponent title="Bookmarks" />
      {loader ? (
        <CardSkeleton />
      ) : getAllBookMark.length > 0 ? (
        <InfiniteScroll
          dataLength={showInitialArrayOfData.length}
          next={fetchMoreData}
          hasMore={showInitialArrayOfData.length < getAllBookMark.length}
          loader={<InfoLoader />}
          height="100vh"
          endMessage={
            <div
              style={{
                textAlign: "center",
                margin: "5px",
                paddingBottom: "200px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p>No more tweet.</p>
            </div>
          }
        >
          <div className="">
            {showInitialArrayOfData.map((tweet, index) => {
              return (
                <TweetCard
                  socket={socket}
                  tweet_id={tweet.tweetId}
                  key={index}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      ) : (
        <div
          style={{
            textAlign: "center",
            margin: "5px",
            padding: "200px 0",
            display: "flex",
            justifyContent: "center",
            fontSize: "14px",
          }}
        >
          No Tweets Found.
        </div>
      )}
    </div>
  );
}
