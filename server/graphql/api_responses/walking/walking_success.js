module.exports.walkingFoundSuccess = (userId, walking) => {
    return {
        success: true,
        message: `walking found for ${userId}`,
        walking: walking
    };
};

module.exports.walkingCreatedSuccess = (userId, walking) => {
    return {
        success: true,
        message: `walking created for ${userId}`,
        walking: walking
    };
};

module.exports.walkingUpdatedSuccess = (userId, walking) => {
    return {
        success: true,
        message: `walking updated for ${userId}`,
        walking: walking
    };
};

module.exports.walkingDeletedSuccess = (userId, walking) => {
    return {
        success: true,
        message: `walking for ${userId} deleted`,
        walking: walking
    };
};