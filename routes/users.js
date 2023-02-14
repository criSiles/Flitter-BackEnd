var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const authChecker = require('../utils/authChecker');

/* GET logout */
router.get('/logout', authChecker, function(req, res, next) {
  userController.userLogout(req, res, next);
});

/* GET users listing. */
router.get('/list', function(req, res, next) {
  userController.userList(req, res, next);
});

/* GET current user */
router.get('/current', authChecker, function(req, res, next) {
  userController.userGetCurrent(req, res, next);
});

/* GET user by id. */
router.get('/:id', function(req, res, next) {
  userController.userGetById(req, res, next);
});

/* GET user by id. */
router.get('/', function(req, res, next) {
  userController.userGetByName(req, res, next);
});

/* POST create user. */
router.post('/', function(req, res, next) {
  userController.userCreate(req, res, next);
});

/* PUT update user by id. */
router.put('/:id', authChecker, function(req, res, next) {
  userController.userUpdateById(req, res, next);
});

/* DELETE delete user by id. */
router.delete('/:id', authChecker, function (req, res, next) {
  userController.userDeleteById(req, res, next);
});

/* POST login user with body. */
router.post('/login', function(req, res, next) {
  userController.userLogin(req, res, next);
});

/* POST recover password with body. */
router.post('/recover', function(req, res, next) {
  console.log('recover password');
  userController.userRecoverPassword(req, res, next);
});

/* GET recover password with token. */
router.get('/recoverPass/:token', function(req, res, next) {  
  userController.userNewPassword(req, res, next);
});

module.exports = router;
