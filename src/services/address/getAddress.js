import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";

export default async function getAddress(email) {
    const query = gql`query Query($email: String!) {
        getAddress(email: $email) {
            success
            message
            address {
                zipcode
                state
                city
                street
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