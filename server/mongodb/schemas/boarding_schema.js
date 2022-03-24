const mongoose = require('mongoose');

const boarding_schema = new mongoose.Schema({
    additionalPetRate: {type: Number, default: 0},
    bathingGroomingRate: {type: Number, default: 0},
    dailyRate: {type: Number, default: 0},
    dropOffRate: {type: Number, default: 0},
    holidayRate: {type: Number, default: 0},
    pickupRate: {type: Number, default: 0},
    userId: {type: String, required: true},
});

module.exports.Boarding = mongoose.model('Boarding', boarding_schema);