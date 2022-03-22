import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";

export default async function createAddress(email, address) {
    const query = gql`mutation Mutation($email: String!, $address: AddressInput!) {
        createAddress(email: $email, address: $address) {
            success
            message
            address {
                street
                city
                state
                zipcode
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
                address
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};