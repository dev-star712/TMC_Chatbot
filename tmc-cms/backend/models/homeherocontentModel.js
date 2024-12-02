import mongoose from "mongoose";

const homeherocontentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    image_alt_text: {
      type: String,
    },
    video_url: {
      type: String,
      validate: {
        validator: function (value) {
          // Basic URL validation using regular expression
          const urlPattern = /^(https):\/\/[^ "]+$/;
          return urlPattern.test(value);
        },
        message: "Invalid URL format",
      },
    },
    banner_subheading: {
      type: String,
    },
    banner_text: {
      type: String,
    },
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
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

const Homeherocontent = mongoose.model(
  "Homeherocontent",
  homeherocontentSchema
);

export default Homeherocontent;
