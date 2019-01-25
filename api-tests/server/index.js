const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const app = express();
let apiKey = "";
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

app.post("/users", (req, res) => {
  //
});

app.get("/api/shows/", async (req, res) => {
  // http://localhost:3000/api/shows?startDate=123&endDate=345
  const startTime = new Date(req.query.startDate);
  const endTime = new Date(req.query.endDate);
  // Show.find;

  const result = await getShowsBetweenDates(startTime, endTime);
  res.send(result);
});

// todo register user with email and password, login
// fetch from api, store -+month's channel schedules

const showSchema = new mongoose.Schema({
  startTime: { type: Date, unique: true },
  endTime: { type: Date, unique: true },
  title: String,
  description: String
});

const Show = mongoose.model("Show", showSchema);

async function createShow(startTime, endTime, title, description) {
  try {
    const show = new Show({
      startTime: startTime,
      endTime: endTime,
      title: title,
      description: description
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
    )}&${process.env.API_KEY} `
  )
    .then(res => res.json())
    .then(json =>
      json.data.map(item => {
        if (item.content.title.fi) {
          createShow(
            item.startTime,
            item.endTime,
            item.content.title.fi,
            item.content.description.fi
          );
        } else {
          createShow(
            item.startTime,
            item.endTime,
            item.content.title.sv,
            item.content.description.sv
          );
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

app.listen("3000");

for (let i = 0; i <= 5; i++) {
  getTvData(i, i + 1);
}

async function getShows() {
  const result = await Show.find().sort("endTime: -1");
  console.log(result);
}

Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

async function getShowsBetweenDates(a, b) {
  const result = await Show.find({
    startTime: {
      $lte: b,
      $gte: a
    }
  }).select({ _id: 0 });
  console.log(result);
  return result;
}
const now = new Date();
let nextTimeLimit = new Date();
nextTimeLimit = nextTimeLimit.addDays(8);

// getShowsBetweenDates(now, nextTimeLimit);

console.log(nextTimeLimit);
