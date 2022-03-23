import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function getPet(id) {
    let query = gql`query GetPet($id: ID!) {
        getPet(id: $id) {
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
                id
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
                userId
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
                id
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};