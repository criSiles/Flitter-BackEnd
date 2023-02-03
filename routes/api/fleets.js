"use strict";

const express = require("express");
const Fleet = require("../../models/Fleet");

const router = express.Router();

// GET /api/fleets
router.get("/", async (req, res, next) => {
  try {
    // filter
    const id = req.query.id;
    const id_user = req.query.id_user;
    const text = req.query.text;
    const kudos = req.query.kudos;
    const img = req.query.img;

    // pagination
    const skip = req.query.skip;
    const limit = req.query.limit;
    // select fields
    const fields = req.query.fields;
    // sort
    const sort = req.query.sort;

    const filter = {};

    if (id) {
      filter.id = id;
    }

    if (id_user) {
      filter.id_user = id_user;
    }

    if (text) {
      filter.text = new RegExp("^" + req.query.text, "i");
    }

    if (kudos) {
      filter.kudos = kudos;
    }

    if (img) {
      filter.img = img;
    }

    const fleets = await Fleet.list(filter, skip, limit, fields, sort);
    res.json(fleets);
  } catch (err) {
    next(err);
    return;
  }
});

router.post('/', async (req, res, next)=>{
  const fleetPost = new Fleet({
    id_user: req.body.id_user,
    text: req.body.text,
    img: req.body.img,
	});

	await Fleet.create(fleetPost)
	res.send(fleetPost)
});

router.delete('/:id', async (req, res, next) => {
  await Fleet.deleteOne({_id: req.params.id}).then(() => {
      res.send();
    }).catch(()=>{
      res.status(404).send()
    })
});
  

module.exports = router;
