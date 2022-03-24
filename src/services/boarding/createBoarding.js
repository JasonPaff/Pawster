import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function createBoarding(userId, boarding) {
    let query = gql`mutation Mutation($userId: ID!, $boarding: BoardingInput!) {
        createBoarding(userId: $userId, boarding: $boarding) {
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
                boarding
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};