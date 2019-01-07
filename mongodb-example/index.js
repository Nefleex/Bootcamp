const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 27017;
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/namesDB")
  .then(() => console.log("Connected to mongodb"))
  .catch(err => console.log("Could not connect to mongodb", err));

app.listen(port);
console.log("Listening on port: " + port);

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.post("/", (req, res) => {
  console.log("POST request made on port: " + port);
});

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 2 },
  submitDate: { type: Date, default: Date.now }
});

async function createPerson() {
  const Person = mongoose.model("Person", personSchema);

  const person = new Person({
    name: "John Doe"
  });

  const result = await person.save();
  console.log(result);
}

createPerson();
