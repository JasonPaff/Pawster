module.exports.sittingFoundSuccess = (userId, sitting) => {
    return {
        success: true,
        message: `sitting found for ${userId}`,
        sitting: sitting
    };
};

module.exports.sittingCreatedSuccess = (userId, sitting) => {
    return {
        success: true,
        message: `sitting created for ${userId}`,
        sitting: sitting
    };
};

module.exports.sittingUpdatedSuccess = (userId, sitting) => {
    return {
        success: true,
        message: `sitting updated for ${userId}`,
        sitting: sitting
    };
};

module.exports.sittingDeletedSuccess = (userId, sitting) => {
    return {
        success: true,
        message: `sitting for ${userId} deleted`,
        sitting: sitting
    };
};