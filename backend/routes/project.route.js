import express from "express";
import protectAdmin from "../middleware/auth.middleware.js";
import { uploadProject } from "../middleware/upload.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", protectAdmin, uploadProject.single("image"), createProject);
router.put("/:id", protectAdmin, uploadProject.single("image"), updateProject);
router.delete("/:id", protectAdmin, deleteProject);

export default router;




// import express from "express";
// import { uploadProject } from "../middleware/upload.js";
// import {
//   createProject,
//   getProjects,
//   getProjectById,
//   updateProject,
//   deleteProject,
// } from "../controllers/project.controller.js";

// const router = express.Router();

// router.post("/", uploadProject.single("image"), createProject);
// router.get("/", getProjects);
// router.get("/:id", getProjectById);
// router.put("/:id", uploadProject.single("image"), updateProject);
// router.delete("/:id", deleteProject);

// export default router;
