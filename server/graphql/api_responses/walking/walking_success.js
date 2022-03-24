module.exports.walkingFoundSuccess = (walking) => {
    return {
        success: true,
        message: `walking found for ${walking.userId}`,
        walking: walking
    };
};

module.exports.walkingCreatedSuccess = (walking) => {
    return {
        success: true,
        message: `walking created for ${walking.userId}`,
        walking: walking
    };
};

module.exports.walkingUpdatedSuccess = (walking) => {
    return {
        success: true,
        message: `walking updated for ${walking.userId}`,
        walking: walking
    };
};

module.exports.walkingDeletedSuccess = (walking) => {
    return {
        success: true,
        message: `walking for ${walking.userId} deleted`,
        walking: walking
    };
};