module.exports.petNotFoundError = (id) => {
    return {
        success: false,
        message: `pet with id ${id} not found`,
        pet: null
    };
};

module.exports.petsNotFoundError = (email) => {
    return {
        success: false,
        message: `pets for ${email} not found`,
        pet: null
    };
};