import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function deleteDaycare(userId) {
    let query = gql`mutation Mutation($userId: ID!) {
        deleteDaycare(userId: $userId) {
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
                userId
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};