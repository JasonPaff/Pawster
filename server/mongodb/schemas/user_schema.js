const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now}
});

module.exports.User = mongoose.model('User', user_schema);