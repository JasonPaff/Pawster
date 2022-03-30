const {Pet} = require("../schemas/pet_schema");
const {isValidObjectId} = require("../../utils/database_utils");
const {deleteAllPetPhotos} = require("./pet_photo_operations");

module.exports.findPet = async (petId) => {
    if (!isValidObjectId(petId)) return false;
    return Pet.findOne({
        _id: petId
    });
};

module.exports.findPets = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Pet.find({
        userId: userId
    });
};

module.exports.doesPetExist = async (petId) => {
    if (!isValidObjectId(petId)) return false;
    return Pet.exists({
        _id: petId
    });
};

module.exports.createPet = async (userId, pet) => {
    if (!isValidObjectId(userId)) return false;
    pet.userId = userId;
    const newPet = await new Pet(pet);
    await newPet.save();
    return newPet;
};

module.exports.updatePet = async (petId, pet) => {
    if (!isValidObjectId(petId)) return false;
    await Pet.findOneAndUpdate({
        _id: petId
    }, pet);
};

module.exports.deletePet = async (petId) => {
    if (!isValidObjectId(petId)) return false;
    await Pet.findOneAndRemove({
        _id: petId
    });
    await deleteAllPetPhotos(petId);
};

module.exports.deletePets = async (pets) => {
    for(const pet of pets) {
        await this.deletePet(pet.id);
    }
};