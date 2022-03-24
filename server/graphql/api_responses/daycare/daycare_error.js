module.exports.daycareNotFoundError = (userId) => {
    return {
        success: false,
        message: `no daycare found for ${userId}`,
        daycare: null
    };
};

module.exports.daycareAlreadyExistsError = (userId) => {
    return {
        success: false,
        message: `daycare for ${userId} already exists`,
        daycare: null
    };
};

module.exports.daycareDoesNotExistError = (userId) => {
    return {
        success: false,
        message: `no daycare found for ${userId}`,
        daycare: null
    };
};