"use strict";

const express = require("express");
const mongoose = require('mongoose');
const authChecker = require("../utils/authChecker");
const Fleet = require("../models/Fleet");
const User = mongoose.model('User');

const router = express.Router();

router.get("/private", authChecker, async (req, res, next) => {
  try {
    const skip = req.query.skip;
    const limit = req.query.limit;
    const fields = req.query.fields;
    const sort = req.query.sort;
    
    const user = await User.findById(req.user._id);
    const followedUsers = await User.find({_id: user.following});
    const followedUserNames = followedUsers.map((x)=>x.name)
    const filter = {userName: followedUserNames}

    const fleets = await Fleet.list(filter, skip, limit, fields, sort);
    res.json(fleets);
  } catch (err) {
    next(err);
    return;
  }
});

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

router.post("/", authChecker, async (req, res, next) => {
  const fleetPost = new Fleet({
    userName: (await User.findById(req.user._id)).name,
    text: req.body.text,
    img: req.body.img,
    createdAt: Date.now()
  });

  await Fleet.create(fleetPost);
  res.send(fleetPost);
});

router.delete("/:id", authChecker, async (req, res, next) => {
  const userName = (await User.findById(req.user._id)).name;
  const fleetToDelete = await Fleet.findById(req.params.id);
  if(userName !== fleetToDelete.userName){
    res.status(403).send();
  }else{
    Fleet.deleteOne({ _id: req.params.id })
      .then(() => {
        res.send();
      })
      .catch(() => {
        res.status(404).send();
      });
  }
});

module.exports = router;
