const mongoose = require('mongoose');

const notification_schema = new mongoose.Schema({
    createdAt: {type: Date, default: Date.now},
    fromUserId: {type: String, required: true},
    link: {type: String, default: 'Profile'},
    message: {type: String, required: true},
    toUserId: {type: String, required: true}
});

module.exports.Notification = mongoose.model('Notification', notification_schema);