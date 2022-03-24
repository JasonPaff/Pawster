const {createModule, gql} = require('graphql-modules');
const {authenticate} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {hostNotFoundError, hostAlreadyExistsError, hostDoesNotExistError} = require("../api_responses/host/host_error");
const {findHost, doesHostExist, createHost, updateHost, deleteHost} = require("../../mongodb/operations/host_operations");
const {hostFoundSuccess, hostCreatedSuccess, hostUpdatedSuccess, hostDeletedSuccess} = require("../api_responses/host/host_success");

module.exports.hostModule = createModule({
    id: 'host_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getHost(userId: ID!) : HostResponse
            }

            extend type Mutation {
                createHost(userId: ID!, host: HostInput!) : HostResponse
                updateHost(userId: ID!, updatedHost: HostInput!) : HostResponse
                deleteHost(userId: ID!) : HostResponse
            }

            type Host {
                cancellationPolicy: String
                canHostMultiplePets: Boolean
                canHostUnspayedFemales: Boolean
                daysAvailable: String
                doesBoarding: Boolean
                doesHouseSitting: Boolean
                doesDropInVisits: Boolean
                doesDayCare: Boolean
                doesDogWalking: Boolean
                experience: String
                hasChildren: Boolean
                hasOtherPets: Boolean
                id: ID                
                isHomeFullTime: Boolean
                isSmoking: Boolean
                range: Int
                schedule: String
                sizeCanHost: String
                totalCanHost: Int
                typeOfHome: String
                typeOfYard: String
                userId: ID
            }

            input HostInput {
                cancellationPolicy: String
                canHostMultiplePets: Boolean
                canHostUnspayedFemales: Boolean
                daysAvailable: String
                doesBoarding: Boolean
                doesHouseSitting: Boolean
                doesDropInVisits: Boolean
                doesDayCare: Boolean
                doesDogWalking: Boolean
                experience: String
                hasChildren: Boolean
                hasOtherPets: Boolean
                isHomeFullTime: Boolean
                isSmoking: Boolean
                range: Int
                schedule: String
                sizeCanHost: String
                totalCanHost: Int
                typeOfHome: String
                typeOfYard: String
                userId: ID
            }

            type HostResponse {
                success: Boolean
                message: String
                host: Host
            }
        `
    ],
    resolvers: {
        Query: {
            getHost: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const host = await findHost(userId);
                if (!host) return hostNotFoundError(userId);

                return hostFoundSuccess(host);
            }
        },
        Mutation: {
            createHost: async (parent, {userId, host}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingHost = await doesHostExist(userId);
                if (existingHost) return hostAlreadyExistsError(userId);

                const newHost = await createHost(userId, host);

                return hostCreatedSuccess(newHost);
            },
            updateHost: async (parent, {userId, updatedHost}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingHost = await doesHostExist(userId);
                if (!existingHost) return hostDoesNotExistError(userId);

                const host = await updateHost(userId, updatedHost);

                return hostUpdatedSuccess(host);
            },
            deleteHost: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingHost = await doesHostExist(userId);
                if (!existingHost) return hostDoesNotExistError(userId);

                await deleteHost(userId);

                return hostDeletedSuccess(userId);
            },
        }
    }
});