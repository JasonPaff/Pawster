const {Pet} = require("../schemas/pet_schema");

module.exports.findPets = async (id) => {
    return Pet.find({
        userId: id
    });
};

module.exports.findPet = async (id) => {
    return Pet.findOne({
        _id: id
    });
};

module.exports.doesPetExist = async (id) => {
    return Pet.exists({
        _id: id
    });
};

module.exports.createPet = async (id, pet) => {
    pet.userId = id;
    const newPet = await new Pet(pet);
    await newPet.save();
    return newPet;
};

module.exports.updatePet = async (id, pet) => {
    await Pet.findOneAndUpdate({
        _id: id
    }, pet);
};

module.exports.deletePet = async (id) => {
    await Pet.findOneAndRemove({
        _id: id
    });
};