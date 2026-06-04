import express from "express";
import { uploadProfile } from "../middleware/upload.js";
import {
  uploadProfileImage,
  getProfileImage,
  saveResumeLink,
  getResumeLink,
} from "../controllers/profile.controller.js";

const router = express.Router();

// Profile image
router.post("/image", uploadProfile.single("image"), uploadProfileImage);
router.get("/image", getProfileImage);

// Resume link
router.post("/resume", saveResumeLink);
router.get("/resume", getResumeLink);

export default router;
