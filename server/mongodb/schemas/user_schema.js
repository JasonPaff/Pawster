const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    email: String,
    password: String,
    dateCreated: {type: Date, default: Date.now}
});

module.exports.User = mongoose.model('User', user_schema);