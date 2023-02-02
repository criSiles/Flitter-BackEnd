"use strict";
const mongoose = require("mongoose");

const fleet = require("./Fleet.js");


// Creating the User model
const userSchema = mongoose.Schema({
  id: Number,
  email: String,
  password: String,
  name: String,
  avatar: String,
  following: [{ id: Number }],
});

const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
