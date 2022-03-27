const {createModule, gql} = require('graphql-modules');
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {jwtError} = require("../api_responses/auth/auth_error");
const {PubSub} = require('apollo-server');
const {findUserById} = require("../../mongodb/operations/user_operations");
const {receiverNotFoundError, senderNotFoundError} = require("../api_responses/message/message_error");

const pubsub = new PubSub();

module.exports.messageModule = createModule({
    id: 'message_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getMessage(messageId: ID!) : MessageResponse
                getSentMessages(messageId: ID!) : MessagesResponse
                getReceivedMessages(messageId: ID!) : MessagesResponse
                getMessages : MessagesResponse
                getNewMessageId : Int
                getMessageChain(messageChainId: Int!) : MessagesResponse
            }
            
            extend type Mutation {
                createMessage(message: MessageInput!) : MessageResponse
                deleteMessage(messageId: ID!) : MessageResponse
                deleteMessageChain(messageChainId: Int!) : MessagesResponse
            }
            
            type Subscription {
                messageCreated: MessageCreated    
            }
            
            type MessageCreated {
                receiver: ID
            }
            
            type Message {
                chatId: Int
                subject: String
                message: String
                sender: ID
                receiver: ID
                sentAt: Date
            }
            
            input MessageInput {
                chatId: Int
                subject: String
                message: String
                sender: ID
                receiver: ID
                sentAt: Date
            }
            
            type MessageResponse {
                success: Boolean
                message: String
                userMessage: Message
            }
            
            type MessagesResponse {
                success: Boolean
                message: String
                userMessages: [Message]
            }
        `
    ],
    resolvers: {
        Query: {

        },
        Mutation: {
            createMessage: async (parent, {message}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

              const user = await findUserById(userId);
                if (!user) return senderNotFoundError(userId);

                const receiver = await findUserById(message.receiver);
                if (!receiver) return receiverNotFoundError(receiver);

                await pubsub.publish("MESSAGE_CREATED", {
                   messageCreated: {message}
                });
            }
        },
        Subscription : {
            messageCreated: {
                subscribe: async () => await pubsub.asyncIterator("MESSAGE_CREATED")
            },
        }
    }
});