const jwt = require("jsonwebtoken");
const user = require("../models/usersModel");
const asynchandler = require("express-async-handler");

const protect = asynchandler(async (req, res, next) => {
  let token;
  //check if authorization header exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //set req.user from the id in token
      req.user = await user.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("unauthorized");
    }
  }

  //if no token at all
  if (!token) {
    res.status(401);
    throw new Error("unauthorized, no token");
  }
});

module.exports = protect;
