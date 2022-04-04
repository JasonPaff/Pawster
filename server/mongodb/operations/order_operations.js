const {isValidObjectId} = require("../../utils/database_utils");
const {Order} = require("../schemas/order_schema");

module.exports.findUserOrders = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Order.find({
        userId: userId
    });
}

module.exports.findHostOrders = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Order.find({
        hostId: userId
    });
}

module.exports.createOrder = async (userId, order) => {
    if (!isValidObjectId(userId)) return false;
    order.userId = userId;
    const newOrder = await new Order(order);
    await newOrder.save();
    return newOrder;
}