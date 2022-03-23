import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function updatePetPhoto(photoId, petPhoto) {
    let query = gql`mutation Mutation($photoId: ID!, $petPhoto: PetPhotoInput!) {
        updatePetPhoto(photoId: $photoId, petPhoto: $petPhoto) {
            success
            message
            photo {
                petId
                photo
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
                photoId,
                petPhoto
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};