import {gql} from "@apollo/client";

export const notificationSubscription = gql`subscription Subscription {
    notificationAdded {
        notification {
            fromUserId
            id
            link
            message
            toUserId
        }
    }
}`