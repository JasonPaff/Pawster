const {createModule, gql} = require('graphql-modules');
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {hostNotFoundError, hostAlreadyExistsError, hostDoesNotExistError, hostsNotFoundError} = require("../api_responses/host/host_error");
const {findHost, doesHostExist, createHost, updateHost, deleteHost, findHosts, findHostUsers} = require("../../mongodb/operations/host_operations");
const {hostFoundSuccess, hostCreatedSuccess, hostUpdatedSuccess, hostDeletedSuccess, hostsFoundSuccess} = require("../api_responses/host/host_success");

module.exports.hostModule = createModule({
    id: 'host_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getHost : HostResponse
                getAllHosts : HostsResponse
                getHostById(userId: ID!) : HostResponse
                
            }

            extend type Mutation {
                createHost(host: HostInput!) : HostResponse
                updateHost(updatedHost: HostInput!) : HostResponse
                deleteHost : HostResponse
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
            }

            type HostResponse {
                success: Boolean
                message: String
                host: Host
            }

            type HostsResponse {
                success: Boolean
                message: String
                hosts: [Host]
            }
        `
    ],
    resolvers: {
        Query: {
            getHost: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const host = await findHost(userId);
                if (!host) return hostNotFoundError(userId);

                return hostFoundSuccess(host);
            },
            getAllHosts: async (parent, {}, context) => {
                const hosts = await findHosts();
                if (!hosts) return hostsNotFoundError();

                return hostsFoundSuccess(hosts);
            },
            getHostById: async (parent, {userId}) => {
                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const host = await findHost(userId);
                if (!host) return hostNotFoundError(userId);

                return hostFoundSuccess(host);
            }
        },
        Mutation: {
            createHost: async (parent, {host}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingHost = await doesHostExist(userId);
                if (existingHost) return hostAlreadyExistsError(userId);

                const newHost = await createHost(userId, host);

                return hostCreatedSuccess(newHost);
            },
            updateHost: async (parent, {updatedHost}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingHost = await doesHostExist(userId);
                if (!existingHost) return hostDoesNotExistError(userId);

                await updateHost(userId, updatedHost);

                return hostUpdatedSuccess(updatedHost);
            },
            deleteHost: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

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