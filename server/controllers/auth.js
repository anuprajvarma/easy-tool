const User = require("../models/user");
// const { v4: uuidv4 } = require("uuid");
const { setUser, getUser, checkUser, deleteUser } = require("../services/auth");

const handleSignup = async (req, res) => {
  const { name, email } = req.body;
  console.log(`email ${email}`);
  let user = await User.findOne({ email });
  console.log(`user ${user}`);
  if (!user) {
    user = await User.create({
      name,
      email,
    });
    res.json(user);
  }
  res.json({ message: "user is already exist" });
};

const handleLogin = async (req, res) => {
  const { email } = req.body;
  console.log(`email ${email}`);
  const user = await User.findOne({ email });
  console.log(`user ${user}`);
  if (!user) res.json({ message: "user not exist" });
  //   const sessionId = uuidv4();
  //   setUser(sessionId, user);
  //   res.cookie("uid", sessionId, {
  //     httpOnly: true,
  //     secure: false, // true in production with HTTPS
  //     sameSite: "lax", // or "none" with secure: true if cross-site
  //   });
  const token = setUser(user);
  res.cookie("uid", token, {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax", // or "none" with secure: true if cross-site
  });
  res.json({ user, redirectTo: "/" });
};

const googleAuthHandle = async (req, res) => {
  const { name, email } = req.body;
  let user = await User.findOne({ email });

  console.log(`google call ${email}`);

  if (!user) {
    user = await User.create({ name, email, provider: "google" });
  }

  const token = setUser(user);
  console.log(token);
  res.cookie("uid", token, {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax", // or "none" with secure: true if cross-site
  });
  res.json({ user, redirectTo: "/" });
};

module.exports = { handleLogin, handleSignup, googleAuthHandle };
