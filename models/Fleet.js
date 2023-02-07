"use strict";

const mongoose = require("mongoose");

const fleetSchema = mongoose.Schema ({
    userName: String,
    text: String,
    kudos: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
      }
    ],
    img: String,
    createdAt: Number,
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

// Export the Fleet model
module.exports = Fleet;