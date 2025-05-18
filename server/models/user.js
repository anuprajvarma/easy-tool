const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  provider: {
    type: String,
    default: "credentials",
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
