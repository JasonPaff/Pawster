import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function getSitting() {
    let query = gql`query Query {
        getSitting {
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
            query
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};