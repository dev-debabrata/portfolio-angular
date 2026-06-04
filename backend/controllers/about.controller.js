import About from "../models/about.model.js";

export const createOrUpdateAbout = async (req, res) => {
  try {
    await About.deleteMany({});

    const about = await About.create(req.body);

    res.status(201).json({
      message: "About saved successfully",
      about,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne().sort({ createdAt: -1 });

    if (!about) {
      return res.status(404).json({ message: "About not found" });
    }

    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
