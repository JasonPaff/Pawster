const {createModule, gql} = require('graphql-modules');
const {findAddress, doesAddressExist, createAddress, updateAddress, deleteAddress, findAddresses, findHostAddresses} = require("../../mongodb/operations/address_operations");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {jwtError} = require("../api_responses/auth/auth_error");
const {missingAddressError, existingAddressError, missingAddressesError} = require("../api_responses/address/address_error");
const {addressFoundSuccess, addressUpdatedSuccess, addressCreatedSuccess, deleteAddressSuccess, addressesFoundSuccess} = require("../api_responses/address/address_success");
const {hostsNotFoundError} = require("../api_responses/host/host_error");
const {findHostUsers} = require("../../mongodb/operations/host_operations");

module.exports.addressModule = createModule({
    id: 'address_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getAddress : AddressResponse
                getHostAddresses : AddressesResponse
                getAddressById(userId: ID!) : AddressResponse
            },
            extend type Mutation {
                createAddress(address: AddressInput!) : AddressResponse
                updateAddress(updatedAddress: AddressInput!) : AddressResponse
                deleteAddress : AddressResponse
            },
            type Address {
                street: String
                city: String
                state: String
                userId: ID
                zipcode: Int
            }

            input AddressInput {
                street: String
                city: String
                state: String
                zipcode: Int
            }

            type AddressResponse {
                success: Boolean
                message: String
                address: Address
            }
            
            type AddressesResponse {
                success: Boolean
                message: String
                addresses: [Address]
            }
        `
    ],
    resolvers: {
        Query: {
            getAddress: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const address = await findAddress(userId);
                if (!address) return missingAddressError(userId);

                return addressFoundSuccess(userId, address);
            },
            getHostAddresses: async (parent, {}, context) => {
                const hosts = await findHostUsers();
                if (!hosts) return hostsNotFoundError();

                const addresses = await findHostAddresses(hosts);
                if (!addresses) return missingAddressesError();

                console.log(addresses);

                return addressesFoundSuccess(addresses);
            },
            getAddressById: async (parent, {userId}, context) => {
                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const address = await findAddress(userId);
                if (!address) return missingAddressError(userId);

                return addressFoundSuccess(userId, address);
            },
        },
        Mutation: {
            createAddress: async (parent, {address}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const hasAddress = await doesAddressExist(userId);
                if (hasAddress) return existingAddressError(userId);

                const newAddress = await createAddress(userId, address)

                return addressCreatedSuccess(userId, newAddress);
            },
            updateAddress: async (parent, {updatedAddress}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                await updateAddress(userId, updatedAddress);

                return addressUpdatedSuccess(userId, updatedAddress);
            },
            deleteAddress: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const existingAddress = await findAddress(userId);
                if (!existingAddress) return missingAddressError(userId);

                await deleteAddress(userId);

                return deleteAddressSuccess(userId, existingAddress);
            }
        }
    }
});