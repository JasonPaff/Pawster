const mongoose = require('mongoose');

const order_schema = new mongoose.Schema({
    userId: {type: String, required: true},
    hostId: {type: String, required: true},
    service: {type: String, required: true},
    total: {type: Number, required: true},
    date: {type: Date, required: true}
});

module.exports.Order = mongoose.model('Order', order_schema);