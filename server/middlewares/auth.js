const { getUser } = require("../services/auth");

const loginRestrection = (req, res, next) => {
  const uid = req.cookies?.uid;
  console.log(`login uid ${uid}`);
  if (!uid) res.json({ success: true, redirectTo: "/login" });
  const user = getUser(uid);
  console.log(`login user ${user}`);
  if (!user) res.json({ success: true, redirectTo: "/login" });
  req.user = user;
  next();
};

module.exports = { loginRestrection };
