const express = require("express");
const {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  getBlogsByUserId
} = require("../controllers/blog-controller");

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/delete/:id", deleteBlog);
blogRouter.get("/:id", getBlog);
blogRouter.get("/user/:id", getBlogsByUserId);
module.exports = { blogRouter };