const {PubSub} = require('apollo-server');
const pubsub = new PubSub();
const {createModule, gql} = require('graphql-modules');
const {jwtError} = require("../api_responses/auth/auth_error");
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {
    messageThreadsNotFoundError, messageThreadsForReceiverNotFoundError,
    messageThreadsForSenderNotFoundError, messageThreadNotFoundError
} = require("../api_responses/message/message_error");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {
    getMessageThreadsByUserId, getMessageThreadsByReceiverId, getMessageThreadsBySenderId, getMessageThreadById,
    createMessageThread, addMessageToThread, hideThreadForReceiver, hideThreadForSender
} = require("../../mongodb/operations/message_operations");
const {
    messageThreadsFoundSuccess, messageThreadsForReceiverFoundSuccess, messageThreadsForSenderFoundSuccess,
    messageThreadFoundSuccess, messageThreadCreatedSuccess, messageCreatedSuccess, hideThreadForReceiverSuccess,
    hideThreadForSenderSuccess
} = require("../api_responses/message/message_success");

module.exports.messageModule = createModule({
    id: 'message_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getMessageThreads : MessagesResponse
                getMessageThreadById(threadId: ID!) : MessageResponse
                getMessageThreadsBySenderId(userId: ID!) : MessagesResponse
                getMessageThreadsByReceiverId(userId: ID!) : MessagesResponse
            }

            extend type Mutation {
                createMessageThread(messageThread: MessageThreadInput!) : MessageResponse
                addMessageToThread(message: MessageInput!) : MessageResponse
                hideThreadForReceiver(threadId: ID) : MessageResponse
                hideThreadForSender(threadId: ID) : MessageResponse
            }

            type Subscription {
                messageAdded: MessageAdded
                messageThreadCreated: MessageThreadCreated
            }

            type MessageThreadCreated {
                messageThread: MessageThread
            }

            type MessageAdded{
                messageThread: MessageThread
            }

            type Message {
                message: String
                sentAt: Date
                userId: ID
            }

            type MessageThread {
                createdAt: Date
                id: ID
                isVisibleToSender: Boolean
                isVisibleToReceiver: Boolean
                messages: [Message]
                receiverUserId: ID
                senderUserId: ID
                subject: String
            }

            input MessageInput {
                message: String!
                threadId: ID!
            }

            input MessageThreadInput {
                message: String!
                receiverUserId: ID!
                senderUserId: ID!
                subject: String!
            }

            type MessageResponse {
                success: Boolean
                message: String
                messageThread: MessageThread
            }

            type MessagesResponse {
                success: Boolean
                message: String
                messageThreads: [MessageThread]
            }
        `
    ],
    resolvers: {
        Query: {
            getMessageThreads: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const messageThreads = await getMessageThreadsByUserId(userId);
                if (!messageThreads) return messageThreadsNotFoundError(userId);

                return messageThreadsFoundSuccess(userId, messageThreads);
            },
            getMessageThreadById: async (parent, {threadId}) => {
                const messageThread = await getMessageThreadById(threadId);
                if (!messageThread) return messageThreadNotFoundError(threadId);

                return messageThreadFoundSuccess(threadId, messageThread);
            },
            getMessageThreadsByReceiverId: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const messageThreads = await getMessageThreadsByReceiverId(userId);
                if (!messageThreads) return messageThreadsForReceiverNotFoundError(userId);

                return messageThreadsForReceiverFoundSuccess(userId, messageThreads);
            },
            getMessageThreadsBySenderId: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const messageThreads = await getMessageThreadsBySenderId(userId);
                if (!messageThreads) return messageThreadsForSenderNotFoundError(userId);

                return messageThreadsForSenderFoundSuccess(userId, messageThreads);
            }
        },
        Mutation: {
            createMessageThread: async (parent, {messageThread}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const newMessageThread = await createMessageThread(messageThread);

                await pubsub.publish("MESSAGE_THREAD_CREATED", {
                    messageThreadCreated: {
                        messageThread: newMessageThread
                    }
                });

                return messageThreadCreatedSuccess(newMessageThread);
            },
            addMessageToThread: async (parent, {message}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const updatedMessageThread = await addMessageToThread(userId, message);

                await pubsub.publish("MESSAGE_ADDED", {
                    messageAdded: {
                        messageThread: updatedMessageThread
                    }
                });

                return messageCreatedSuccess(updatedMessageThread);
            },
            hideThreadForReceiver: async (parent, {threadId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const messageThread = await hideThreadForReceiver(userId, threadId);
                if (!messageThread) return messageThreadNotFoundError(userId);

                return hideThreadForReceiverSuccess(userId, messageThread);
            },
            hideThreadForSender: async (parent, {threadId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const messageThread = await hideThreadForSender(userId, threadId);
                if (!messageThread) return messageThreadNotFoundError(userId);

                return hideThreadForSenderSuccess(userId, messageThread);
            }
        },
        Subscription: {
            messageAdded: {
                subscribe: async () => await pubsub.asyncIterator("MESSAGE_ADDED")
            },
            messageThreadCreated: {
                subscribe: async () => await pubsub.asyncIterator("MESSAGE_THREAD_CREATED")
            }
        }
    }
});