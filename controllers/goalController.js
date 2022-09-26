const asynchandler = require("express-async-handler");
const Goals = require("../models/goalsModel");
const User = require("../models/usersModel");

// @desc to get Goals from db
// @route /api/goals
// @access private
const getGoals = asynchandler(async (req, res) => {
  const goals = await Goals.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc to add Goals to db
// @route /api/goals
// @access private
const addGoals = asynchandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }
  const goal = await Goals.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @desc to update Goal in db
// @route /api/goals/:id
// @access private
const updateGoals = asynchandler(async (req, res) => {
  const goal = await Goals.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not Found");
  }

  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure login user matches goal user
  if (goal.user.toString() != user.id) {
    res.status(401);
    throw new Error("User unauthorized");
  }

  const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc to delete Goal frin db
// @route /api/goals/:id
// @access private
const deleteGoals = asynchandler(async (req, res) => {
  const goal = await Goals.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not Found");
  }

  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure login user matches goal user
  if (goal.user.toString() != user.id) {
    res.status(401);
    throw new Error("User unauthorized");
  }

  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, addGoals, updateGoals, deleteGoals };
