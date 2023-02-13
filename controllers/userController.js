const User = require("../models/user");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

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
      return res
        .status(400)
        .json({ error: "The e-mail address is already registered" });
    }
    // Check if the user name is already registered
    const userNameExists = await User.findOne({ name });
    if (userNameExists) {
      return res
        .status(400)
        .json({ error: "The user name is already registered" });
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
exports.userGetById = function (req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ user });
  });
};

// GET user by email
exports.userGetByEmail = function (req, res, next) {
  User.findOne({ email: req.params.email }, (err, user) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ user });
  });
};

// GET user by name
exports.userGetByName = function (req, res, next) {
  User.findOne({ name: req.query.name }, (err, user) => {
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
        return res
          .status(400)
          .json({ error: "The e-mail address is already registered" });
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

    // Check if the password is correct
    if (!req.body.password) {        
        return res.status(401).json({ error: "Password is required" });    
    } else {      
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(401).json({ error: "Password is not valid" });
      }
      // Delete user
      await user.remove();
      return res.json({ message: "User successfully deleted" });
    }    
  } catch (error) {
    return res.status(500).json({ error: "Error deleting user" + error });
  }
};

// GET logout user
exports.userLogout = async (req, res) => {
  console.log(req.session);
  req.session.destroy();
  res.status(200).json({ message: "Logged out!" });
  // res.redirect('/');
};

// POST login user with body
exports.userLogin = async (req, res) => {
  // Get the data from the request
  const { email, password } = req.body;
  // Check if the user exists
  User.findOne({ email: email }, async (err, user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Check if the password is correct
    console.log(user);
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, "TOKEN_SECRET", {
      expiresIn: "1h",
    });
    //res.header('auth-token', token).json({ token });
    return res.status(200).json({ message: "Logged in!", authToken: token });
  });
};

// POST recover password
exports.userRecoverPassword = async (req, res) => {
  // Get the data from the request
  const { email } = req.body;
  // Check if the user exists
  User.findOne({ email: email }, async (err, user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Generate a temporary password
    let tempPass = Math.random().toString(36).slice(-8);
    // Create and assign a token
    let token = jwt.sign({_id: user._id, pass: tempPass}, 'RECOVER_SECRET', {
      expiresIn: '1h'
    });    
    // Send email with the token    
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'rosalee.williamson29@ethereal.email',
          pass: '66vjrAfCFy7WgcnQfY'
      }
    }); 
    // setup url like a link
    url = "<a href='http://localhost:3000/users/recoverPass/" + token + "'>push</a>";
    // make a html template    
    let html = "<!DOCTYPE html><html><head><title></title></head><body><main><h1>Password recovery email</h1><p>Hi from your flitter project, this is your token:" + url + " to recover your account</p><p>Your new temporary pass is: " + tempPass + "</p></main></body></html>";    
    // test link
    console.log(url);
    // send mail with defined transport object
    let mailOptions = {
      from: 'caleigh.jacobson43@ethereal.email',
      to: user.email,
      subject: 'Flitter Project',
      html: html,
      text: html      
    };
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log('Error: ' + err);
      } else {
        console.log('Email sent successfully');
      }
    });
    return res.status(200).json({ message: "Email sent!" })
  });
};

// GET generate new password
exports.userNewPassword = async (req, res) => {
  // Check the token from url params
  const token = req.params.token;
  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }
  // Check if the token is valid
  const validToken = jwt.verify(token, "RECOVER_SECRET");
  if (!validToken) {
    return res.status(401).json({ error: "Invalid token" });
  }
  // Check if the user exists
  User.findOne({ _id: validToken._id }, async (err, user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Check if the password is correct
    if (!validToken.pass) {
      return res.status(401).json({ error: "Password is required" });
    } else {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(validToken.pass, salt);
      // Update the user
      Object.assign(user, { password: hashedPassword });
      await user.save();
      return res.json({ message: "Password updated!" });
    }
  });
};


