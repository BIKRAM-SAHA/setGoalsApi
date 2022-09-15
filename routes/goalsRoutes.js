const express = require("express");
const router = express.Router();

const {
  getGoals,
  addGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");

// router.get("/",(req, res) => {
//   res.send("GET api/goals/");
// });
// router.post("/", (req, res) => {
//   res.send("POST api/goals/");
// });

router.route("/").get(getGoals).post(addGoals);

router.route("/:id").put(updateGoals).delete(deleteGoals);

module.exports = router;