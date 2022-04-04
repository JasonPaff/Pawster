import {gql} from "@apollo/client";
import {apiRoute} from "../../utils/apiRoute";
import getGqlString from "../../utils/graphql_utils";

export default async function getHostOrders() {
    let query = gql`query Query {
        findHostOrders {
            success
            message
            orders {
                id
                userId
                hostId
                service
                total
                date
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
            query
        })
    };

    const request = await fetch(`${apiRoute}/graphql`, headers);
    return await request.json();
};