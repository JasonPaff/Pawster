const {isValidObjectId} = require("../../utils/database_utils");
const {Daycare} = require("../schemas/daycare_schema");

module.exports.findDaycare = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Daycare.findOne({
        userId: userId
    });
};

module.exports.doesDaycareExist = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Daycare.exists({
        userId: userId
    });
};

module.exports.createDaycare = async (userId, daycare) => {
    if (!isValidObjectId(userId)) return false;
    daycare.userId = userId;
    const newDaycare = await new Daycare(daycare);
    await newDaycare.save();
    return newDaycare;
};

module.exports.updateDaycare = async (userId, updatedDaycare) => {
    if (!isValidObjectId(userId)) return false;
    await Daycare.findOneAndUpdate({
        userId: userId
    }, updatedDaycare);
};

module.exports.deleteDaycare = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    await Daycare.findOneAndRemove({
        userId: userId
    });
};