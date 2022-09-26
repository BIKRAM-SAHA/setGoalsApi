const asynchandler = require("express-async-handler");
const user = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc to register new user
// @route /api/users
// @access public
const registerUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all details");
  }
  const userExists = await user.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  const userCreated = await user.create({
    name,
    email,
    password: hashedPass,
  });
  if (userCreated) {
    res.json({
      _id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      token: generateJWT(userCreated._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc to login user
// @route /api/users/login
// @access public
const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Enter required details");
  }
  const userExists = await user.findOne({ email });
  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    res.status(200).json({
      _id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      token: generateJWT(userExists._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc get info of user
// @route /api/users/me
// @access private
const getMe = asynchandler(async (req, res) => {
  const { _id, name, email } = req.user;
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

//Generate JWT
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getMe };
