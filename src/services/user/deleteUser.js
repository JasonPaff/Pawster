import {gql} from "@apollo/client";
import {apiRoute} from "../../utils/apiRoute";

export default async function deleteUser(email) {
    const query = gql`mutation Mutation($email: String!) {
        deleteUser(email: $email) {
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
                email
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};