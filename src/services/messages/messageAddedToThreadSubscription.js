import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

const query = gql`subscription Subscription {
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

export const messageAddedToThreadSubscription = getGqlString(query);