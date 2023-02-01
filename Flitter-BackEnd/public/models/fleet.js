"use strict";

const mongoose = require("mongoose");

const fleetSchema = mongoose.Schema ({
    id: Number,
    id_user: Number,
    text: String,
    kudos: Number,
    img: String,
});

const Fleet = mongoose.model("Fleet", fleetSchema);

// Export the User model
module.exports = Fleet;
