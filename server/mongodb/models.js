const mongoose = require("mongoose");
const {user_schema} = require("./schemas/user");
const {address_schema} = require("./schemas/address");

module.exports.User = mongoose.model('User', user_schema);
module.exports.Address = mongoose.model('Address', address_schema);