"use strict";

const mongoose = require("mongoose");

const fleetSchema = mongoose.Schema ({
    id: Number,
    id_user: Number,
    text: String,
    kudos: Number,
    img: String,
});

fleetSchema.statics.list = function (
    filter,
    skip,
    limit,
    fields,
    sort
  ) {
    const query = Fleet.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec();
  };

const Fleet = mongoose.model("Fleet", fleetSchema);

// Export the User model
module.exports = Fleet;