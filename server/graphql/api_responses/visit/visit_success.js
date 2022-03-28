module.exports.visitFoundSuccess = (userId, visit) => {
    return {
        success: true,
        message: `visit found for ${userId}`,
        visit: visit
    };
};

module.exports.visitCreatedSuccess = (userId, visit) => {
    return {
        success: true,
        message: `visit created for ${userId}`,
        visit: visit
    };
};

module.exports.visitUpdatedSuccess = (userId, visit) => {
    return {
        success: true,
        message: `visit updated for ${userId}`,
        visit: visit
    };
};

module.exports.visitDeletedSuccess = (userId, visit) => {
    return {
        success: true,
        message: `visit for ${userId} deleted`,
        visit: visit
    };
};