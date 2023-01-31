"use strict";

const mongoose = require("mongoose");

const fleet = mongoose.Schema ({
    id: Number,
    avatar: String,
    name: String,
    text: String,
    kudos: Number,
    img: String,
});


// Creating the User model
const user = mongoose.Schema ({
    id: Number,
    email: String,
    password: String,
    name: String,
    avatar: String,
    fleets: [fleet],
    following: [user],
});

const User = mongoose.model("User", userSchema);
const Fleet = mongoose.model("Fleet", fleetSchema);

// Export the User model
module.exports = User;
module.exports = Fleet;
