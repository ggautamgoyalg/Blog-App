const { default: mongoose } = require("mongoose");
const BlogSchema = require("../model/Blog");
const UserSchema = require("../model/User");

const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await BlogSchema.find().populate("user");
  } catch (err) {
    console.log(err);
  }
  if (!blogs) res.status(500).json({ message: "something went wrong !!" });
  else
  res.status(200).json({ blogs: blogs });
};

const addBlog = async (req, res, next) => {
 // console.log(req);
  let { title, description, imageUrl, user } = req.body;
  let newBlog;
  try {
    newBlog = new BlogSchema({
      title,
      description,
      imageUrl,
      user,
    });
    const currUser = await UserSchema.findById(user);

    const userBlogs = currUser.blogs;
    userBlogs.push(newBlog._id);
    console.log(userBlogs);
    await UserSchema.findByIdAndUpdate(user, { blogs: userBlogs });
    await newBlog.save();
    res.status(200).json({ blog: newBlog });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "unable to add blog" });
  }

  
};

const updateBlog = async (req, res, next) => {
  let { title, description, imageUrl } = req.body;
  const id = req.params.id;
  let previousBlog;
  try {
    previousBlog = await BlogSchema.findByIdAndUpdate(id, {
      imageUrl,
      title,
      description,
    });
    if (!previousBlog) res.status(500).json({ message: "unable to find blog" });
    else
    {const updatedBlog = await BlogSchema.findById(id);

    res
      .status(200)
      .json({ updatedBlog: updatedBlog, previousBlog: previousBlog });}
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "unable to update blog" });
  }
};

const getBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await BlogSchema.findById(id);
    if (!blog) res.status(500).json({ message: "unable to find blog" });
    else res.status(200).json({ blog: blog });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "unable to get blog" });
  }
};

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await BlogSchema.findByIdAndDelete(id);
    if (!blog) res.status(500).json({ message: "unable to find blog" });
    else {
      const userId = blog.user;
      const currUser = await UserSchema.findById(userId);
      const userBlogs = currUser.blogs;
      const newBlogs = userBlogs.filter((currentBlog) => {
        return currentBlog != id;
      });
      await UserSchema.findByIdAndUpdate(userId, { blogs: newBlogs });
      res
        .status(200)
        .json({
          blog: blog,
          message: "this blog is deleted succesfully",
          newBlogs: newBlogs,
        });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "unable to delete blog" });
  }
};

const getBlogsByUserId = async (req, res, next) => {
  const userId = req.params.id;
  try {
     const user = await UserSchema.findById(userId).populate("blogs");
     if(!user || user == null)
     res.status(404).json({message : "user not found"});
    else
    res.status(200).json({ blogs: user.blogs});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};
module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  getBlogsByUserId,
};
