const express = require("express");
const {
  handleLogin,
  handleSignup,
  googleAuthHandle,
} = require("../controllers/auth");

const router = express.Router();

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

router.post("/google-auth", googleAuthHandle);

module.exports = router;
