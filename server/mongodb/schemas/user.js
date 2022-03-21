const mongoose = require('mongoose');

module.exports.user_schema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    date_created: {type: Date, default: Date.now},
    profile_picture: String
});