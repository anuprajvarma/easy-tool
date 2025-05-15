const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const User = require("./models/user");
const { setUser, getUser, checkUser, deleteUser } = require("./services/auth");
const { loginRestrection } = require("./middlewares/auth");

const app = express();
const PORT = 5001;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow Next.js frontend to access this API
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://anupraj1854:18NK3fCAO4UoBPAS@todocluster.9ag2fzh.mongodb.net/?retryWrites=true&w=majority&appName=todocluster"
  )
  .then(console.log("mongodb connected"));

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(email);
  const user = await User.create({
    name,
    email,
    password,
  });
  res.json(user);
});

app.post("/api/login", async (req, res) => {
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
});

app.get("/api/todolist", loginRestrection, async (req, res) => {
  console.log("to is running");
});

app.listen(PORT, () => console.log("server is started"));
