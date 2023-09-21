const mongoose = require("mongoose");
const TweetModel = mongoose.Schema(
  {
    tweetContent: {
      type: String,
      default: "",
    },
    authorName: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    authorUsername: {
      type: String,
      required: true,
    },
    authorProfile: {
      type: String,
      required: true,
    },
    likes: [
      {
        name: {
          type: String,
          required: true,
        },
        bio: {
          type: String,
          required: true,
        },
        profile: {
          type: String,
          default: "",
        },
        username: {
          type: String,
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
      },
    ],
    comments: [
      {
        commentUsername: {
          type: String,
          required: true,
        },
        commentText: {
          type: String,
          required: true,
        },
        commentUserId: {
          type: String,
          required: true,
        },
        commentUserProfile: {
          type: String,
          default: "",
        },
        commentLike: [
          {
            name: {
              type: String,
              required: true,
            },
            bio: {
              type: String,
              required: true,
            },
            profile: {
              type: String,
              default: "",
            },
            username: {
              type: String,
              required: true,
            },
            userid: {
              type: String,
              required: true,
            },
          },
        ],
        commentSeen: [
          {
            type: String,
            required: true,
          },
        ],
        commentreplies: [
          {
            repliesUsername: {
              type: String,
              required: true,
            },
            repliesText: {
              type: String,
              required: true,
            },
            repliesUserId: {
              type: String,
              required: true,
            },
            repliesUserProfile: {
              type: String,
              default: "",
            },
            repliesLike: [
              {
                name: {
                  type: String,
                  required: true,
                },
                bio: {
                  type: String,
                  required: true,
                },
                profile: {
                  type: String,
                  default: "",
                },
                username: {
                  type: String,
                  required: true,
                },
                id: {
                  type: String,
                  required: true,
                },
              },
            ],
            repliesName: {
              type: String,
              required: true,
            },
            bio: {
              type: String,
              required: true,
            },
            repliesSeen: [String],
          },
        ],
      },
    ],
    photos: [
      {
        type: String,
        default: "",
      },
    ],
    tweetSeen: [
      {
        type: String,
        default: "",
      },
    ],
    video: [
      {
        type: String,
        default: "",
      },
    ],
    quotedTweet: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("tweetdata", TweetModel);