const mongoose = require('mongoose');

const notification_schema = new mongoose.Schema({
    userId: {type: String, required: true},
    message: {type: String, required: true},
    link: {type: String, default: 'Profile'},
    createdAt: {type: Date, default: Date.now}
});

module.exports.Notification = mongoose.model('Notification', notification_schema);