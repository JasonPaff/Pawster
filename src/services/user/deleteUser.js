﻿import {gql} from "@apollo/client";
import {apiRoute} from "../../utils/apiRoute";
import getGqlString from "../../utils/graphql_utils";

export default async function deleteUser(userId) {
    let query = gql`mutation Mutation($userId: ID!) {
        deleteUser(userId: $userId) {
            success
            message
            user {
                id
                email
                password
                firstName
                lastName
                dateCreated
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
            variables: {
                userId
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};