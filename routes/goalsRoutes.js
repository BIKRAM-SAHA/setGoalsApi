const express = require("express");
const router = express.Router();

const {
  getGoals,
  addGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");

router.route("/").get(getGoals).post(addGoals);

router.route("/:id").put(updateGoals).delete(deleteGoals);

module.exports = router;