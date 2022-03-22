import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function createUser(email, password) {
    let query = gql`mutation Mutation($email: String!, $password: String!) {
        createUser(email : $email, password: $password) {
            success
            message
            token
            user {
                email
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
                email,
                password
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    const response = await request.json();

    if (response.data.createUser.success) {
        localStorage.setItem('jsonwebtoken', response.data.createUser.token);
        localStorage.setItem('email', response.data.createUser.user.email);
    }

    return response;
};