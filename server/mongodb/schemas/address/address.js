const mongoose = require('mongoose');

module.exports.address_schema = new mongoose.Schema({
    email: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number
});