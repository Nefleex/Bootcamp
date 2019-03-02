const Joi = require("joi");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", (req, res) => {
  const item = req.body;
  const { error, value } = Joi.validate(req.body, {
    email: Joi.string()
      .min(3)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required(),
    number: Joi.number()
      .min(3)
      .required()
  });
  console.log(req.body);
  console.log(error);
  console.log(value);

  res.send("Post request received");
});

app.listen("4000", () => {
  console.log("Listening on port 4000");
});
