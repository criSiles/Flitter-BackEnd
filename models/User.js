const mongoose = require("mongoose");

// Creating the User model
const userSchema = mongoose.Schema({
  id: Number,
  email: String,
  password: {type:String, select:false},
  name: String,
  avatar: String,
  following: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }],
});

const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
