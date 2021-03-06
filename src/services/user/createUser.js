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
                email
                isHost
                password
                firstName
                lastName
                dateCreated
                id
            }
        }
    }`
    query = getGqlString(query);

    const headers = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            query,
            variables: {
                user,
            },
        }),
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    const response = await request.json();

    if (response.data.createUser.success) {
      localStorage.setItem('token', response.data.createUser.token);
      localStorage.setItem('firstName', response.data.createUser.user.firstName);
      localStorage.setItem('lastName', response.data.createUser.user.lastName)
      localStorage.setItem('id', response.data.createUser.user.id)
    }

    return response;
}