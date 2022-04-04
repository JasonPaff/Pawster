const {createModule, gql} = require('graphql-modules');
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {findHost} = require("../../mongodb/operations/host_operations");
const {hostNotFoundError} = require("../api_responses/host/host_error");
const {hostFoundSuccess} = require("../api_responses/host/host_success");

module.exports.orderModule = createModule({
    id: 'order_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                findUserOrders(userId: ID!) : OrdersResponse
                findHostOrders(userId: ID!) : OrdersResponse                
            }

            extend type Mutation {
                createOrder(userId: ID!, order: OrderInput) : OrderResponse
            }
            
            type Order {
                userId: ID
                hostId: ID
                service: String
                total: Float
                data: Date
            }
            
            input OrderInput {
                id: ID
                userId: ID
                hostId: ID
                service: String
                total: Float
                data: Date
            }

            type OrderResponse {
                success: Boolean
                message: String
                orders: Order
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
            getUserOrders: async (parent, {userId}, context) => {

            },
        },
        Mutation: {

        }
    }
});