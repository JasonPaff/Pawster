const mongoose = require('mongoose');

const visit_schema = new mongoose.Schema({
    holidayRate: {type: Number, default: 0},
    hourlyRate: {type: Number, default: 0},
    puppyRate: {type: Number, default: 0},
    catRate: {type: Number, default: 0},
    userId: {type: String, required: true},
    visitRate: {type: Number, default: 0},
});

module.exports.Visit = mongoose.model('Visit', visit_schema);