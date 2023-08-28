const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  familyName: String,
  firstName: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
