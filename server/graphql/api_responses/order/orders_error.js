module.exports.ordersNotFoundError = (userId) => {
    return {
        success: false,
        message: `orders not found for id ${userId}`,
        orders: null
    }
};