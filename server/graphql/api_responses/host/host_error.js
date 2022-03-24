module.exports.hostNotFoundError = (userId) => {
    return {
        success: false,
        message: `no host account found for ${userId}`,
        host: null
    };
};

module.exports.hostAlreadyExistsError = (userId) => {
    return {
        success: false,
        message: `host account for ${userId} already exists`,
        host: null
    };
};

module.exports.hostDoesNotExistError = (userId) => {
    return {
        success: false,
        message: `no host account found for ${userId}`,
        host: null
    };
};