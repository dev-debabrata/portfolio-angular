import express from "express";
import {
  createSkill,
  getSkills,

  deleteSkill,
} from "../controllers/skills.controller.js";
import { uploadSkill } from "../middleware/upload.js";

const router = express.Router();

router.post("/", uploadSkill.single("image"), createSkill);
router.get("/", getSkills);
router.delete("/:id", deleteSkill);

export default router;
