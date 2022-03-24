import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function createSitting(userId, sitting) {
    let query = gql`mutation Mutation($userId: ID!, $sitting: SittingInput!) {
        createSitting(userId: $userId, sitting: $sitting) {
            success
            message
            sitting {
                additionalCatRate
                additionalDogRate
                baseRate
                bathingRate
                catRate
                extendedCareRate
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
                sitting
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};