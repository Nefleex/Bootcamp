const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const app = express();
const fetch = require("node-fetch");
const moment = require("moment");
const bodyParser = require("body-parser");
const users = require("./routes/users");
const auth = require("./routes/auth");
const headers = require("./Middleware/headers");
const Show = require("./models/show");

// const { getTvData, shows } = require("./routes/shows");

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
app.use(headers);
app.use("/users/", users);
app.use("/api/auth/", auth);
// app.use("/api/shows/", shows);

// app.post("/register", (req, res) => {
//   //
// });

app.get("/api/shows/", async (req, res) => {
  // http://localhost:3000/api/shows?startDate=123&endDate=345
  let startTime = new Date(req.query.startDate);
  let endTime = new Date(req.query.endDate);
  const channel = req.query.channel;

  // Show.find;

  const result = await getShowsBetweenDates(startTime, endTime, channel);
  res.send(result);
});

async function getShowsBetweenDates(a, b, source) {
  console.log(a, b, source);
  const result = await Show.find({
    channel: source,
    startTime: {
      $gte: `${a}`,
      $lt: `${b}`
    }
  });
  console.log(result);
  return result;
}

// const showSchema = new mongoose.Schema({
//   startTime: { type: Date, unique: true },
//   endTime: { type: Date, unique: true },
//   title: String,
//   description: String,
//   channel: String
// });

// const Show = mongoose.model("Show", showSchema, "shows");

async function createShow(startTime, endTime, title, description, source) {
  try {
    const show = new Show({
      startTime: new Date(startTime),
      endTime: new Date(endTime),
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

// Show.remove({}, function(err) {
//   console.log("collection removed");
// });
// getTvData(0, 1, urlYle1);
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
