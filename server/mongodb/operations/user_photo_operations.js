const {User_Photo} = require("../schemas/user_photo_schema");
const {isValidObjectId} = require("../../utils/database_utils");

module.exports.findUserPhoto = async (photoId) => {
    if (!isValidObjectId(photoId)) return false;
    return User_Photo.findOne({
        _id: photoId
    });
};

module.exports.findUserPhotos = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return User_Photo.find({
        userId: userId
    });
};

module.exports.findUserProfilePhoto = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return User_Photo.findOne({
        userId: userId,
        isProfilePhoto: true
    });
};

module.exports.addUserPhoto = async (photo) => {
    if (!isValidObjectId(photo.userId)) return false;
    const newPhoto = await new User_Photo(photo);
    await newPhoto.save();
    return newPhoto;
}

module.exports.updateUserProfilePhoto = async (userId, photoId) => {
    if (!isValidObjectId(userId)) return false;
    if (!isValidObjectId(photoId)) return false;
    await User_Photo.findOneAndUpdate({
        userId: userId,
        isProfilePhoto: true
    }, {isProfilePhoto: false});
    await User_Photo.findOneAndUpdate({
        photoId: photoId
    }, {isProfilePhoto: true});
}

module.exports.deleteUserPhoto = async (photoId) => {
    if (!isValidObjectId(photoId)) return false;
    await User_Photo.findOneAndRemove({
        _id: photoId
    });
}

module.exports.deleteAllUserPhotos = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    await User_Photo.remove({
        userId: userId
    });
}