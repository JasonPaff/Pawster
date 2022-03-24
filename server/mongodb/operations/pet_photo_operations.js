const {Pet_Photo} = require("../schemas/pet_photo_schema");
const {isValidObjectId} = require("../../utils/database_utils");

module.exports.findPetPhoto = async (photoId) => {
    if (!isValidObjectId(photoId)) return false;
    return Pet_Photo.findOne({
        _id: photoId
    });
};

module.exports.findPetPhotos = async (petId) => {
    if (!isValidObjectId(petId)) return false;
    return Pet_Photo.find({
        petId: petId
    });
};

module.exports.findPetProfilePhoto = async (petId) => {
    if (!isValidObjectId(petId)) return false;
    return Pet_Photo.findOne({
        petId: petId,
        isProfilePhoto: true
    })
}

module.exports.addPetPhoto = async (photo) => {
    if (!isValidObjectId(photo.petId)) return false;
    const newPhoto = await new Pet_Photo(photo);
    await newPhoto.save();
    return newPhoto;
}

module.exports.updatePetProfilePhoto = async (petId, photoId) => {
    if (!isValidObjectId(petId)) return false;
    if (!isValidObjectId(photoId)) return false;
    await Pet_Photo.findOneAndUpdate({
        petId: petId,
        isProfilePhoto: true
    }, {isProfilePhoto: false});
    await Pet_Photo.findOneAndUpdate({
        photoId: photoId
    }, {isProfilePhoto: true});
}

module.exports.deletePetPhoto = async (photoId) => {
    if (!isValidObjectId(photoId)) return false;
    await Pet_Photo.findOneAndRemove({
        _id: photoId
    });
}

module.exports.deleteAllPetPhotos = async (petId) => {
    if (!isValidObjectId(petId)) return false;
    await Pet_Photo.remove({
        petId: petId
    });
}