import mongoose from "mongoose";

const videocategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Videocategory = mongoose.model("video", videocategorySchema);

export default Videocategory;
