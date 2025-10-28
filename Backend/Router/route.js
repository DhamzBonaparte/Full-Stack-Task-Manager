const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  sendTask,
  updateTask,
  deleteTask,
  getOneTask,
} = require("../Controllers/Tasks");

router.route("/").get(getAllTasks).post(sendTask);
router.route("/:id").patch(updateTask).delete(deleteTask).get(getOneTask);

module.exports = router;
