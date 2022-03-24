const {isValidObjectId} = require("../../utils/database_utils");
const {Walking} = require("../schemas/walking_schema");

module.exports.findWalking = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Walking.findOne({
        userId: userId
    });
};

module.exports.doesWalkingExist = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Walking.exists({
        userId: userId
    });
};

module.exports.createWalking = async (userId, walking) => {
    if (!isValidObjectId(userId)) return false;
    walking.userId = userId;
    const newWalking = await new Walking(walking);
    await newWalking.save();
    return newWalking;
};

module.exports.updateWalking = async (userId, updatedWalking) => {
    if (!isValidObjectId(userId)) return false;
    await Walking.findOneAndUpdate({
        userId: userId
    }, updatedWalking);
};

module.exports.deleteWalking = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    await Walking.findOneAndRemove({
        userId: userId
    });
};