const mongoose = require('mongoose');

const boarding_schema = new mongoose.Schema({
    additionalCatRate: {type: Number, default: 0},
    additionalDogRate: {type: Number, default: 0},
    baseRate: {type: Number, default: 0},
    bathingRate: {type: Number, default: 0},
    catRate: {type: Number, default: 0},
    dailyRate: {type: Number, default: 0},
    extendedCareRate: {type: Number, default: 0},
    holidayRate: {type: Number, default: 0},
    pickUpDropOffRate: {type: Number, default: 0},
    userId: {type: String, required: true},
});

module.exports.Boarding = mongoose.model('Boarding', boarding_schema);