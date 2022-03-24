const {createModule, gql} = require('graphql-modules');
const {findAddress, doesAddressExist, createAddress, updateAddress, deleteAddress} = require("../../mongodb/operations/address_operations");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {authenticate} = require("../../utils/auth_utils");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {jwtError} = require("../api_responses/auth/auth_error");
const {missingAddressError, existingAddressError} = require("../api_responses/address/address_error");
const {addressFoundSuccess, addressUpdatedSuccess, addressCreatedSuccess, deleteAddressSuccess} = require("../api_responses/address/address_success");

module.exports.addressModule = createModule({
    id: 'address_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getAddress(userId: ID!) : AddressResponse
            },
            extend type Mutation {
                createAddress(userId: ID!, address: AddressInput!) : AddressResponse
                updateAddress(userId: ID!, address: AddressInput!) : AddressResponse
                deleteAddress(userId: ID!) : AddressResponse
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
        `
    ],
    resolvers: {
        Query: {
            getAddress: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const address = await findAddress(userId);
                if (!address) return missingAddressError(userId);

                return addressFoundSuccess(userId, address);
            },
        },
        Mutation: {
            createAddress: async (parent, {userId, address}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const hasAddress = await doesAddressExist(userId);
                if (hasAddress) return existingAddressError(userId);

                const newAddress = await createAddress(userId, address)

                return addressCreatedSuccess(userId, newAddress);
            },
            updateAddress: async (parent, {userId, address: updatedAddress}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const address = await findAddress(userId);
                if (!address) return missingAddressError(userId);

                address.street = updatedAddress.street ? updatedAddress.street : address.street;
                address.city = updatedAddress.city ? updatedAddress.city : address.city;
                address.state = updatedAddress.state ? updatedAddress.state : address.state;
                address.zipcode = updatedAddress.zipcode ? updatedAddress.zipcode : address.zipcode;

                await updateAddress(userId, address);

                return addressUpdatedSuccess(userId, address);
            },
            deleteAddress: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const existingAddress = await findAddress(userId);
                if (!existingAddress) return missingAddressError(userId);

                await deleteAddress(userId);

                return deleteAddressSuccess(userId, existingAddress);
            }
        }
    }
});