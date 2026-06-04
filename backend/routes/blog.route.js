import express from "express";
import protectAdmin from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

router.post("/", protectAdmin, createBlog);
router.put("/:id", protectAdmin, updateBlog);
router.delete("/:id", protectAdmin, deleteBlog);

export default router;
