module.exports.sittingNotFoundError = (userId) => {
    return {
        success: false,
        message: `no sitting found for ${userId}`,
        sitting: null
    };
};

module.exports.sittingAlreadyExistsError = (userId) => {
    return {
        success: false,
        message: `sitting for ${userId} already exists`,
        sitting: null
    };
};

module.exports.sittingDoesNotExistError = (userId) => {
    return {
        success: false,
        message: `no sitting found for ${userId}`,
        sitting: null
    };
};