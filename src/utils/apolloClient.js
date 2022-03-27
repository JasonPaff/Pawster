import {WebSocketLink} from "apollo-link-ws";
import {HttpLink} from "apollo-link-http";
import {split} from "apollo-link";
import {getMainDefinition} from "apollo-utilities";
import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {apiRoute, apiRouteWs} from "./apiRoute";

const wsLink = new WebSocketLink({
    uri: `${apiRouteWs}/graphql`,
    options: {
        reconnect: true,
    },
});

const httpLink = new HttpLink({
    uri: `${apiRoute}/graphql`,
});

const link = split(
    // split based on an operation type
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});