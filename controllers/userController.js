// @desc to register new user
// @route /api/users
// @access public
const registerUser = (req, res) => {
  res.json({message: "registered User"})
};

// @desc to login user
// @route /api/users/login
// @access public
const loginUser = (req, res) => {
  res.json({message: "logged in User"})
};

// @desc get info of user
// @route /api/users/me
// @access public
const getMe = (req, res) => {
  res.json({message: "current user data"})
};

module.exports = { registerUser, loginUser, getMe };
