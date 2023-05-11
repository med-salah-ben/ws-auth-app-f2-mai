const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const User = require("../model/User");
const isAuth = require("../middleware/isAuth");

exports.userRegister = async (req, res) => {
  const { name, lastName, email, password } = req.body;
  try {
    //validation
    // if (!name || !lastName || !email || !password) {
    //   return res.status(400).send({ msg: "please enter all fields" });
    // }
    //check if user exist
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "user already exist!" });
    }
    //Crearte new model
    user = new User({ name, lastName, email, password });

    //create salt and hash
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    //save user
    await user.save();

    //sign user
    const payload = {
      id: user._id,
    };
    const token = await jwt.sign(payload, process.env.SecretKey , {expiresIn:"1h"});
    return res.status(200).send({ msg: "User Register Success", user, token  });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "User Register Failed", error });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //validation
    // if (!email || !password) {
    //   return res.status(400).send({ msg: "please enter all fields" });
    // }
    //check if user exist
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "user dosn't exist!" });
    }

    //create salt and compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: "Bad Credentials password" });
    }
    //sign user
    const payload = {
      id: user._id,
    };
    const token = await jwt.sign(payload, process.env.SecretKey , {expiresIn:"1h"});

    return res.status(200).send({ msg: "User Login Success", user, token  });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "User Login Failed", error });
  }
};


