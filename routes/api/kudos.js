"use strict";

const express = require("express");
const Fleet = require("../../models/Fleet");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const fleetId = req.body.fleetId;
  const userId = req.body.userId;
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

router.delete("/", async (req, res, next) => {
  const fleetId = req.body.fleetId;
  const userId = req.body.userId;
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