module.exports.messageThreadsFoundSuccess = (userId, messageThreads) => {
    return {
        success: true,
        message: `message threads found for id ${userId}`,
        messageThreads: messageThreads
    }
};

module.exports.messageThreadFoundSuccess = (threadId, messageThread) => {
    return {
        success: true,
        message: `message thread found for ${threadId}`,
        messageThread: messageThread
    }
};

module.exports.messageThreadsForReceiverFoundSuccess = (userId, messageThreads) => {
    return {
        success: true,
        message: `received message threads found for ${userId}`,
        messageThreads: messageThreads
    }
};

module.exports.messageThreadsForSenderFoundSuccess = (userId, messageThreads) => {
    return {
        success: true,
        message: `sent message threads found for ${userId}`,
        messageThreads: messageThreads
    }
};

module.exports.messageThreadCreatedSuccess = (messageThread) => {
    return {
        success: true,
        message: `new message thread created`,
        messageThread: messageThread
    }
};

module.exports.messageCreatedSuccess = (messageThread) => {
    console.log(messageThread);
    return {
        success: true,
        message: `new message on thread ${messageThread.id} created`,
        messageThread: messageThread
    }
};

module.exports.hideThreadForReceiverSuccess = (userId, messageThread) => {
    return {
        success: true,
        message: `message thread ${messageThread.id} hidden for receiver ${userId}`,
        messageThread: messageThread
    }
};

module.exports.hideThreadForSenderSuccess = (userId, messageThread) => {
    return {
        success: true,
        message: `message thread ${messageThread.id} hidden for sender ${userId}`,
        messageThread: messageThread
    }
};