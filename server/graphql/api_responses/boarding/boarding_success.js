module.exports.boardingFoundSuccess = (boarding) => {
    return {
        success: true,
        message: `boarding found for ${boarding.userId}`,
        boarding: boarding
    };
};

module.exports.boardingCreatedSuccess = (boarding) => {
    return {
        success: true,
        message: `boarding created for ${boarding.userId}`,
        boarding: boarding
    };
};

module.exports.boardingUpdatedSuccess = (boarding) => {
    return {
        success: true,
        message: `boarding updated for ${boarding.userId}`,
        boarding: boarding
    };
};

module.exports.boardingDeletedSuccess = (boarding) => {
    return {
        success: true,
        message: `boarding for ${boarding.userId} deleted`,
        boarding: boarding
    };
};