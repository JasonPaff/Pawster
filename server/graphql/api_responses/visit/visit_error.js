module.exports.visitNotFoundError = (userId) => {
    return {
        success: false,
        message: `no visit found for ${userId}`,
        visit: null
    };
};

module.exports.visitAlreadyExistsError = (userId) => {
    return {
        success: false,
        message: `visit for ${userId} already exists`,
        visit: null
    };
};

module.exports.visitDoesNotExistError = (userId) => {
    return {
        success: false,
        message: `no visit found for ${userId}`,
        visit: null
    };
};