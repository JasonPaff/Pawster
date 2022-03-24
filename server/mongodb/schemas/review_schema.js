const mongoose = require('mongoose');

const review_schema = new mongoose.Schema({
    userId: {type: String, required: true},
    userIdReviewed: {type: String, required: true},
    review: {type: String, default: ' '},
    stars: {type: Number, default: 5},
    dateReviewed: {type: Date, default: Date.now},
});

module.exports.Sitting = mongoose.model('Review', review_schema);