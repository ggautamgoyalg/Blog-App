const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  blogs: [{ required: true, type: mongoose.Types.ObjectId, ref: "Blog" }],
});

module.exports = mongoose.model("User", userSchema);
