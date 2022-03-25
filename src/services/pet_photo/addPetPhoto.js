import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function addPetPhoto(petPhoto) {
    let query = gql`mutation Mutation($petPhoto: PetPhotoInput!) {
        addPetPhoto(petPhoto: $petPhoto) {
            success
            message
            photo {
                photo
                photoType
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
                petPhoto
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};