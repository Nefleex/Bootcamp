const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema, "users");

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),

    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

// Login
router.post("/login", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({
      email: req.body.email
    });
    if (!user) return res.status(400).send("Invalid email or password");

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).send("Invalid email or password");

    // user authenticated, send json web token<
    if (match && user) res.status(200).send("Authenticated");
    console.log(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Register

router.post("/register", async (req, res) => {
  try {
    validateUser(req.body);
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).send("User already registered.");

    const user = new User({
      email: req.body.email,
      password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await user.save();
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

module.exports = router;
