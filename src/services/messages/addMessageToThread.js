import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function addMessageToThread(message) {
    let query = gql`mutation Mutation($message: MessageInput!) {
        addMessageToThread(message: $message) {
            success
            message
            messageThread {
                messages {
                    userId
                    sentAt
                    message
                }
                isVisibleToSender
                isVisibleToReceiver
                id
                createdAt
                senderUserId
                subject
                receiverUserId
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
                message
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};