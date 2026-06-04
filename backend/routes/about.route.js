import express from "express";
import {
  createOrUpdateAbout,
  getAbout,
} from "../controllers/about.controller.js";

const router = express.Router();

router.post("/", createOrUpdateAbout);
router.get("/", getAbout);

export default router;
