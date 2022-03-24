module.exports.visitFoundSuccess = (visit) => {
    return {
        success: true,
        message: `visit found for ${visit.userId}`,
        visit: visit
    };
};

module.exports.visitCreatedSuccess = (visit) => {
    return {
        success: true,
        message: `visit created for ${visit.userId}`,
        visit: visit
    };
};

module.exports.visitUpdatedSuccess = (visit) => {
    return {
        success: true,
        message: `visit updated for ${visit.userId}`,
        visit: visit
    };
};

module.exports.visitDeletedSuccess = (visit) => {
    return {
        success: true,
        message: `visit for ${visit.userId} deleted`,
        visit: visit
    };
};