import {apiRoute} from "../../utils/apiRoute";
import {gql} from "@apollo/client";
import getGqlString from "../../utils/graphql_utils";

export default async function getHost() {
    let query = gql`query Query {
        getHost {
            success
            message
            host {
                aboutMe
                cancellationPolicy
                canHostMultiplePets
                canHostUnspayedFemales
                daysAvailable
                doesCat
                doesDog
                doesBoarding
                doesHouseSitting
                doesDropInVisits
                doesDayCare
                doesDogWalking
                experience
                hasChildren
                hasOtherPets
                isHomeFullTime
                isSmoking
                range
                schedule
                sizeCanHost
                totalCanHost
                typeOfHome
                typeOfYard
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