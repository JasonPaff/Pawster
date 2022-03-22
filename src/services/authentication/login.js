import {gql} from "@apollo/client";
import {apiRoute} from "../../utils/apiRoute";

export default async function validateLogin(email, password) {
    const query = gql`query Query($email: String!, $password: String!) {
        validateLogin(email: $email, password: $password) {
            success
            message
            token
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
                password,
                email
            }
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    const response = await request.json();

    if (response.data.validateLogin.success) {
        localStorage.setItem('jsonwebtoken', response.data.validateLogin.token);
        localStorage.setItem('email', response.data.validateLogin.user.email);
    }

    return response;
};