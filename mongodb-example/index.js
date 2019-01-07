const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/users");

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("Connected MongoDB"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use("/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
