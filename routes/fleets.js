"use strict";

const express = require("express");
const Fleet = require("../models/Fleet");

const router = express.Router();

// GET /api/fleets
router.get("/", async (req, res, next) => {
  try {
    // filter
    const _id = req.query._id;
    const userName = req.query.userName
    const text = req.query.text;
    const kudos = req.query.kudos;
    const createdAt = req.query.createdAt;

    // pagination
    const skip = req.query.skip;
    const limit = req.query.limit;
    // select fields
    const fields = req.query.fields;
    // sort
    const sort = req.query.sort;

    const filter = {};

    if (_id) {
      filter._id = _id;
    }

    if (userName) {
      filter.userName = userName;
    }

    if (text) {
      filter.text = new RegExp(req.query.text, "i");
    }

    if (kudos) {
      filter.kudos = kudos;
    }

    if (createdAt) {
      filter.createdAt = createdAt;
    }

    const fleets = await Fleet.list(filter, skip, limit, fields, sort);
    res.json(fleets);
  } catch (err) {
    next(err);
    return;
  }
});

router.post("/", async (req, res, next) => {
  const fleetPost = new Fleet({
    userName: req.body.userName,
    text: req.body.text,
    img: req.body.img,
  });

  await Fleet.create(fleetPost);
  res.send(fleetPost);
});

router.delete("/:id", async (req, res, next) => {
  await Fleet.deleteOne({ _id: req.params.id })
    .then(() => {
      res.send();
    })
    .catch(() => {
      res.status(404).send();
    });
});

module.exports = router;
