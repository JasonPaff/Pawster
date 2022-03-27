const {isValidObjectId} = require("../../utils/database_utils");
const {Message} = require("../schemas/message_schema");

module.exports.getMessage = async (id) => {
    if (!isValidObjectId(id)) return false;
    return Message.find({
        $or: [{
                sender: id,
                receiver: id
            }]
    });
};

module.exports.getMessages = async (id) => {
    if (!isValidObjectId(id)) return false;
    return Message.find({
        _id: id
    });
};

module.exports.getSentMessages = async (id) => {
    if (!isValidObjectId(id)) return false;
    return Message.find({
        sender: id
    });
};

module.exports.getReceivedMessages = async (id) => {
    if (!isValidObjectId(id)) return false;
    return Message.find({
        receiver: id
    });
};

module.exports.getNewMessageId = async () => {
    let maxId = 0;
    const messages = await Message.find({});
    for (let i = 0; i < messages.length; i++) {
        maxId = Math.max(messages[i].chatId, maxId);
    }
    return maxId + 1;
};

module.exports.getMessageChain = async (id) => {
    return Message.find({
        chatId: id
    });
};

module.exports.doesMessageChainExist = async (id) => {
    return Message.exists({
        chatId: id
    });
};

module.exports.createMessage = async (userId, message) => {
    const newMessage = await new Message(message);
    await newMessage.save();
    return newMessage();
}