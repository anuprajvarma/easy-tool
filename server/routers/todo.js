const express = require("express");
const { loginRestrection } = require("../middlewares/auth");

const router = express.Router();

// router.post("/todo", );

router.get("/todo", loginRestrection, async (req, res) => {
  const user = req.user;
  res.json({ user });
});

// router.delete("/todo", handleSignup);

// router.patch("/todo", handleLogin);

// router.put("/todo");

module.exports = router;
