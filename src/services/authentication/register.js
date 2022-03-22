import {apiRoute} from "../../utils/apiRoute";

export default async function createAccount(email, password) {
    const query = `mutation Mutation($user: UserInput) {
        createUser(user: $user) {
            success
            message
        }
    }`

    // TODO: add jwt to header when implemented

    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: {
                input: {
                    email,
                    password
                }
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
}