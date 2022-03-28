import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function getMessageThreadById(threadId) {
    let query = gql`query Query($threadId: ID!) {
        getMessageThreadById(threadId: $threadId) {
            success
            message
            messageThread {
                subject
                senderUserId
                receiverUserId
                messages {
                    userId
                    sentAt
                    message
                }
                isVisibleToReceiver
                isVisibleToSender
                id
                createdAt
            }
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
            query,
            variables : {
                threadId
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};