const mongoose = require('mongoose');

const message_thread_schema = new mongoose.Schema({
    messages: [{message: String, userId: String, sentAt: Date}],
    subject: {type: String, required: true},
    senderUserId: {type: String, required: true},
    receiverUserId: {type: String, required: true},
    isVisibleToSender: {type: Boolean, default: true},
    isVisibleToReceiver: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports.MessageThread = mongoose.model('Message_Thread', message_thread_schema);