import Project from "../models/project.model.js";

export const createProject = async (req, res) => {
  try {
    const { title, description, category, technologies, liveUrl, githubUrl } =
      req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Project image is required" });
    }

    const project = await Project.create({
      title,
      description,
      category,
      image: req.file.path,
      technologies: technologies ? JSON.parse(technologies) : [],
      liveUrl,
      githubUrl,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title, description, category, technologies, liveUrl, githubUrl } =
      req.body;

    const updateData = {
      title,
      description,
      category,
      liveUrl,
      githubUrl,
    };

    if (technologies) {
      updateData.technologies = JSON.parse(technologies);
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
