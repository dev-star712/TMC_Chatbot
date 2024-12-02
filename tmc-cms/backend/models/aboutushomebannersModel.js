import mongoose from "mongoose";

const aboutushomebannersSchema = mongoose.Schema(
  {
    image: {
      type: [
        {
          type: String,
        },
      ],
      validate: {
        validator: function (image) {
          return image.length >= 1 && image.length <= 10;
        },
        message: "The number of images must be between 1 and 10",
      },
      required: true, // If the image is required
    },
    banner_paragraph1: {
      type: String,
      required: true,
    },
    banner_paragraph2: {
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

const Aboutushomebanners = mongoose.model(
  "Aboutushomebanners",
  aboutushomebannersSchema
);

export default Aboutushomebanners;
