const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const app = express();
const apiKey = "app_id=503e2195&app_key=b38968680e164a5e8d72f821b94cd9ff";
const fetch = require("node-fetch");
const moment = require("moment");
const bodyParser = require("body-parser");

// PROMISE.ALL ???

mongoose
  .connect(
    "mongodb://localhost:27017/programs",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to Mongodb"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// todo register user with email and password, login
// fetch from api, store -+month's channel schedules

const showSchema = new mongoose.Schema({
  startTime: Date,
  endTime: { type: Date, unique: true },
  title: String
});

const Show = mongoose.model("Show", showSchema);

async function createShow(startTime, endTime, title) {
  try {
    const show = new Show({
      startTime: startTime,
      endTime: endTime,
      title: title
    });
    const result = await show.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

getTvData = (offset1, offset2) => {
  fetch(
    `https://external.api.yle.fi/v1/programs/schedules.json?&service=yle-tv1&${formatTime(
      offset1,
      offset2
    )}&${apiKey} `
  )
    .then(res => res.json())
    .then(json =>
      json.data.map(item => {
        if (item.content.title.fi) {
          createShow(item.startTime, item.endTime, item.content.title.fi);
        } else {
          createShow(item.startTime, item.endTime, item.content.title.sv);
        }
      })
    );
};

formatTime = (offset1, offset2) => {
  let t = new Date();
  let t1 = new Date();
  t = moment(t);
  t1 = moment(t1);
  if (offset1 >= -1) {
    return `starttime=${t.format("YYYY")}-${t.format("MM")}-${t
      .add(`${offset1}`, "d")
      .format("DD")}T06%3A00%3A00.000%2B0200&endtime=${t.format(
      "YYYY"
    )}-${t.format("MM")}-${t1
      .add(`${offset2}`, "d")
      .format("DD")}T06%3A00%3A00.000%2B0200&`;
  } else {
  }
};

app.post("/users", (req, res) => {
  //
});

app.get("/api/shows/", (req, res) => {
  // http://localhost:3000/api/shows?startDate=123&endDate=345
  const startTime = req.query.startDate;
  const endTime = req.query.endDate;
  Show.find;
  console.log(startTime);

  res.send(startTime + ":" + endTime);
});

app.listen("3000");

getTvData(0, 1);
