import Skill from "../models/skills.model.js";

export const createSkill = async (req, res) => {
  try {
    const { name, category, websiteUrl } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Skill name is required" });
    }

    if (!category) {
      return res.status(400).json({ message: "Skill category is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Skill image is required" });
    }

    const skill = await Skill.create({
      name,
      category,
      websiteUrl,
      imageUrl: req.file.path,
    });

    res.status(201).json({
      message: "Skill created successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// export const createSkill = async (req, res) => {
//   try {
//     const { name, category, websiteUrl } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Skill image is required" });
//     }

//     const skill = await Skill.create({
//       name,
//       category,
//       websiteUrl,
//       imageUrl: req.file.path,
//     });

//     res.status(201).json({
//       message: "Skill created successfully",
//       skill,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// export const updateSkill = async (req, res) => {
//   try {
//     const updateData = {
//       ...req.body,
//     };

//     if (req.file) {
//       updateData.imageUrl = req.file.path;
//     }

//     const skill = await Skill.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!skill) {
//       return res.status(404).json({
//         message: "Skill not found",
//       });
//     }

//     res.json({
//       message: "Skill updated successfully",
//       skill,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: 1 });

    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// export const getSkillById = async (req, res) => {
//   try {
//     const skill = await Skill.findById(req.params.id);

//     if (!skill) {
//       return res.status(404).json({
//         message: "Skill not found",
//       });
//     }

//     res.json(skill);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    res.json({
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
