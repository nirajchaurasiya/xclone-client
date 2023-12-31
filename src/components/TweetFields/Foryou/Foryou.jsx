import React, { useContext, useEffect, useState } from "react";
import "./foryou.css";
import TweetCard from "../../../TweetCard/TweetCard";
import { AuthContext } from "../../../useContext/AuthContext/AuthContext";
import InfoLoader from "../../Loader/InfoLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import PostField from "../../PostField/PostField";
import CardSkeleton from "./CardSkeleton";
export default function Foryou({
  scrollbarhide,
  myAllTweets,
  profileId,
  socket,
}) {
  const [, , , , , , , , allTweets, , , , , , getAllTweets] =
    useContext(AuthContext);
  const [initialPageCount, setInitialPageCount] = useState(15);
  const [showInitialArrayOfData, setShowInitialArrayOfData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  useEffect(() => {
    // eslint-disable-next-line
    getAllTweets()
      .then(() => {
        setTimeout(() => {
          setIsLoading(false); // Set loading to false after data is fetched
        }, 200);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, [allTweets?.length]);

  useEffect(() => {
    // Update showInitialArrayOfData when allTweets changes
    setShowInitialArrayOfData(
      !myAllTweets
        ? allTweets.slice(0, initialPageCount)
        : allTweets
            .filter((e) => e.authorId === profileId?._id)
            .slice(0, initialPageCount)
    );
  }, [
    allTweets.length,
    allTweets,
    initialPageCount,
    myAllTweets,
    profileId?._id,
  ]);

  const fetchMoreData = () => {
    const newPageCount = initialPageCount + 2;
    let newTweets;

    if (!myAllTweets) {
      newTweets = allTweets.slice(initialPageCount, newPageCount);
    } else {
      newTweets = allTweets
        .filter((e) => e.authorId === profileId?._id)
        .slice(initialPageCount, newPageCount);
    }

    // Concatenate the new tweets to the existing data
    setShowInitialArrayOfData((data) => [...data, ...newTweets]);
    setInitialPageCount(newPageCount);
  };

  return (
    <>
      {allTweets.length === 0 && !scrollbarhide && (
        <div className="hide_in_phone">
          <PostField socket={socket} />
        </div>
      )}
      {isLoading ? ( // Show loading indicator while fetching data
        <CardSkeleton />
      ) : showInitialArrayOfData.length > 0 ? (
        <InfiniteScroll
          className={scrollbarhide && "scrollbar_hide"}
          dataLength={showInitialArrayOfData.length}
          next={fetchMoreData}
          hasMore={
            !myAllTweets
              ? showInitialArrayOfData.length < allTweets.length
              : showInitialArrayOfData.length <
                allTweets?.filter((e) => e.authorId === profileId?._id).length
          }
          loader={<InfoLoader />}
          height="90vh"
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
          {!scrollbarhide && (
            <div className="hide_in_phone">
              <PostField />
            </div>
          )}
          <div>
            {showInitialArrayOfData.map((tweet, index) => {
              return (
                <TweetCard socket={socket} tweet_id={tweet._id} key={index} />
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
          {myAllTweets ? "" : "No new users have uploaded any tweets."} <br />
        </div>
      )}
    </>
  );
}
