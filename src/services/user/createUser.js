import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function createUser(user) {
    let query = gql`mutation Mutation($user: UserInput!) {
        createUser(user: $user) {
            success
            message
            token
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
        },
        body: JSON.stringify({
            query,
            variables: {
                user
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    const response = await request.json();

    if (response.data.createUser.success) {
        localStorage.setItem('jsonwebtoken', response.data.createUser.token);
        localStorage.setItem('email', response.data.createUser.user.email);
        localStorage.setItem('userId', response.data.createUser.user.id);
    }

    return response;
};