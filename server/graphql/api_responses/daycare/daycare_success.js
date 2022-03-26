module.exports.daycareFoundSuccess = (userId, daycare) => {
    return {
        success: true,
        message: `daycare found for ${userId}`,
        daycare: daycare
    };
};

module.exports.daycareCreatedSuccess = (userId, daycare) => {
    return {
        success: true,
        message: `daycare created for ${userId}`,
        daycare: daycare
    };
};

module.exports.daycareUpdatedSuccess = (userId, daycare) => {
    return {
        success: true,
        message: `daycare updated for ${userId}`,
        daycare: daycare
    };
};

module.exports.daycareDeletedSuccess = (userId, daycare) => {
    return {
        success: true,
        message: `daycare for ${userId} deleted`,
        daycare: daycare
    };
};