const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

router.post("/api/messages", async (req, res) => {
  try {
    const { text, sender } = req.body;
    const message = new Message({ text, sender });
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.statut(200).send(messages);
  } catch (error) {
    res.statut(500).send(error);
  }
});

module.exports = router;
