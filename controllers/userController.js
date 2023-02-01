const User = require('../models/user');
const bcrypt = require('bcrypt');
const path = require('path');

// POST create new user
exports.user_create_post = function(req, res, next) {
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