﻿import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function deletePet(id) {
    let query = gql`mutation Mutation($id: ID!) {
        deletePet(id: $id) {
            success
            message
            pet {
                id
                userId
                name
                additionalInfo
                ageMonth
                ageYear
                breed
                canBeLeftAlone
                description
                energyLevel
                feedingSchedule
                isFixed
                isHouseBroken
                isFriendlyToChildren
                isFriendlyToOtherCats
                isFriendlyToOtherDogs
                isMicroChipped
                medication
                medicationInstructions
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
                id
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};