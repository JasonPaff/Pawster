import {gql} from "@apollo/client";
import {apiRoute} from "../../utils/apiRoute";

export default async function updateUserPassword(email, password, newPassword) {
    const query = gql`mutation Mutation($email: String!, $password: String!, $newPassword: String!) {
        updateUserPassword(email: $email, password: $password, newPassword: $newPassword) {
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
                password,
                newPassword
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};