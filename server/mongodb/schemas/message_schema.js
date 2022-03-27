const mongoose = require('mongoose');

const message_schema = new mongoose.Schema({
    chatId: Number,
    subject: String,
    message: String,
    sender: String,
    receiver: String,
    displayForSender: {type: Boolean, default: true},
    displayForReceiver: {type: Boolean, default: true},
    sentAt: {type: Date, default: Date.now},
});

module.exports.Message = mongoose.model('Message', message_schema);