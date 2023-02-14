"use strict";

const express = require("express");
const Fleet = require("../models/Fleet");
const authChecker = require('../utils/authChecker');

const router = express.Router();

router.post("/", authChecker, async (req, res, next) => {
  const fleetId = req.body.fleetId;
  const userId = req.user._id;
  Fleet.updateOne({_id: fleetId}, {$addToSet: {kudos: userId}})
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
  const fleetId = req.body.fleetId;
  const userId = req.user._id;
  Fleet.updateOne({_id: fleetId}, {$pull: {kudos: userId}})
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