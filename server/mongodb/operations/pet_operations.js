const {Pet} = require("../schemas/pet_schema");
const {isValidObjectId} = require("../../utils/database_utils");
const {deleteAllPetPhotos} = require("./pet_photo_operations");

module.exports.findPet = async (id) => {
    if (!isValidObjectId(id)) return false;
    return Pet.findOne({
        _id: id
    });
};

module.exports.findPets = async (id) => {
    if (!isValidObjectId(id)) return false;
    return Pet.find({
        userId: id
    });
};

module.exports.doesPetExist = async (id) => {
    if (!isValidObjectId(id)) return false;
    return Pet.exists({
        _id: id
    });
};

module.exports.createPet = async (id, pet) => {
    if (!isValidObjectId(id)) return false;
    pet.userId = id;
    const newPet = await new Pet(pet);
    await newPet.save();
    return newPet;
};

module.exports.updatePet = async (id, pet) => {
    if (!isValidObjectId(id)) return false;
    await Pet.findOneAndUpdate({
        _id: id
    }, pet);
};

module.exports.deletePet = async (id) => {
    if (!isValidObjectId(id)) return false;
    await Pet.findOneAndRemove({
        _id: id
    });
    await deleteAllPetPhotos(id);
};

module.exports.deletePets = async (pets) => {
    for(const pet of pets) {
        await this.deletePet(pet.id);
    }
};