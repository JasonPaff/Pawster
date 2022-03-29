const {PubSub} = require('apollo-server');
const pubsub = new PubSub();
const {createModule, gql} = require("graphql-modules");
const {jwtError} = require("../api_responses/auth/auth_error");
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {getNotifications, addNotification} = require("../../mongodb/operations/notification_operations");
const {notificationsNotFoundError} = require("../api_responses/notifications/notifications_error");
const {notificationsFoundSuccess, notificationAddedSuccess} = require("../api_responses/notifications/notifications_success");

module.exports.notificationModule = createModule({
    id: 'notification_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getNotifications : NotificationsResponse
            }

            extend type Mutation {
                addNotification(notification: NotificationInput!) : NotificationResponse
                removeNotification(id: ID!) : NotificationResponse
            }

            extend type Subscription {
                notificationAdded: NotificationAdded
            }

            input NotificationInput {
                userId: ID
                message: String
                link: String
            }

            type Notification {
                id: ID
                link: String
                message: String
                userId: ID
            }

            type NotificationAdded {
                notification: Notification
            }

            type NotificationResponse {
                success: Boolean
                message: String
                notification : Notification
            }

            type NotificationsResponse {
                success: Boolean
                message: String
                notifications : [Notification]
            }
        `
    ],
    resolvers: {
        Query: {
            getNotifications: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const notifications = await getNotifications(userId);
                if (!notifications || notifications.length === 0) return notificationsNotFoundError(userId);
                console.log(notifications);
                return notificationsFoundSuccess(userId, notifications);
            }
        },
        Mutation: {
            addNotification: async (parent, {notification}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const newNotification = await addNotification(notification);

                await pubsub.publish("NOTIFICATION_ADDED", {
                    notificationAdded: {
                        notification: newNotification
                    }});

                return notificationAddedSuccess(newNotification);
            }
        },
        Subscription: {
            notificationAdded: {
                subscribe: async () => await pubsub.asyncIterator("NOTIFICATION_ADDED")
            }
        }
    }
});