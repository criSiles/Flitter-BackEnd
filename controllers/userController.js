const User = require('../models/user');
const bcrypt = require('bcrypt');
const path = require('path');

// POST create new user (Restriction: you cannot create a user with an existing email address.)
exports.userCreate = async (req, res) => {
    try {
        // Get the data from the request    
        const { email, password, name, avatar } = req.body;
        // Create a new user
        const user = new User({ email, password, name, avatar });
        // Check if the email is already registered
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ error: "The e-mail address is already registered" });
        }
        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user.password = hashPassword;
        // Save the user
        await user.save();
        return res.status(201).json({ message: "User created!" });        
    } catch (err) {
        return res.status(500).json({ error: "Error creating user" });
    }    
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

// GET user by email
exports.userGetByEmail = function(req, res, next) {
    User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ user });
    });
};

// PUT update user by id
exports.userUpdateById = async (req, res) => {
    try {
        const { email } = req.body; // Obtain the e-mail address of the request body
    
        // Check if the user exists
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Check if the new email is already registered
        if (email && email !== user.email) {
          const emailExists = await User.findOne({ email });
          if (emailExists) {
            return res.status(400).json({ error: "The e-mail address is already registered" });
          }
        }
    
        // Update the user
        Object.assign(user, req.body);
        await user.save();
    
        return res.json({ message: "Updated user!" });
      } catch (error) {
        return res.status(500).json({ error: "Error updating user" });
      }
};

// DELETE user by id
exports.userDeleteById = async (req, res) => {
    try {
        // Check if the user exists
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Delete user
        await user.remove();
    
        return res.json({ message: "User successfully deleted" });
      } catch (error) {
        return res.status(500).json({ error: "Error deleting user" });
      }
}
