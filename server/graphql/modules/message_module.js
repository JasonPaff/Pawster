const {createModule, gql} = require('graphql-modules');
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {jwtError} = require("../api_responses/auth/auth_error");

module.exports.messageModule = createModule({
    id: 'message_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
               createMessage(message: MessageInput!) : MessageResponse
            },
            extend type Mutation {
               
            },
            type Message {
                id: ID
                chatId: ID
                subject: String
                message: String
                sender: ID
                receiver: ID
                sentAt: Date
            }

            input MessageInput {
                street: String
                city: String
                state: String
                zipcode: Int
            }

            type MessageResponse {
                success: Boolean
                message: String
                message: Message
            }
        `
    ],
    resolvers: {
        Query: {

        },
        Mutation: {

        },
        Subscription : {

        }
    }
});