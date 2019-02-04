const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const app = express();
let apiKey = "";
const fetch = require("node-fetch");
const moment = require("moment");
const bodyParser = require("body-parser");
const users = require("./routes/users");

const cors = require("cors");
require("dotenv").config();

// PROMISE.ALL ???

// Check that index.js has been run with API_KEY set
if (process.env.API_KEY && process.env.JWT_PRIVATE_KEY) {
  console.log("Api key and JWT Secret have been set, proceeding...");
} else {
  throw new Error("Set environment variables on next start up");
  process.exit(1);
}

mongoose
  .connect(
    "mongodb://localhost:27017/tv-app",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to Mongodb"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
cors({ credentials: true, origin: true });
app.use("/users/", users);

// app.post("/register", (req, res) => {
//   //
// });

app.get("/api/shows/", async (req, res) => {
  // http://localhost:3000/api/shows?startDate=123&endDate=345
  const startTime = new Date(req.query.startDate);
  const endTime = new Date(req.query.endDate);
  const channel = req.query.channel;

  // Show.find;

  const result = await getShowsBetweenDates(startTime, endTime, channel);
  res.send(result);
});

async function getShowsBetweenDates(a, b, source) {
  const result = await Show.find({
    channel: source
  });
  console.log(result);
  return result;
}

// todo register user with email and password, login
// fetch from api, store -+month's channel schedules

const showSchema = new mongoose.Schema({
  startTime: { type: Date, unique: true },
  endTime: { type: Date, unique: true },
  title: String,
  description: String,
  channel: String
});

const Show = mongoose.model("Show", showSchema, "shows");

async function createShow(startTime, endTime, title, description, source) {
  try {
    const show = new Show({
      startTime: startTime,
      endTime: endTime,
      title: title,
      description: description,
      channel: source
    });
    const result = await show.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
urlYle1 =
  "https://external.api.yle.fi/v1/programs/schedules.json?&service=yle-tv1&";

urlYle2 =
  "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv2&";

urlYleTeema =
  "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-teema-fem&";

urlYleAreena =
  "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-areena&";

getTvData = (offset1, offset2, url) => {
  fetch(`${url}${formatTime(offset1, offset2)}&${process.env.API_KEY} `)
    .then(res => res.json())
    .then(json =>
      json.data.map(item => {
        if (item.content.title.fi) {
          createShow(
            item.startTime,
            item.endTime,
            item.content.title.fi,
            item.content.description.fi,
            item.service.id
          );
        } else {
          createShow(
            item.startTime,
            item.endTime,
            item.content.title.sv,
            item.content.description.sv,
            item.service.id
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
    return `starttime=${t
      .add(`${offset1}`, "d")
      .format("YYYY-MM-DD")}T06%3A00%3A00.000%2B0200&endtime=${t1
      .add(`${offset2}`, "d")
      .format("YYYY-MM-DD")}T06%3A00%3A00.000%2B0200&`;
  } else {
  }
};

app.listen("3000");

<<<<<<< HEAD
for (let i = 0; i <= 5; i++) {
  getTvData(i, i + 1, urlYle1);
}

for (let i = 0; i <= 5; i++) {
  getTvData(i, i + 1, urlYle2);
}

for (let i = 0; i <= 5; i++) {
  getTvData(i, i + 1, urlYleTeema);
}

for (let i = 0; i <= 5; i++) {
  getTvData(i, i + 1, urlYleAreena);
}

=======
>>>>>>> db571e3820efef2ed91c6ec0862b33fa2732dd6e
async function getShows() {
  const result = await Show.find().sort("endTime: -1");
  console.log(result);
}

Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// const now = new Date();
// let nextTimeLimit = new Date();
// nextTimeLimit = nextTimeLimit.addDays(8);

// getShowsBetweenDates(now, nextTimeLimit);

// console.log(nextTimeLimit);

// for (let i = 0; i <= 7; i++) {
//   getTvData(i, i + 1, urlYle1);
// }

// for (let i = 0; i <= 7; i++) {
//   getTvData(i, i + 1, urlYle2);
// }

// for (let i = 0; i <= 7; i++) {
//   getTvData(i, i + 1, urlYleTeema);
// }

// for (let i = 0; i <= 7; i++) {
//   getTvData(i, i + 1, urlYleAreena);
// }

// getTvData(0, 1, urlYle1);
// getTvData(1, 2, urlYle1);
// getTvData(2, 3, urlYle1);
// getTvData(3, 4, urlYle1);
// getTvData(4, 5, urlYle1);
