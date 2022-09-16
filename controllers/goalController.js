const asynchandler = require("express-async-handler");
const Goals = require("../models/goalsModel");

// @desc to get Goals from db
// @route /api/goals
// @access private
const getGoals = asynchandler(async (req, res) => {
  const goals = await Goals.find();
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

  const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc to delete Goal frin db
// @route /api/goals/:id
// @access private
const deleteGoals = asynchandler(async (req, res) => {
  Goals.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(400);
      throw new Error("Goal not Found");
    }
    res.status(200).json({ id: req.params.id });
  });
});

module.exports = { getGoals, addGoals, updateGoals, deleteGoals };
