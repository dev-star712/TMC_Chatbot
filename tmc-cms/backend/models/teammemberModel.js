import mongoose from "mongoose";

const teammemberSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
      unique: true,
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

const Teammember = mongoose.model("Teammember", teammemberSchema);

export default Teammember;
