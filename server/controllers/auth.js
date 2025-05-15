const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser, checkUser, deleteUser } = require("../services/auth");

const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(email);
  const user = await User.create({
    name,
    email,
    password,
  });
  res.json(user);
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email === "" || password === "")
    res.json({ message: "email or password is not fill" });
  const user = await User.findOne({ email, password });
  if (!user) res.json({ message: "user not exist" });
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId, {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax", // or "none" with secure: true if cross-site
  });
  res.json({ success: true, redirectTo: "/" });
};

module.exports = { handleLogin, handleSignup };
