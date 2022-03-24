import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function createDaycare(userId, daycare) {
    let query = gql`mutation Mutation($userId: ID!, $daycare: DaycareInput!) {
        createDaycare(userId: $userId, daycare: $daycare) {
            success
            message
            daycare {
                additionalCatRate
                additionalDogRate
                baseRate
                bathingRate
                catRate
                holidayRate
                id
                pickUpDropOffRate
                puppyRate
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
                daycare
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};