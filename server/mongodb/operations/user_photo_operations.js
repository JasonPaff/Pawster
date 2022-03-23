const {User_Photo} = require("../schemas/user_photo_schema");
const {isValidObjectId} = require("../../utils/database_utils");

module.exports.findPhoto = async (photoId) => {
    if (!isValidObjectId(photoId)) return false;
    return User_Photo.findOne({
        _id: photoId
    });
};

module.exports.findProfilePhoto = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return User_Photo.findOne({
        userId: userId,
        isProfilePhoto: true
    });
};

module.exports.findPhotos = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return User_Photo.find({
        userId: userId
    });
};

module.exports.createPhoto = async (photo) => {
    if (!isValidObjectId(photo.userId)) return false;
    const newPhoto = await new User_Photo(photo);
    await newPhoto.save();
    return newPhoto;
}

module.exports.updatePhoto = async (updatedPhoto) => {
    if (!isValidObjectId(updatedPhoto)) return false;
    await User_Photo.findOneAndUpdate({
        userId: updatedPhoto.userId
    }, updatedPhoto);
}

module.exports.deletePhoto = async (photoId) => {
    if (!isValidObjectId(photoId)) return false;
    await User_Photo.findOneAndRemove({
        _id: photoId
    });
}

module.exports.deleteAllPhotos = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    await User_Photo.remove({
        userId: userId
    });
}