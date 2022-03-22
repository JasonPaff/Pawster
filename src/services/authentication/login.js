import {apiRoute} from "../../utils/apiRoute";

export default async function validateLogin(email, password) {
    const query = `query Query($email: String!, $password: String!) {
        validateLogin(email: $email, password: $password) {
            success
            message
            user {
                email
            }
        }
    }`

    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: {
                email,
                password
            }
        })
    };

    // TODO: add returned jwt to local storage when implemented on server
    //localStorage.setItem('jsonwebtoken', token)
    //localStorage.setItem('email', email)
    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
}