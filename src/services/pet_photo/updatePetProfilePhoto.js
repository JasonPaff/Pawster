import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function updatePetProfilePhoto(petId, photoId) {
    let query = gql`mutation Mutation($petId: ID!, $photoId: ID!) {
        updatePetProfilePhoto(petId: $petId, photoId: $photoId) {
            success
            message
            photo {
                petId
                photo
                isProfilePhoto
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
                petId,
                photoId
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};