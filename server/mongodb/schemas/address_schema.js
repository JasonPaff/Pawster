const mongoose = require('mongoose');

const address_schema = new mongoose.Schema({
    userId: {type: String, required: true},
    street: {type: String, default: ' '},
    city: {type: String, default: ' '},
    state: {type: String, default: ' '},
    zipcode: {type: Number, required: true},
});

module.exports.Address = mongoose.model('Address', address_schema);