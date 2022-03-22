import {gql} from "@apollo/client";
import {apiRoute} from "../../utils/apiRoute";

export default async function updateUserEmail(email, newEmail) {
    const query = gql`mutation Mutation($email: String!, $newEmail: String!) {
        updateUserEmail(email: $email, newEmail: $newEmail) {
            success
            message
            user {
                dateCreated
                password
                email
                id
            }
        }
    }`

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
                email,
                newEmail
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};