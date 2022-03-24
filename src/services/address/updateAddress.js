import {gql} from "@apollo/client";
import {apiRoute} from "../../utils/apiRoute";
import getGqlString from "../../utils/graphql_utils";

export default async function updateAddress(userId, address) {
    let query = gql`mutation Mutation($userId: ID!, $address: AddressInput!) {
        updateAddress(userId: $userId, address: $address) {
            success
            message
            address {
                city
                state
                street
                zipcode
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
                userId,
                address
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};