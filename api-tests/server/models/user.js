const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    min: [5, "Email must be atleast 5 characters"],
    max: [255, "Email can't exceed 255 characters"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  address: { type: String, required: [true, "Address is required"] },
  city: { type: String, required: [true, "City is required"] },
  postalCode: { type: String, required: [true, "Postal Code is required"] }
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
