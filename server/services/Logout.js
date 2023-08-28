const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "An error occurred." });
    }
    res.json({ success: true, message: "Logged out successfully." });
  });
});

module.exports = router;
