import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function createWalking(userId, walking) {
    let query = gql`mutation Mutation($userId: ID!, $walking: WalkingInput!) {
        createWalking(userId: $userId, walking: $walking) {
            success
            message
            walking {
                additionalDogRate
                baseRate
                holidayRate
                hourlyRate
                id
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
                walking
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};