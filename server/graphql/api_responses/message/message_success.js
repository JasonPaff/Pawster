module.exports.messageCreatedSuccess = (message) => {
    return {
        success: false,
        message: `message created`,
        chatMessage: message
    };
};