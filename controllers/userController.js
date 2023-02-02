const User = require('../models/user');
const bcrypt = require('bcrypt');
const path = require('path');

// POST create new user
exports.userCreate = function(req, res, next) {
    // Get the data from the request
    const { name, email, password, avatar } = req.body;
    // Create a new user
    const user = new User({
        name,
        email,
        password,
        avatar
    });
    // Hash the password
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        // Save the user
        user.save((err) => {
            if (err) {
                return next(err);
            }
            res.status(201).json({ message: 'User created' });
        });
    });
};

// GET user list
exports.userList = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ users });
    });
};

// GET user by id
exports.userGetById = function(req, res, next) {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ user });
    });
};
