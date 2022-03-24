module.exports.petNotFoundError = (id) => {
    return {
        success: false,
        message: `pet with id ${id} not found`,
        pet: null
    };
};

module.exports.petsNotFoundError = (id) => {
    return {
        success: false,
        message: `pets for id ${id} not found`,
        pet: null
    };
};