module.exports.boardingNotFoundError = (userId) => {
    return {
        success: false,
        message: `no boarding found for ${userId}`,
        boarding: null
    };
};

module.exports.boardingAlreadyExistsError = (userId) => {
    return {
        success: false,
        message: `boarding for ${userId} already exists`,
        boarding: null
    };
};

module.exports.boardingDoesNotExistError = (userId) => {
    return {
        success: false,
        message: `no boarding found for ${userId}`,
        boarding: null
    };
};