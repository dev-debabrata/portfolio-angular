import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  { imageUrl: { type: String, required: true } },
  { timestamps: true },
);

export default mongoose.model("Profile", profileSchema);
