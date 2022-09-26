const express = require("express");
const router = express.Router();

const {
  getGoals,
  addGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");
const protect = require('../middlewares/authMiddleware')

router.route("/").get(protect, getGoals).post(protect, addGoals);

router.route("/:id").put(protect, updateGoals).delete(protect, deleteGoals);

module.exports = router;