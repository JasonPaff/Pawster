module.exports.ordersFoundSuccess = (userId, orders) => {
    return {
        success: true,
        message: `orders found for id ${userId}`,
        orders: orders
    }
};

module.exports.orderCreatedSuccess = (userId, order) => {
    return {
        success: true,
        message: `order created for id ${userId}`,
        order: order
    }
};