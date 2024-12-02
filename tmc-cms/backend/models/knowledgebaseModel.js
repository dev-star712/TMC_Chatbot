import mongoose from "mongoose";

const knowledgebaseSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
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

const Knowledgebase = mongoose.model("Knowledgebase", knowledgebaseSchema);

export default Knowledgebase;
