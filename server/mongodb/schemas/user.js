const mongoose = require('mongoose');

module.exports.user_schema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    dateCreated: {type: Date, default: Date.now}
});