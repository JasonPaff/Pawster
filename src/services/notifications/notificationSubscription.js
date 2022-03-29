import {gql} from "@apollo/client";

export const notificationSubscription = gql`subscription Subscription {
    notificationAdded {
        notification {
            id
            link
            message
            userId
        }
    }
}`