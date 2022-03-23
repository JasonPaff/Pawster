const {Pet_Photo} = require("../schemas/pet_photo_schema");
const {isValidObjectId} = require("../../utils/database_utils");

module.exports.findPhoto = async (photoId) => {
    if (!isValidObjectId(photoId)) return false;
    return Pet_Photo.findOne({
        _id: photoId
    });
};

module.exports.findPhotos = async (petId) => {
    if (!isValidObjectId(petId)) return false;
    return Pet_Photo.find({
        petId: petId
    });
};

module.exports.createPhoto = async (photo) => {
    if (!isValidObjectId(photo.petId)) return false;
    const newPhoto = await new Pet_Photo(photo);
    await newPhoto.save();
    return newPhoto;
}

module.exports.updatePhoto = async (updatedPhoto) => {
    if (!isValidObjectId(updatedPhoto)) return false;
    await Pet_Photo.findOneAndUpdate({
        petId: updatedPhoto.petId
    }, updatedPhoto);
}

module.exports.deletePhoto = async (photoId) => {
    if (!isValidObjectId(photoId)) return false;
    await Pet_Photo.findOneAndRemove({
        _id: photoId
    });
}

module.exports.deleteAllPhotos = async (petId) => {
    if (!isValidObjectId(petId)) return false;
    await Pet_Photo.remove({
        petId: petId
    });
}