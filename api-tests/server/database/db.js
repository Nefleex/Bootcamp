const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://localhost:27017/tv-app", { useNewUrlParser: true })
    .then(() => console.log("Connected to Mongodb"))
    .catch(err => console.log(err));
};
