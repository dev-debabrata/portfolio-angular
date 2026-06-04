import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const imageFormats = ["jpg", "jpeg", "png", "webp"];

const projectStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/projects",
    allowed_formats: imageFormats,
  },
});

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/profile",
    allowed_formats: imageFormats,
  },
});

const skillStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/skills",
    allowed_formats: imageFormats,
  },
});

const blogStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/blogs",
    allowed_formats: imageFormats,
  },
});

// const resumeStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "portfolio/resume",
//     allowed_formats: ["pdf"],
//     resource_type: "image",
//     public_id: () => `Debabrata_Das_Resume_${Date.now()}`,
//     format: "pdf",
//   },
// });

// const resumeStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "portfolio/resume",
//     allowed_formats: ["pdf"],
//     resource_type: "raw",
//     public_id: () => `Debabrata_Das_Resume_${Date.now()}.pdf`,
//   },
// });

export const uploadProject = multer({ storage: projectStorage });
export const uploadProfile = multer({ storage: profileStorage });
export const uploadSkill = multer({ storage: skillStorage });
export const uploadBlog = multer({ storage: blogStorage });
// export const uploadResume = multer({ storage: resumeStorage });

// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";
// import cloudinary from "../config/cloudinary.js";

// const imageFormats = ["jpg", "jpeg", "png", "webp"];

// const projectStorage = new CloudinaryStorage({
//   cloudinary,
//   params: { folder: "portfolio/projects", allowed_formats: imageFormats },
// });

// const profileStorage = new CloudinaryStorage({
//   cloudinary,
//   params: { folder: "portfolio/profile", allowed_formats: imageFormats },
// });

// const skillStorage = new CloudinaryStorage({
//   cloudinary,
//   params: { folder: "portfolio/skills", allowed_formats: imageFormats },
// });

// const blogStorage = new CloudinaryStorage({
//   cloudinary,
//   params: { folder: "portfolio/blogs", allowed_formats: imageFormats },
// });

// const resumeStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "portfolio/resume",
//     allowed_formats: ["pdf"],
//     resource_type: "raw",
//     public_id: () => "Debabrata_Das_Resume",
//   },
// });

// export const uploadProject = multer({ storage: projectStorage });
// export const uploadProfile = multer({ storage: profileStorage });
// export const uploadSkill = multer({ storage: skillStorage });
// export const uploadBlog = multer({ storage: blogStorage });
// export const uploadResume = multer({ storage: resumeStorage });

// // import { CloudinaryStorage } from "multer-storage-cloudinary";
// // import multer from "multer";
// // import cloudinary from "../config/cloudinary.js";

// // const storage = new CloudinaryStorage({
// //   cloudinary,
// //   params: {
// //     folder: "portfolio-projects",
// //     allowed_formats: ["jpg", "jpeg", "png", "webp"],
// //   },
// // });

// // const upload = multer({ storage });

// // export default upload;
