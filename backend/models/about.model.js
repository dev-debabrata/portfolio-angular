import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("About", aboutSchema);
