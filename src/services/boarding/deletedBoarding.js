import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function deleteBoarding(userId) {
    let query = gql`mutation Mutation($userId: ID!) {
        deleteBoarding(userId: $userId) {
            success
            message
            boarding {
                additionalPetRate
                bathingGroomingRate
                dropOffRate
                holidayRate
                hourlyRate
                id
                pickupRate
                userId
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