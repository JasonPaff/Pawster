import {gql} from "@apollo/client";

export const messageAddedToThreadSubscription = gql`subscription Subscription {
    messageAdded {
        messageThread {
            subject
            senderUserId
            receiverUserId
            messages {
                sentAt
                message
                userId
            }
            isVisibleToReceiver
            isVisibleToSender
            id
            createdAt
        }
    }
}`