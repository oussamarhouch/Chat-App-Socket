const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ success: true, message: "Logged out successfully." });
});

module.exports = router;
