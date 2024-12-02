import mongoose from "mongoose";

const reviewcategorySchema = mongoose.Schema(
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

const Reviewcategory = mongoose.model("review", reviewcategorySchema);

export default Reviewcategory;
