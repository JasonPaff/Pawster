import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function getPet(petId) {
    let query = gql`query Query($petId: ID!) {
        getPet(petId: $petId) {
            success
            message
            pet {
                additionalInfo
                ageMonth
                ageYear
                canBeLeftAlone
                breed
                description
                energyLevel
                feedingSchedule
                isHouseBroken
                isFixed
                isFriendlyToChildren
                isFriendlyToOtherCats
                isFriendlyToOtherDogs
                isMicroChipped
                medication
                medicationInstructions
                name
                pottySchedule
                type
                vetDetails
                weight
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
                petId
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};