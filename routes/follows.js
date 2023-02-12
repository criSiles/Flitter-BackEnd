"use strict";

const express = require("express");
const authChecker = require("../utils/authChecker");
const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = express.Router();

router.post("/", authChecker, async (req, res, next) => {
  const userIdToFollow = req.body.userId;
  const userId = req.user._id;

  User.updateOne({_id: userId}, {$addToSet: {following: userIdToFollow}})
    .then((result)=>{
      if(result.matchedCount !== 1){
        res.status(404).send();
      }else if(result.modifiedCount !== 1){
        res.status(422).send();
      } else {
        res.send();
      }
    })
    .catch(()=>{
      res.status(500).send();
    })
});

router.delete("/", authChecker, async (req, res, next) => {
  const userIdToFollow = req.body.userId;
  const userId = req.user._id;

  User.updateOne({_id: userId}, {$pull: {following: userIdToFollow}})
    .then((result)=>{
      if(result.matchedCount !== 1){
        res.status(404).send();
      }else if(result.modifiedCount !== 1){
        res.status(422).send();
      } else {
        res.send();
      }
    })
    .catch(()=>{
      res.status(500).send();
    })
});

module.exports = router;