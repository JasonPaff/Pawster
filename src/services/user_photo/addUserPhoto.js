import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function addUserPhoto(userPhoto) {
    let query = gql`mutation Mutation($userPhoto: UserPhotoInput!) {
        addUserPhoto(userPhoto: $userPhoto) {
            success
            message
            photo {
                userId
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
                userPhoto
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};