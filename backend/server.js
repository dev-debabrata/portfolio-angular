import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/admin.route.js";
import aboutRoutes from "./routes/about.route.js";
import skillRoutes from "./routes/skills.route.js";
import experienceRoutes from "./routes/experience.route.js";
import educationRoutes from "./routes/education.route.js";
import profileRoutes from "./routes/profile.route.js";
import projectRoutes from "./routes/project.route.js";
import contactRoutes from "./routes/contact.route.js";
import blogRoutes from "./routes/blog.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/admin", adminRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
