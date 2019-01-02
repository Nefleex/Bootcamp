const express = require("express");
const app = express();
app.use(express.json());
const Joi = require("joi");

/*
*manage list of genres
*endpoint to get genres
update, delete, create CRUD
*
*
*/

const genres = [
  { id: "1", genre: "action" },
  { id: "2", genre: "adventure" },
  { id: "3", genre: "scifi" }
];

// Get all genres

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// Get specific id genre

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) res.status(404).send("The genre with given ID doesn't exist");
});

// Create a genre object

app.post("/api/genres/", (req, res) => {
  const schema = {
    genre: Joi.string()
      .min(2)
      .required()
  };

  const result = Joi.validate(req.body, schema);

  if(result.error){
      res.status(400).send(result.error);
  }

  const genre = {
    id: genres.length + 1,
    genre: req.body.genre
  };
  genres.push(genre);
  res.send(genre);
});
