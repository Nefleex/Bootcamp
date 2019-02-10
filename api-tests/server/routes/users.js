const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require(".././models/user");
const auth = require("../Middleware/auth");

// Joi validating parameter against schema
function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .required(),
    address: Joi.string()
      .min(5)
      .max(255)
      .required(),
    city: Joi.string()
      .min(3)
      .max(255)
      .required(),
    postalCode: Joi.number()
      .min(2)
      .required()
  };
  return Joi.validate(user, schema);
}

// Joi login validation
function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(user, schema);
}

// Joi save validation
function validateUserOnSave(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    address: Joi.string()
      .min(5)
      .max(255)
      .required(),
    city: Joi.string()
      .min(3)
      .max(255)
      .required(),
    postalCode: Joi.number()
      .min(2)
      .required()
  };
  return Joi.validate(user, schema);
}

// Login
router.post("/login", async (req, res) => {
  try {
    const { error } = validateUser(req.body);

    // Find account whose email matches an email in database
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({
      email: req.body.email
    });
    if (!user) return res.status(400).send("Invalid email or password");

    // Compare password in request and hashed password in database
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).send("Invalid email or password");

    // User authenticated, send json web token
    if (match && user) {
      // Create and send json web token if password and user email match
      jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "30m" },
        (err, token) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Token creation failed");
          } else {
            res.status(200).send({ token: token });
          }
        }
      );
      console.log(user);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Email already registered.");

    user = new User({
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      city: req.body.city,
      postalCode: req.body.postalCode
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await user.save();
    console.log(result);
    res.status(200).json(`Account created. Your username is ${result.email}`);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

// Save changes
router.post("/save", async (req, res) => {
  try {
    const { error } = validateUserOnSave(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { email, city, address, postalCode } = req.body;
    User.findOneAndUpdate(
      { email: email },
      { $set: { city: city, address: address, postalCode: postalCode } }
    ).exec(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(user);
      }
    });

    const result = await user.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

// User info route
router.get("/me", auth, async (req, res) => {
  const email = req.email;
  const id = req.id;
  try {
    const result = await User.findById(id).select("-password");

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Internal server error");
    console.log(err);
  }
});

module.exports = router;
