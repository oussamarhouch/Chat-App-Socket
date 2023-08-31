const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  senders: [String],
  texts: [String],
});

const Conversation = mongoose.model("Conversations", conversationSchema);

module.exports = Conversation;
