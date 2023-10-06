const UserSchema = require("../model/User");
const bcrypt = require("bcrypt");
const hashRounds = 10;

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await UserSchema.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) res.status(500).json({ message: "something went wrong !!" });
  else
  res.status(200).json({ users: users });
};

const signup = async (req, res, next) => {
  let { name, password, email } = req.body;
  let encryptedPassword = await bcrypt.hash(password, hashRounds);
  let newUser;
  try {
    let user = await UserSchema.findOne({ email });
    if (user != null && user != undefined) {
      res.status(400).json({ message: "email already exist!, instead signup " });
    } else {
      newUser = new UserSchema({
        name,
        email,
        password: encryptedPassword,
        blogs: []
      });

      await newUser.save();
      let thisUser = await UserSchema.findOne({ email });
        res.status(200).json({message : "signin succesfull", user: thisUser });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "unable to signup" });
  }


};

const login = async (req, res, next) => {
  let { password, email } = req.body;
  try {
    let user = await UserSchema.findOne({ email });
    if (user == null || user == undefined) {
      res
        .status(404)
        .json({ message: "email doesn't exist!, please enter valid email" });
    } else {
      let isDetailsCorrect = bcrypt.compareSync(password, user.password);
      if (isDetailsCorrect) {
        console.log(user);
        res.status(200).json({ message : "login succesfull", user: user });
      } else {
        res.status(404).json({ message: "please enter valid password" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "unable to login" });
  }
};

module.exports = { getAllUsers, signup, login };
