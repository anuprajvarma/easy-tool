const express = require("express");
const { loginRestrection } = require("../middlewares/auth");
const Todo = require("../models/todo");

const router = express.Router();

router.post("/todo", async (req, res) => {
  const { todoTitle, email } = req.body;
  console.log(email, todoTitle);
  const todo = await Todo.create({
    title: todoTitle,
    email,
  });
  res.json({ todo });
});

router.get("/todo", loginRestrection, async (req, res) => {
  const user = req.user;
  // res.json({ user });
  const todo = await Todo.find({ email: user.email });
  console.log(todo);
  res.json({ user, todo });
});

// router.delete("/todo", handleSignup);

// router.patch("/todo", handleLogin);

// router.put("/todo");

module.exports = router;
