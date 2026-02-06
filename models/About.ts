import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.About ||
  mongoose.model("About", AboutSchema);
