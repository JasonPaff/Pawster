const mongoose = require('mongoose');

const daycare_schema = new mongoose.Schema({
    holidayRate: {type: Number, default: 0},
    dailyRate: {type: Number, default: 0},
    puppyRate: {type: Number, default: 0},
    userId: {type: String, required: true},
});

module.exports.Visit = mongoose.model('Daycare', daycare_schema);