const express = require("express");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const router = express.Router();

router.post("/api/messages", async (req, res) => {
  try {
    const { text, sender, receiver } = req.body;
    const message = new Message({ text, sender });
    await message.save();

    let conversation = await Conversation.findOne({
      senders: { $all: [sender, receiver] },
    });
    if (!conversation) {
      conversation = new Conversation({
        senders: [sender, receiver],
        texts: [message._id],
      });
    } else {
      conversation.texts.push(message._id);
    }

    await conversation.save();

    res.status(201).send("writting correctly");
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
