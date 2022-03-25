const mongoose = require('mongoose');

const message_schema = new mongoose.Schema({
    chatId: Number,
    subject: String,
    message: String,
    sender: String,
    receiver: String,
    sentAt: { type: Date, default: Date.now },
});

module.exports.Message = mongoose.model('Message', message_schema);