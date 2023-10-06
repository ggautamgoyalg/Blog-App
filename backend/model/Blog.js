const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref : "User",
    required: true,
  }
});

module.exports = mongoose.model("Blog", blogSchema);
