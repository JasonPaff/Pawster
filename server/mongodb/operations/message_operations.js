const {isValidObjectId} = require("../../utils/database_utils");
const {MessageThread} = require("../schemas/message_thread_schema");

module.exports.getMessageThreadsByUserId = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return MessageThread.find({
        $or: [
            { senderUserId: userId },
            { receiverUserId: userId }
        ]
    });
};

module.exports.getMessageThreadById = async (threadId) => {
    if (!isValidObjectId(threadId)) return false;
    return MessageThread.findOne({
        _id: threadId
    });
};

module.exports.getMessageThreadsBySenderId = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return MessageThread.find({
        senderUserId: userId
    });
};

module.exports.getMessageThreadsByReceiverId = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return MessageThread.find({
        receiverUserId: userId
    });
};

module.exports.createMessageThread = async (thread) => {
    const newMessage = {
        message: thread.message,
        userId: thread.message.userId,
        sentAt: Date.now(),
    }
    thread.messages = [newMessage];
    const messageThread = await new MessageThread(thread);
    await messageThread.save();
    return messageThread;
};

module.exports.addMessageToThread = async (userId, message) => {
    const messageThread = await MessageThread.findOne({
        _id: message.threadId
    });

    const newMessage = {
        message: message.message,
        userId: userId,
        sentAt: Date.now(),
    }
    messageThread.messages.push(newMessage);
    messageThread.isVisibleToSender = true;
    messageThread.isVisibleToReceiver = true;
    await MessageThread.findOneAndUpdate({
        _id: message.threadId
    }, messageThread);
    return messageThread;
};

module.exports.hideThreadForSender = async (userId, threadId) => {
    const messageThread = await MessageThread.findOne({
        _id: threadId,
        senderUserId: userId
    });
    messageThread.isVisibleToSender = false;
    await MessageThread.findOneAndUpdate({
        _id: threadId,
        senderUserId: userId
    }, messageThread);
    return messageThread;
};

module.exports.hideThreadForReceiver = async (userId, threadId) => {
    const messageThread = await MessageThread.findOne({
        _id: threadId,
        receiverUserId: userId
    });
    messageThread.isVisibleToReceiver = false;
    await MessageThread.findOneAndUpdate({
        _id: threadId,
        receiverUserId: userId
    }, messageThread);
    return messageThread;
};