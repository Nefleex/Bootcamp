const mongoose = require("mongoose");
const router = express.Router();

const showSchema = new mongoose.Schema({
  startTime: { type: Date, unique: true },
  endTime: { type: Date, unique: true },
  title: String,
  description: String,
  channel: String
});

const Show = mongoose.model("Show", showSchema);

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

router.get("/", async (req, res) => {
  // http://localhost:3000/api/shows?startDate=123&endDate=345
  const startTime = new Date(req.query.startDate);
  const endTime = new Date(req.query.endDate);
  const channel = req.query.channel;

  // Show.find;

  const result = await getShowsBetweenDates(startTime, endTime, channel);
  res.send(result);
});
