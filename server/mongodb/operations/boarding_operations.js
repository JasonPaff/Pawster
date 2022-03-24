const {isValidObjectId} = require("../../utils/database_utils");
const {Boarding} = require("../schemas/boarding_schema");

module.exports.findBoarding = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Boarding.findOne({
        userId: userId
    });
};

module.exports.doesBoardingExist = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Boarding.exists({
        userId: userId
    });
};

module.exports.createBoarding = async (userId, boarding) => {
    if (!isValidObjectId(userId)) return false;
    boarding.userId = userId;
    const newBoarding = await new Boarding(boarding);
    await newBoarding.save();
    return newBoarding;
};

module.exports.updateBoarding = async (userId, updatedBoarding) => {
    if (!isValidObjectId(userId)) return false;
    await Boarding.findOneAndUpdate({
        userId: userId
    }, updatedBoarding);
};

module.exports.deleteBoarding = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    await Boarding.findOneAndRemove({
        userId: userId
    });
};