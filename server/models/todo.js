const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
