const mongoose = require('mongoose');

const walking_schema = new mongoose.Schema({
    additionalDogRate: {type: Number, default: 0},
    baseRate: {type: Number, default: 0},
    holidayRate: {type: Number, default: 0},
    hourlyRate: {type: Number, default: 0},
    puppyRate: {type: Number, default: 0},
    userId: {type: String, required: true},
});

module.exports.Walking = mongoose.model('Walking', walking_schema);