// import Resume from "../models/resume.model.js";

// export const saveResumeLink = async (req, res) => {
//   try {
//     const { resumeUrl } = req.body;

//     if (!resumeUrl) {
//       return res.status(400).json({ message: "Resume URL is required" });
//     }

//     await Resume.deleteMany({});

//     const resume = await Resume.create({ resumeUrl });

//     res.status(201).json({
//       message: "Resume link saved successfully",
//       resumeUrl: resume.resumeUrl,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// export const getResumeLink = async (req, res) => {
//   try {
//     const resume = await Resume.findOne().sort({ createdAt: -1 });

//     if (!resume) {
//       return res.status(404).json({ message: "No resume found" });
//     }

//     res.json({
//       resumeUrl: resume.resumeUrl,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };
