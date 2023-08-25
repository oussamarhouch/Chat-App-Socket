const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/chatApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to database");
});

const messageSchema = new mongoose.Schema({
  text: String,
  sender: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

app.post("/api/messages", async (req, res) => {
  try {
    const { text, sender } = req.body;
    const message = new Message({ text, sender });
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.statut(200).send(messages);
  } catch (error) {
    res.statut(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
