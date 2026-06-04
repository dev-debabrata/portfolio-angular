import express from "express";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);

router.post("/", protectAdmin, createProject);
router.put("/:id", protectAdmin, updateProject);
router.delete("/:id", protectAdmin, deleteProject);

export default router;
