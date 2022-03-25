module.exports.boardingFoundSuccess = (userId, boarding) => {
    return {
        success: true,
        message: `boarding found for ${userId}`,
        boarding: boarding
    };
};

module.exports.boardingCreatedSuccess = (userId, boarding) => {
    return {
        success: true,
        message: `boarding created for ${userId}`,
        boarding: boarding
    };
};

module.exports.boardingUpdatedSuccess = (userId, boarding) => {
    return {
        success: true,
        message: `boarding updated for ${userId}`,
        boarding: boarding
    };
};

module.exports.boardingDeletedSuccess = (userId, boarding) => {
    return {
        success: true,
        message: `boarding for ${userId} deleted`,
        boarding: boarding
    };
};