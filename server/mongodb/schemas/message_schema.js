const mongoose = require('mongoose');

const message_schema = new mongoose.Schema({
    message: {type: String, required: true},
    userId: {type: String, required: true},
    sentAt: {type: Date, default: Date.now},
});

module.exports.Message = mongoose.model('Message', message_schema);