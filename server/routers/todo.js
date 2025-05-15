const express = require("express");
const { loginRestrection } = require("../middlewares/auth");

const router = express.Router();

// router.post("/todo", );

router.get("/todo", loginRestrection, async (req, res) => {
  console.log("to is running");
});

// router.delete("/todo", handleSignup);

// router.patch("/todo", handleLogin);

// router.put("/todo");

module.exports = router;
