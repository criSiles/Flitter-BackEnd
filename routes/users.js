var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET logout */
router.get('/logout', function(req, res, next) {
  userController.userLogout(req, res, next);
});

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

/* PUT update user by id. */
router.put('/:id', function(req, res, next) {
  userController.userUpdateById(req, res, next);
});

/* DELETE delete user by id. */
router.delete('/:id', function(req, res, next) {
  userController.userDeleteById(req, res, next);
});

/* POST login user with body. */
router.post('/login', function(req, res, next) {
  userController.userLogin(req, res, next);
});

module.exports = router;
