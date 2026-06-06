import express from "express";
import {
  createSkill,
  getSkills,
  // getSkillById,
  // updateSkill,
  deleteSkill,
} from "../controllers/skills.controller.js";

import { uploadSkill } from "../middleware/upload.js";

const router = express.Router();

router.post("/", uploadSkill.single("image"), createSkill);
router.get("/", getSkills);
// router.get("/:id", getSkillById);
// router.put("/:id", uploadSkill.single("image"), updateSkill);
router.delete("/:id", deleteSkill);

export default router;
