const express = require("express");
const { loginRestrection } = require("../middlewares/auth");
const Todo = require("../models/todo");
const User = require("../models/user");

const router = express.Router();

router.post("/todo", async (req, res) => {
  const { todoTitle, email } = req.body;
  const todo = await Todo.create({
    title: todoTitle,
    email,
  });
  res.json({ todo });
});

router.get("/todo", loginRestrection, async (req, res) => {
  const user = req.user;
  const todo = await Todo.find({ email: user.email });
  // console.log(user.email);
  const loginUser = await User.findOne({ email: user.email });
  // console.log(`loginuser ${loginUser}`);
  res.json({ loginUser, todo });
});

router.delete("/todo", async (req, res) => {
  const { _id } = req.body;
  const todo = await Todo.findByIdAndDelete(_id);
  // console.log(todo);
  res.json({ todo });
});

router.patch("/todo", async (req, res) => {
  const { _id, dialogTitle } = req.body;
  const todo = await Todo.findByIdAndUpdate({ _id }, { title: dialogTitle });
  // console.log(todo);
  res.json({ todo });
});

// router.put("/todo");

module.exports = router;
