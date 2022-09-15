const asynchandler = require("express-async-handler");

// @desc to get Goals from db
// @route /api/goals
// @access private
const getGoals = asynchandler(async (req, res) => {
  res.status(200).json({ msg: "GET api/goals/" });
});

// @desc to add Goals to db
// @route /api/goals
// @access private
const addGoals = asynchandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }
  res.status(200).json({
    msg: "POST api/goals/",
    text: process.env.STATUS == "production" ? null : req.body.text,
  });
});

// @desc to update Goal in db
// @route /api/goals/:id
// @access private
const updateGoals = asynchandler(async (req, res) => {
  res.status(200).json({ msg: `UPDATE api/goals/${req.params.id}` });
});

// @desc to delete Goal frin db
// @route /api/goals/:id
// @access private
const deleteGoals = asynchandler(async (req, res) => {
  res.status(200).json({ msg: `DELETE api/goals/${req.params.id}` });
});

module.exports = { getGoals, addGoals, updateGoals, deleteGoals };
