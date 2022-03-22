const mongoose = require('mongoose');

const address_schema = new mongoose.Schema({
    userId: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number
});

module.exports.Address = mongoose.model('Address', address_schema);