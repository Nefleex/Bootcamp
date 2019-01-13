var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/node-blog");

var db = mongoose.connection;

db.on("error", function(err) {
  console.log("mongodb connection error: %s", err);
  process.exit();
});
db.once("open", function() {
  console.log("Successfully connected to mongodb");
  app.emit("dbopen");
});

var cors = require("cors");
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );
app.use(cors());
app.use(bodyParser.json());
// mongoose
//   .connect("mongodb://localhost:27017/node-blog")
//   .then(() => console.log("Connected.").catch(err => console.log(err)));
const userSchema = new mongoose.Schema({
  body: String,
  firstName: String,
  lastName: String
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("/", async (req, res) => {
  console.log("GET request made.");
  const result = await User.find();
  if (!result) {
    return res.send("Something went wrong.");
  }
  res.send(result);
});
app.post("/", async (req, res) => {
  console.log(req.body.firstName);
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  await user.save();
  if (
    function(error) {
      res.status(400).send("Unable to save data");
      return;
    }
  );
  res.send(user).status(200);
});

// Listen
app.listen(3000, () => {
  console.log("Server listening on 3000");
});
