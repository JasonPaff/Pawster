module.exports.receiverNotFoundError = (userId) => {
    return {
        success: false,
        message: `no receiver found for id ${userId}`,
        chatMessage: null
    };
};

module.exports.senderNotFoundError = (userId) => {
    return {
        success: false,
        message: `no account found for sender id ${userId}`,
        chatMessage: null
    };
};