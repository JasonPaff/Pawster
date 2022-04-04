const {createModule, gql} = require('graphql-modules');
const {findUserOrders, findHostOrders, createOrder} = require("../../mongodb/operations/order_operations");
const {ordersNotFoundError} = require("../api_responses/order/orders_error");
const {ordersFoundSuccess, orderCreatedSuccess} = require("../api_responses/order/orders_success");
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {userIdNotFoundError} = require("../api_responses/user/user_error");

module.exports.orderModule = createModule({
    id: 'order_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                findUserOrders : OrdersResponse
                findHostOrders : OrdersResponse                
            }

            extend type Mutation {
                createOrder(order: OrderInput) : OrderResponse
            }
            
            type Order {
                userId: ID
                hostId: ID
                id: ID
                service: String
                total: Float
                date: Date
            }
            
            input OrderInput {
                userId: ID
                hostId: ID
                service: String
                total: Float
                data: Date
            }

            type OrderResponse {
                success: Boolean
                message: String
                order: Order
            }
            
            type OrdersResponse {
                success: Boolean
                message: String
                orders: [Order]
            }
        `
    ],
    resolvers: {
        Query: {
            findUserOrders: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const orders = await findUserOrders(userId);
                if (!orders) return ordersNotFoundError(userId);

                return ordersFoundSuccess(orders)
            },
            findHostOrders: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const orders = await findHostOrders(userId);
                if (!orders) return ordersNotFoundError(userId);

                return ordersFoundSuccess(orders)
            },
        },
        Mutation: {
            createOrder: async (parent, {order}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const newOrder = await createOrder(userId, order);
                return orderCreatedSuccess(userId, newOrder);
            }
        }
    }
});