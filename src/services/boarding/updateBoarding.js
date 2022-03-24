import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function updateBoarding(userId, updatedBoarding) {
    let query = gql`mutation Mutation($userId: ID!, $updatedBoarding: BoardingInput!) {
        updateBoarding(userId: $userId, updatedBoarding: $updatedBoarding) {
            success
            message
            boarding {
                additionalCatRate
                additionalDogRate
                baseRate
                catRate
                dailyRate
                extendedCareRate
                holidayRate
                id
                pickUpDropOffRate
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
                userId,
                updatedBoarding
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};