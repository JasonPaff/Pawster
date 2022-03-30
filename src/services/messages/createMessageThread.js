import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function createMessageThread(thread) {
    let query = gql`mutation CreateMessageThread($thread: MessageThreadInput!) {
        createMessageThread(messageThread: $thread) {
            success
            message
            messageThread {
                messages {
                    message
                    userId
                    sentAt
                }
                createdAt
                id
                isVisibleToSender
                isVisibleToReceiver
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
                thread
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};