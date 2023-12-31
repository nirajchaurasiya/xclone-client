import React, { useContext, useEffect, useState } from "react";
import "./tweetpage.css";
import axios from "axios";
import PostField from "../PostField/PostField";
import { Link } from "react-router-dom";
import { convertDate } from "../CovertDateTime/ConvertDateTime";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { TweetContext } from "../../useContext/TweetContext/TweetContext";
import Loader from "../Loader/InfoLoader";
import { SpecificTweets } from "../../useContext/SpecificTweet/SpecificTweet";
import { customTimeFormat } from "../customTime/customTime";
import RemoveUnnecessaryTag from "../../TweetCard/RemoveUnnecessaryTag";
import { Likebtn, UnlikeBtn } from "../../all-constant/Button";
import AllComments from "./AllComments";
import { BookMark, BookMarked } from "../../all-constant/Bookmark";
import { addBookMark, removeBookMark } from "./allFunctions";
import MsgAlert from "../MsgAlertComp/MsgAlert";
import TopComponent from "../TopComponent/TopComponent";
import { VerifiedAcccount } from "../../TweetCard/TweetCard";
export default function TweetPageCard({ tweetdata, socket }) {
  const [bookmarkSign, setBookmarkSign] = useState(<BookMark />);
  const [likeBtn, setLikeBtn] = useState(<UnlikeBtn />);

  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [, , , , userData, setUserData, , , , , , , , , , ,] =
    useContext(AuthContext);

  const [, , , , , , likeTweet, unlikeTweet] = useContext(TweetContext);
  const [specifictweetPage, setSpecifictweetPage] = useContext(SpecificTweets);
  const [showMsg, setShowMsg] = useState(false);
  const [showFullSizeMedia, setShowFullSizeMedia] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [imgURL, setImgURL] = useState("");
  useEffect(() => {
    if (tweetdata) {
      setSpecifictweetPage(tweetdata);
    }
  }, [
    tweetdata.authorId,
    tweetdata,
    tweetdata?.authorUsername,
    setSpecifictweetPage,
  ]);
  useEffect(() => {
    if (tweetdata?.tweetContent) {
      // Create a temporary DOM element
      const tempDiv = document.createElement("div");

      // Set the HTML content
      tempDiv.innerHTML = tweetdata.tweetContent;

      // Get the plain text content
      const plainTextContent = tempDiv.textContent;

      // Set the document title with the parsed plain text
      document.title = `${tweetdata.authorName} on X: "${plainTextContent}"`;
    }
  }, [tweetdata]);
  useEffect(() => {
    const getFollowedSign = () => {
      const IsAlreadyLiked = tweetdata?.likes?.some(
        (e) => e.id === userData?._id
      );
      if (IsAlreadyLiked) {
        setLikeBtn(<Likebtn />);
      } else {
        setLikeBtn(<UnlikeBtn />);
      }
    };
    getFollowedSign();
  }, [tweetdata.authorId, tweetdata, tweetdata?.authorUsername, userData?._id]);

  useEffect(() => {
    const getBookMarkSign = () => {
      const IsAlreadyBookMarked = userData?.bookmark?.some(
        (e) => e.tweetId === tweetdata?._id
      );
      if (IsAlreadyBookMarked) {
        setBookmarkSign(<BookMarked />);
      } else {
        setBookmarkSign(<BookMark />);
      }
    };
    getBookMarkSign();
  }, [userData?.bookmark, tweetdata, tweetdata?._id]);
  const toggleFunction = () => {
    const checkIsAlreadyLiked = specifictweetPage?.likes?.some(
      (e) => e.id === userData?._id
    );
    if (!checkIsAlreadyLiked) {
      likeTweet(specifictweetPage?._id, userData?._id);
      setLikeBtn(<Likebtn />);
      specifictweetPage?.authorId !== userData?._id &&
        socket?.emit("sendLikeNotification", {
          senderUsername: userData?.username,
          receiverUsername: specifictweetPage?.authorUsername,
          type: "liketweet",
          tweet: specifictweetPage,
          tweetId: specifictweetPage?._id,
        });
    } else {
      unlikeTweet(specifictweetPage?._id, userData?._id);
      setLikeBtn(<UnlikeBtn />);
    }
  };
  const handleBookMark = async () => {
    const tweetId = tweetdata?._id;
    const userId = userData?._id;
    const IsAlreadyBookMarked = userData?.bookmark?.some(
      (e) => e.tweetId === tweetId
    );
    if (IsAlreadyBookMarked) {
      const res = await removeBookMark(tweetId, userId);
      if (res.status === 1) {
        setUserData(res.user);
        setSpecifictweetPage(res.tweet);
        setBookmarkSign(<BookMark />);
      }
    } else {
      const res = await addBookMark(tweetId, userId);
      if (res.status === 1) {
        setUserData(res.user);
        setSpecifictweetPage(res.tweet);
        setBookmarkSign(<BookMarked />);
      }
    }
  };
  const handleCopy = () => {
    const URL = window.location.href;
    console.log(URL);
    window.navigator.clipboard.writeText(URL);
    setMsgType("COPY_URL");
    setShowMsg(true);
    setTimeout(() => {
      setShowMsg(false);
    }, 3000);
  };

  const handleDeleteTweet = () => {
    if (window.confirm("Are you sure, you want to delete your tweet?")) {
      try {
        const tweetId = specifictweetPage?._id;
        axios
          .delete(`${backendURL}/tweetaction/deletetweet/${tweetId}`)
          .then((data) => {
            if (data?.data?.status === 1) {
              window.location.reload();
            }
          })
          .catch((err) => {
            // console.log("err", err);
          });
      } catch (error) {
        // console.log("error", error);
      }
    } else {
    }
  };
  return (
    <>
      {!specifictweetPage || !specifictweetPage?.length === 0 ? (
        <>
          <br />
          <br />
          <br />
          <Loader />
        </>
      ) : (
        <div className="tweet_container">
          <TopComponent title="Post" />
          <div className="overflow_scrolll">
            <div className="tweet_posted_user padding_wrap">
              <div className="tweet_user_profile_name">
                <div className="tweet_user_pf">
                  <img src={specifictweetPage.authorProfile} alt="" />
                </div>
                <div className="profile_user_name margin_top_1">
                  <Link
                    to={`/p/${specifictweetPage?.authorUsername}`}
                    style={{
                      display: "flex",
                      gap: "2px",
                    }}
                  >
                    <p>{specifictweetPage.authorName}</p>
                    <p
                      title="Verified"
                      style={{ width: "15px", marginTop: "2px" }}
                    >
                      <VerifiedAcccount />
                    </p>
                  </Link>
                  <span>@{specifictweetPage.authorUsername}</span>
                </div>
              </div>
              {/* <div className="tweet_user_more_btn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path
                      fill="var(--theme-color)"
                      d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                    ></path>
                  </g>
                </svg>
              </div> */}
            </div>
            <div className="tweet_content_text padding_wrap">
              <RemoveUnnecessaryTag
                htmlContent={specifictweetPage?.tweetContent}
              />

              {/* {specifictweetPage?.tweetContent} */}
            </div>
            <div className="tweet_media padding_wrap">
              {specifictweetPage.video?.length > 0 ? (
                <video
                  className="border"
                  controls
                  src={`${specifictweetPage.video[0]}`}
                  alt=""
                />
              ) : specifictweetPage.photos?.length > 0 ? (
                specifictweetPage.photos?.length > 1 ? (
                  specifictweetPage.photos?.map((e, i) => (
                    <img
                      key={i}
                      onClick={() => {
                        setShowFullSizeMedia(!showFullSizeMedia);
                        setImgURL(e);
                      }}
                      className="imgfirst-child"
                      src={`${e}`}
                      alt=""
                    />
                  ))
                ) : (
                  // <Link
                  //   to={`${location.pathname}/media/${specifictweetPage.photos?.length}`}
                  // >
                  // </Link>
                  <img
                    onClick={() => {
                      setShowFullSizeMedia(!showFullSizeMedia);
                      setImgURL(specifictweetPage.photos[0]);
                    }}
                    className="imglast-child"
                    src={`${specifictweetPage.photos[0]}`}
                    alt=""
                  />
                )
              ) : (
                ""
              )}
            </div>

            <div className="time_views padding_wrap">
              <p>
                {convertDate(specifictweetPage?.createdAt)} ·{" "}
                <span>{specifictweetPage?.tweetSeen?.length}</span> views
              </p>
            </div>
            {specifictweetPage?.likes?.length > 0 && (
              <div className="view_engagement padding_wrap">
                {
                  <Link
                    to={`/${specifictweetPage?.authorUsername}/tweet/${specifictweetPage?._id}/likes`}
                    style={{ display: "flex", gap: "5px" }}
                  >
                    <p>{specifictweetPage?.likes?.length}</p>

                    <span>
                      {specifictweetPage?.likes?.length > 1 ? "Likes" : "Like"}
                    </span>
                  </Link>
                }
                .
                {specifictweetPage?.bookmark?.length > 0 && (
                  <div
                    to={`/${specifictweetPage?.authorUsername}/tweet/${specifictweetPage?._id}/likes`}
                    style={{ display: "flex", gap: "5px" }}
                  >
                    <p>{specifictweetPage?.bookmark?.length}</p>

                    <span>
                      {specifictweetPage?.bookmark?.length > 1
                        ? "Bookmarks"
                        : "Bookmark"}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* <div className="view_engagement">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
                </g>
              </svg>
              <p>View engagement</p>
            </div> */}
            <div className="tweet_interactions_options break">
              <div className="tweet_comments svg_width">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                  </g>
                </svg>
                {specifictweetPage?.comments?.length > 0 && (
                  <p>{specifictweetPage?.comments?.length}</p>
                )}
              </div>
              {specifictweetPage?.authorId === userData?._id && (
                <div
                  className="retweet_tweet svg_width"
                  onClick={handleDeleteTweet}
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 482.428 482.429"
                    style={{ width: "30px" }}
                  >
                    <g>
                      <g>
                        <path
                          d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
			c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
			h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
			C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
			C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
			c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
			c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
			V115.744z"
                        />
                        <path
                          d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"
                        />
                        <path
                          d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"
                        />
                        <path
                          d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
			c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              )}

              <div className="like_tweet svg_width" onClick={toggleFunction}>
                {likeBtn}
                {specifictweetPage?.likes?.length > 0 && (
                  <p>{specifictweetPage?.likes?.length}</p>
                )}
              </div>

              <div className=" svg_width" onClick={handleBookMark}>
                {bookmarkSign}
                {specifictweetPage?.bookmark?.length > 0 && (
                  <p>{specifictweetPage?.bookmark?.length}</p>
                )}
              </div>

              <div className="tweet_share svg_width">
                <svg
                  onClick={() => handleCopy()}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g>
                    <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
                  </g>
                </svg>
                {/* {showShare && (
                  <div id="share_tweet">
                    <button>Delete</button>
                    <button>Copy link</button>
                  </div>
                )} */}
              </div>
            </div>
            <PostField
              tweetId={tweetdata?._id}
              receiverUsername={tweetdata?.authorUsername}
              comment={true}
              tweetdata={tweetdata}
              socket={socket}
            />

            {/* Comment Section */}
            <AllComments
              userData={userData}
              specifictweetPage={specifictweetPage}
              backendURL={backendURL}
              Link={Link}
              customTimeFormat={customTimeFormat}
              tweetdata={tweetdata}
              RemoveUnnecessaryTag={RemoveUnnecessaryTag}
            />
          </div>
          <div className="margin_top_100"></div>
        </div>
      )}
      {showMsg && <MsgAlert msgType={msgType} />}
      {showFullSizeMedia && (
        <div className="show-full-size-media-container">
          <div className="show-full-size-media">
            {specifictweetPage.photos?.length > 0 ? (
              specifictweetPage.photos?.length > 1 ? (
                specifictweetPage.photos?.map((e, i) => (
                  <img
                    key={i}
                    onClick={() => {
                      setImgURL(e);
                    }}
                    className=""
                    src={`${e}`}
                    alt=""
                  />
                ))
              ) : (
                <img
                  className=""
                  onClick={() => {
                    setImgURL(specifictweetPage.photos[0]);
                  }}
                  src={`${specifictweetPage.photos[0]}`}
                  alt=""
                />
              )
            ) : (
              ""
            )}
          </div>
          <br />
          <div className="show-image-container">
            <img
              onClick={() => {
                setShowFullSizeMedia(!showFullSizeMedia);
              }}
              src={imgURL}
              alt=""
            />
          </div>
          <br />
        </div>
      )}
    </>
  );
}
