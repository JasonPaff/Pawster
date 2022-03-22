const mongoose = require('mongoose');

module.exports.address_schema = new mongoose.Schema({
    userId: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number
});