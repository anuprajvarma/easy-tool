const express = require("express");
const { loginRestrection } = require("../middlewares/auth");
const Todo = require("../models/todo");

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
  res.json({ user, todo });
});

router.delete("/todo", async (req, res) => {
  const { email, title } = req.body;
  const todo = await Todo.deleteOne({ email, title });
  console.log(todo);
  res.json({ todo });
});

// router.patch("/todo", handleLogin);

// router.put("/todo");

module.exports = router;
