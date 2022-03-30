const {isValidObjectId} = require("../../utils/database_utils");
const {Notification} = require("../schemas/notification_schema");

module.exports.getNotifications = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Notification.find({
        toUserId: userId
    });
};

module.exports.addNotification = async (notification) => {
    if (!isValidObjectId(notification.toUserId)) return false;
    if (!isValidObjectId(notification.fromUserId)) return false;
    const newNotification = await new Notification(notification);
    newNotification.save();
    return newNotification;
};

module.exports.deleteNotification = async (id) => {
    if (!isValidObjectId(id)) return false;
    await Notification.findOneAndRemove({
        _id: id
    });
};