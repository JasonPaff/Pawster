const {isValidObjectId} = require("../../utils/database_utils");
const {Order} = require("../schemas/order_schema");

module.exports.FindUserOrders = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Order.find({
        userId: userId
    });
}

module.exports.FindHostOrders = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Order.find({
        hostId: userId
    });
}

module.exports.CreateOrder = async (userId, order) => {
    if (!isValidObjectId(userId)) return false;
    order.userId = userId;
    const newOrder = await new Order(order);
    await newOrder.save();
    return newOrder;
}