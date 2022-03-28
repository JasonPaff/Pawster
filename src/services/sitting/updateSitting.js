import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

// TH : excluded pickupdropoffrate

export default async function updateSitting(updatedSitting) {
    let query = gql`mutation Mutation($updatedSitting: SittingInput!) {
        updateSitting(updatedSitting: $updatedSitting) {
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
                puppyRate
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
                updatedSitting
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};