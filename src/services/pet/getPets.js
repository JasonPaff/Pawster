import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function getPets(email) {
    let query = gql`query Query($email: String!) {
        getPets(email: $email) {
            success
            message
            pets {
                additionalInfo
                ageMonth
                ageYear
                breed
                description
                canBeLeftAlone
                energyLevel
                feedingSchedule
                id
                isFixed
                isHouseBroken
                isFriendlyToChildren
                isFriendlyToOtherDogs
                isFriendlyToOtherCats
                medication
                isMicroChipped
                medicationInstructions
                name
                pottySchedule
                type
                vetDetails
                weight
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
                email
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};