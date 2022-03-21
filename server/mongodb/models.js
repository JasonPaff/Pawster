const mongoose = require("mongoose");
const {user_schema} = require("./schemas/user");

module.exports.User = mongoose.model('User', user_schema);