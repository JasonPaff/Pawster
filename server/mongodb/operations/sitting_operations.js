const {isValidObjectId} = require("../../utils/database_utils");
const {Sitting} = require("../schemas/sitting_schema");

module.exports.findSitting = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Sitting.findOne({
        userId: userId
    });
};

module.exports.doesSittingExist = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Sitting.exists({
        userId: userId
    });
};

module.exports.createSitting = async (userId, sitting) => {
    if (!isValidObjectId(userId)) return false;
    sitting.userId = userId;
    const newSitting = await new Sitting(sitting);
    await newSitting.save();
    return newSitting;
};

module.exports.updateSitting = async (userId, updatedSitting) => {
    if (!isValidObjectId(userId)) return false;
    await Sitting.findOneAndUpdate({
        userId: userId
    }, updatedSitting);
};

module.exports.deleteSitting = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    await Sitting.findOneAndRemove({
        userId: userId
    });
};