import Profile from "../models/profile.model.js";
import Resume from "../models/resume.model.js";

export const uploadProfileImage = async (req, res) => {
  try {
    await Profile.deleteMany({});

    const profile = await Profile.create({
      imageUrl: req.file.path,
    });

    res.json({
      imageUrl: profile.imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfileImage = async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({
      createdAt: -1,
    });

    if (!profile) {
      return res.status(404).json({
        message: "No profile image found",
      });
    }

    res.json({
      imageUrl: profile.imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const saveResumeLink = async (req, res) => {
  try {
    const { resumeUrl } = req.body;

    if (!resumeUrl) {
      return res.status(400).json({ message: "Resume URL is required" });
    }

    await Resume.deleteMany({});

    const resume = await Resume.create({ resumeUrl });

    res.status(201).json({
      message: "Resume link saved successfully",
      resumeUrl: resume.resumeUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getResumeLink = async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });

    if (!resume) {
      return res.status(404).json({ message: "No resume found" });
    }

    res.json({
      resumeUrl: resume.resumeUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
