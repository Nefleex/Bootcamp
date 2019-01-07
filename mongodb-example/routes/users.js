const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: email,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  })
);

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({
    name: req.body.name,
    email: req.body.email
  });
  user = await user.save();

  res.send(user);
});

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .email()
      .min(5)
      .max(50)
      .required()
  };
}

exports = router;
