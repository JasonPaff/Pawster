module.exports.messageThreadsNotFoundError = (userId) => {
    return {
        success: false,
        message: `no message threads found for id ${userId}`,
        messageThreads: null
    }
};

module.exports.messageThreadNotFoundError = (threadId) => {
    return {
        success: false,
        message: `no message thread found for id ${threadId}`,
        messageThread: null
    }
};

module.exports.messageThreadsForReceiverNotFoundError = (userId) => {
    return {
        success: false,
        message: `no received message threads found for id ${userId}`,
        messageThreads: null
    }
};

module.exports.messageThreadsForSenderNotFoundError = (userId) => {
    return {
        success: false,
        message: `no sent message threads found for id ${userId}`,
        messageThreads: null
    }
};