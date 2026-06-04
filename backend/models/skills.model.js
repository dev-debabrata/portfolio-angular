import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "Frontend",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Skills", skillSchema);
