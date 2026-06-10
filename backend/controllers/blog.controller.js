import Blog from "../models/blog.model.js";

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      title: req.body.title,
      slug: req.body.slug,
      excerpt: req.body.excerpt,
      content: req.body.content,
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      published: req.body.published ?? true,
      image: req.file?.path || "",
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// export const createBlog = async (req, res) => {
//   try {
//     const blog = await Blog.create(req.body);

//     res.status(201).json({
//       message: "Blog created successfully",
//       blog,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// export const getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);

//     if (!blog) {
//       return res.status(404).json({
//         message: "Blog not found",
//       });
//     }

//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      slug: req.body.slug,
      excerpt: req.body.excerpt,
      content: req.body.content,
      published: req.body.published,
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      returnDocument: "after",
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// export const updateBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     if (!blog) {
//       return res.status(404).json({
//         message: "Blog not found",
//       });
//     }

//     res.status(200).json({
//       message: "Blog updated successfully",
//       blog,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
