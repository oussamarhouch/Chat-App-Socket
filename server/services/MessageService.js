const express = require("express");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const mongoose = require("mongoose");

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

router.get("/api/message", async (req, res) => {
  try {
    const id = req.body.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID");
    }

    const message = await Message.findOne({ _id: id });

    if (message) {
      res.status(200).send(message);
    } else {
      res.status(404).send("Message not found");
    }
  } catch (error) {
    console.error(error);

    res.status(500).send("An error occurred");
  }
});

router.get("/api/conversation", async (req, res) => {
  try {
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    console.log(sender);

    const conversation = await Conversation.find({
      $or: [{ senders: [sender, receiver] }, { senders: [receiver, sender] }],
    }).sort({ timestamp: 1 });

    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
