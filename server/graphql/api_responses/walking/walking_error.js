module.exports.walkingNotFoundError = (userId) => {
    return {
        success: false,
        message: `no walking found for ${userId}`,
        walking: null
    };
};

module.exports.walkingAlreadyExistsError = (userId) => {
    return {
        success: false,
        message: `walking for ${userId} already exists`,
        walking: null
    };
};

module.exports.walkingDoesNotExistError = (userId) => {
    return {
        success: false,
        message: `no walking found for ${userId}`,
        walking: null
    };
};