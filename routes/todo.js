const express = require("express");
const router = express.Router();
const Todo = require("../models/ToDo");
const fetchUser = require("../middleware/fetchUser");

router.get("/gettodo", fetchUser, async (req, res) => {
  try {
    const response = await Todo.find({ user: req.user.id });
    res.json(response);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/addtodo", fetchUser, async (req, res) => {
  const { todo } = req.body;

  try {
    const data = new Todo({
      todo,
      user: req.user.id,
    });
    const response = await data.save();
    res.json(response);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

router.delete("/deletetodo/:id", fetchUser, async (req, res) => {
  try {
    let getTodo = await Todo.findById(req.params.id);

    if (!getTodo) {
      return res.status(404).json({ error: "No todo found with this id." });
    }

    response = await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: "Todo deleted." });
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
