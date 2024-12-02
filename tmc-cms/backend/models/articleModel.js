import mongoose from "mongoose";

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: String,
      required: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    article_type: {
      type: String,
      enum: ["news", "review", "video"],
      default: "news",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "article_type",
      required: true,
    },
    content: {
      type: String,
    },
    video_url: {
      type: String,
      validate: [
        {
          validator: function (value) {
            // Basic URL validation using regular expression
            const urlPattern = /^(https):\/\/[^ "]+$/;
            return urlPattern.test(value);
          },
          message: "Invalid URL format",
        },
        {
          validator: function (value) {
            // Check video_url presence when article_type is 'video'
            return (
              this.article_type !== "video" ||
              (this.article_type === "video" && value)
            );
          },
          message: "Video URL is required for video articles",
        },
      ],
    },
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    canonical_url: {
      type: String,
      default: "",
    },
    bot: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
