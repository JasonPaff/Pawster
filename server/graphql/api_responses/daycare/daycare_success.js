module.exports.daycareFoundSuccess = (daycare) => {
    return {
        success: true,
        message: `daycare found for ${daycare.userId}`,
        daycare: daycare
    };
};

module.exports.daycareCreatedSuccess = (daycare) => {
    return {
        success: true,
        message: `daycare created for ${daycare.userId}`,
        daycare: daycare
    };
};

module.exports.daycareUpdatedSuccess = (daycare) => {
    return {
        success: true,
        message: `daycare updated for ${daycare.userId}`,
        daycare: daycare
    };
};

module.exports.daycareDeletedSuccess = (daycare) => {
    return {
        success: true,
        message: `daycare for ${daycare.userId} deleted`,
        daycare: daycare
    };
};