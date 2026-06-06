import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      default: "",
    },

    greeting: {
      type: String,
      default: "Hi, I'm",
    },

    firstName: {
      type: String,
      default: "",
    },

    lastName: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "",
    },

    profileDescription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Profile", profileSchema);

// import mongoose from "mongoose";

// const profileSchema = new mongoose.Schema(
//   { imageUrl: { type: String, required: true } },
//   { timestamps: true },
// );

// export default mongoose.model("Profile", profileSchema);
