var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/list', function(req, res, next) {
  userController.userList(req, res, next);
});

/* GET user by id. */
router.get('/:id', function(req, res, next) {
  userController.userGetById(req, res, next);
});

/* POST create user. */
router.post('/', function(req, res, next) {
  userController.userCreate(req, res, next);
});


module.exports = router;
