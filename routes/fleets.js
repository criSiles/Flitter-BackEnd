let express = require('express');
let router = express.Router();
const Fleet = require("../models/Fleet.js")

router.get('/', async (req, res, next)=>{
  res.send('TODO')
})

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
