const express = require("express");
const {
  handleLogin,
  handleSignup,
  handleSignout,
  googleAuthHandle,
} = require("../controllers/auth");

const router = express.Router();

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

router.post("/signout", handleSignout);

router.post("/google-auth", googleAuthHandle);

module.exports = router;
