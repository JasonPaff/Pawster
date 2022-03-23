const mongoose = require('mongoose');

const pet_schema = new mongoose.Schema({
    additionalInfo: {type: String, default: ' '},
    ageMonth: {type: Number, default: 0},
    ageYear: {type: Number, default: 0},
    breed: {type: String, default: ' '},
    canBeLeftAlone: {type: Boolean, default: ' '},
    description: {type: String, default: ' '},
    energyLevel: {type: String, default: ' '},
    feedingSchedule: {type: String, default: ' '},
    isFixed: {type: Boolean, default: false},
    isHouseBroken: {type: Boolean, default: false},
    isFriendlyToChildren: {type: Boolean, default: false},
    isFriendlyToOtherDogs: {type: Boolean, default: false},
    isFriendlyToOtherCats: {type: Boolean, default: false},
    isMicroChipped: {type: Boolean, default: false},
    medication: {type: String, default: ' '},
    medicationInstructions: {type: String, default: ' '},
    name: {type: String, default: ' '},
    pottySchedule: {type: String, default: ' '},
    type: {type: String, default: ' '},
    userId: {type: String, required: true},
    vetDetails: {type: String, default: ' '},
    weight: {type: Number, default: 0},
});

module.exports.Pet = mongoose.model('Pet', pet_schema);