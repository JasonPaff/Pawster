import {gql} from "@apollo/client";

export const messageThreadCreatedSubscription = gql`subscription Subscription {
    messageThreadCreated {
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