var express = require("express");
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/node-blog");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
var postSchema = new mongoose.Schema({ body: String });
var Post = mongoose.model("Post", postSchema);
// Routes
app.get("/", (req, res) => {
  const posts = Post.find();
  Post.find({}, (err, posts) => {
    res.send(posts).status(200);
  });
});
app.post("/addpost", (req, res) => {
  var postData = new Post(req.body);
  postData
    .save()
    .then(result => {
      res.redirect("/");
    })
    .catch(err => {
      res.status(400).send("Unable to save data");
    });
});

// Listen
app.listen(3000, () => {
  console.log("Server listing on 3000");
});
