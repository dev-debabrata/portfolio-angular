import express from "express";
import protectAdmin from "../middleware/auth.middleware.js";
import { uploadBlog } from "../middleware/upload.js";
import {
    createBlog,
    getBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);
router.post("/", protectAdmin, uploadBlog.single("image"), createBlog);
router.put("/:id", protectAdmin, uploadBlog.single("image"), updateBlog);
router.delete("/:id", protectAdmin, deleteBlog);

export default router;
