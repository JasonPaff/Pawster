module.exports.petFoundSuccess = (pet) => {
    return {
        success: true,
        message: `pet with id ${pet._id} found`,
        pet: pet
    };
};

module.exports.petsFoundSuccess = (id, pets) => {
    return {
        success: true,
        message: `pets for id ${id} found`,
        pets: [pets]
    };
};

module.exports.petCreatedSuccess = (pet) => {
    return {
        success: true,
        message: `pet created`,
        pet: pet
    };
};

module.exports.petUpdatedSuccess = (id, pet) => {
    return {
        success: true,
        message: `pet ${id} updated`,
        pet: pet
    };
};

module.exports.petDeletedSuccess = (id, pet) => {
    return {
        success: true,
        message: `pet ${id} deleted`,
        pet: pet
    };
};

module.exports.petsDeletedSuccess = (id, pet) => {
    return {
        success: true,
        message: `pets for ${id} deleted`,
        pet: pet
    };
};