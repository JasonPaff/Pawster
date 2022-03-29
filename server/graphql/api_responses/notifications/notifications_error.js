module.exports.notificationsNotFoundError = (userId) => {
    return {
        success: false,
        message: `notifications not found for id ${userId}`,
        notifications: null
    }
};