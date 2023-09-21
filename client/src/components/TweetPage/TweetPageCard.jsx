import React, { useContext, useEffect } from "react";
import "./tweetpage.css";
import PostField from "../PostField/PostField";
import { useNavigate } from "react-router-dom";
import { convertDate } from "../CovertDateTime/ConvertDateTime";
import axios from "axios";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
export default function TweetPageCard({ tweetdata }) {
  const navigate = useNavigate();
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  const [userData] = useContext(AuthContext);
  const likeTweet = () => {
    try {
      // Tweetid and userId
      // api =>
      const api = `${backendURL}/tweetinteractions/liketweet/${tweetdata._id}/${userData._id}`;
      axios
        .put(api)
        .then((data) => {
          if (data.data.status === 1) {
            // const findTweet = alltweetdata.filter((e) => e._id === tweetdata._id);
            // findTweet[0].likes === findTweet;
          }
        })
        .catch((err) => {});
    } catch (error) {}
  };
  const unlikeTweet = () => {
    try {
      // Tweetid and userId
      // api =>
      const api = `${backendURL}/tweetinteractions/unliketweet/${tweetdata._id}/${userData._id}`;
      axios
        .put(api)
        .then((data) => {
          if (data.data.status === 1) {
            // const findTweet = allTweets.filter((e) => e._id !== tweetdata._id);
            // findTweet[0].likes === findTweet;
          }
        })
        .catch((err) => {});
    } catch (error) {}
  };
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    document.title = `${tweetdata?.authorName} on X: "${tweetdata?.tweetContent}"`;
  }, []);
  return (
    <div className="tweet_container">
      <div
        className="profile_top"
        style={{ display: "flex", alignItems: "center" }}
      >
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
        <div className="top_tweetname">
          <p>Post</p>
        </div>
      </div>
      <div className="overflow_scrolll">
        <div className="tweet_posted_user">
          <div className="tweet_user_profile_name">
            <div className="tweet_user_pf">
              <img src={backendURL + "/" + tweetdata.authorProfile} alt="" />
            </div>
            <div className="profile_user_name margin_top_1">
              <p>{tweetdata.authorName}</p>
              <span>@{tweetdata.authorUsername}</span>
            </div>
          </div>
          <div className="tweet_user_more_btn">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path
                  fill="var(--theme-color)"
                  d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <div className="tweet_content_text">
          <p>{tweetdata?.tweetContent}</p>
        </div>
        <div className="tweet_media ">
          {tweetdata.video?.length > 0 ? (
            <video
              className="border"
              controls
              src={`${backendURL}/${tweetdata.video[0]}`}
              alt="video"
            />
          ) : tweetdata.photos?.length > 0 ? (
            tweetdata.photos?.length > 1 ? (
              tweetdata.photos?.map((e) => (
                <img
                  key={e}
                  className="imgfirst-child"
                  src={`${backendURL}/${e}`}
                  alt="photo"
                />
              ))
            ) : (
              <img
                className="imglast-child"
                src={`${backendURL}/${tweetdata.photos[0]}`}
                alt="photo"
              />
            )
          ) : (
            ""
          )}
        </div>

        <div className="time_views">
          <p>
            {convertDate(tweetdata?.createdAt)} · <span>0</span> views
          </p>
        </div>

        <div className="view_engagement">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="r-115tad6 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-1hvjb8t r-bnwqim r-1plcrui r-lrvibr"
          >
            <g>
              <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
            </g>
          </svg>
          <p>View engagement</p>
        </div>
        <div className="tweet_interactions_options break">
          <div className="tweet_comments svg_width">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
              </g>
            </svg>
            {tweetdata?.comments?.length > 0 && (
              <p>{tweetdata?.comments?.length}</p>
            )}
          </div>
          <div className="retweet_tweet svg_width">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
              </g>
            </svg>
          </div>

          {userData._id === tweetdata.authorId ? (
            <div className="like_tweet svg_width">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path
                    fill="var(--theme-hover-color)"
                    d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                  ></path>
                </g>
              </svg>
            </div>
          ) : (
            <div className="like_tweet svg_width">
              {tweetdata?.likes?.some((like) => like.id === userData._id) ? (
                <svg
                  onClick={unlikeTweet}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g>
                    <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                  </g>
                </svg>
              ) : (
                <svg onClick={likeTweet} viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                  </g>
                </svg>
              )}
              {tweetdata?.likes?.length > 0 && (
                <p>{tweetdata?.likes?.length}</p>
              )}
            </div>
          )}

          <div className=" svg_width">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
              </g>
            </svg>
          </div>

          <div className="tweet_share svg_width">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
              </g>
            </svg>
          </div>
        </div>
        <PostField comment={true} />
      </div>

      <div className="margin_top_100"></div>
    </div>
  );
}