const mongoose = require('mongoose');

const user_photo_schema = new mongoose.Schema({
    userId: {type: String, required: true},
    photo: {type: String, required: true},
    photoType: {type: String, required: true},
    isProfilePhoto: {type: Boolean, default: true}
});

module.exports.User_Photo = mongoose.model('User_Photo', user_photo_schema);