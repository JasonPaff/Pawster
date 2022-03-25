import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function deleteBoarding() {
    let query = gql`mutation Mutation {
        deleteBoarding {
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
                pickUpDropOffRate
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
            query
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};