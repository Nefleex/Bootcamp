const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log("listening at http://%s:%s", host, port);
});
