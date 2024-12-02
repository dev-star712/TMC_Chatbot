import mongoose from "mongoose";

const newscategorySchema = mongoose.Schema(
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

const Newscategory = mongoose.model("news", newscategorySchema);

export default Newscategory;
