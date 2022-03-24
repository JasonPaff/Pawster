const {isValidObjectId} = require("../../utils/database_utils");
const {Host} = require("../schemas/host_schema");

module.exports.findHost = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Host.findOne({
        userId: userId
    });
};

module.exports.doesHostExist = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Host.exists({
        userId: userId
    });
};

module.exports.createHost = async (userId, host) => {
    if (!isValidObjectId(userId)) return false;
    host.userId = userId;
    const newHost = await new Host(host);
    await newHost.save();
    return newHost;
};

module.exports.updateHost = async (userId, updatedHost) => {
    if (!isValidObjectId(userId)) return false;
    await Host.findOneAndUpdate({
        userId: userId
    }, updatedHost);
};

module.exports.deleteHost = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    await Host.findOneAndRemove({
        userId: userId
    });
};