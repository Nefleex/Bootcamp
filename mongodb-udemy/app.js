const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/namesDB")
  .then(() => console.log("Connected to mongodb"))
  .catch(err => console.log("Could not connect to mongodb", err));

  let db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  

const personSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name cannot be empty"], min: [2, "Name is too short"] },
  submitDate: { type: Date, default: Date.now }
});

const Person = mongoose.model("Person", personSchema);



// async function createPerson() {
//   const Person = mongoose.model("Person", personSchema);

//   const person = new Person({
//     name: "John Doe"
//   });

//   const result = await person.save();
//   console.log(result);
// }




