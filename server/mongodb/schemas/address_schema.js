const mongoose = require('mongoose');

const address_schema = new mongoose.Schema({
    city: {type: String, default: ' '},
    state: {type: String, default: ' '},
    street: {type: String, default: ' '},
    userId: {type: String, required: true},
    zipcode: {type: Number, required: true},
});

module.exports.Address = mongoose.model('Address', address_schema);