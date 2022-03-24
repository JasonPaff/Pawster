module.exports.sittingFoundSuccess = (sitting) => {
    return {
        success: true,
        message: `sitting found for ${sitting.userId}`,
        sitting: sitting
    };
};

module.exports.sittingCreatedSuccess = (sitting) => {
    return {
        success: true,
        message: `sitting created for ${sitting.userId}`,
        sitting: sitting
    };
};

module.exports.sittingUpdatedSuccess = (sitting) => {
    return {
        success: true,
        message: `sitting updated for ${sitting.userId}`,
        sitting: sitting
    };
};

module.exports.sittingDeletedSuccess = (sitting) => {
    return {
        success: true,
        message: `sitting for ${sitting.userId} deleted`,
        sitting: sitting
    };
};