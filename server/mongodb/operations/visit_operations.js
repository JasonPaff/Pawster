const {isValidObjectId} = require("../../utils/database_utils");
const {Visit} = require("../schemas/visit_schema");

module.exports.findVisit = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Visit.findOne({
        userId: userId
    });
};

module.exports.doesVisitExist = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Visit.exists({
        userId: userId
    });
};

module.exports.createVisit = async (userId, visit) => {
    if (!isValidObjectId(userId)) return false;
    visit.userId = userId;
    const newVisit = await new Visit(visit);
    await newVisit.save();
    return newVisit;
};

module.exports.updateVisit = async (userId, updatedVisit) => {
    if (!isValidObjectId(userId)) return false;
    await Visit.findOneAndUpdate({
        userId: userId
    }, updatedVisit);
};

module.exports.deleteVisit = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    await Visit.findOneAndRemove({
        userId: userId
    });
};