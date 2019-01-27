const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

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
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

// Login
router.post("/login", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password
  }).select("-password");
  if (user) {
    res.send(user);
    console.log(user);
  }

  if (!user) {
    res.status(400).send("Invalid email or password");
  } else {
    res.status(500).send("Internal server error");
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
    const result = await user.save();
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
