import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function getMessageThreads() {
    let query = gql`query Query {
        getMessageThreads {
            messageThreads {
                createdAt
                id
                isVisibleToSender
                isVisibleToReceiver
                messages {
                    sentAt
                    message
                    userId
                }
                receiverUserId
                senderUserId
                subject
            }
            message
            success
        }
    }`
    query = getGqlString(query);

    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
            query
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};