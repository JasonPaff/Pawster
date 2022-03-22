const {createModule, gql} = require('graphql-modules');
const {findAddress, doesAddressExist, createAddress, updateAddress, deleteAddress} = require("../../mongodb/operations/address_operations");
const {findUser} = require("../../mongodb/operations/user_operations");
const {authenticate} = require("../../utils/auth_utils");
const {userNotFoundError} = require("../api_responses/user/user_error");
const {jwtError} = require("../api_responses/auth/auth_error");
const {missingAddressError, existingAddressError} = require("../api_responses/address/address_error");
const {addressFoundSuccess, addressUpdatedSuccess, addressCreatedSuccess, deleteAddressSuccess} = require("../api_responses/address/address_success");

module.exports.addressModule = createModule({
    id: 'address_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getAddress(email: String!) : AddressResponse
            },
            extend type Mutation {
                createAddress(email: String!, address: AddressInput!) : AddressResponse
                updateAddress(email: String!, address: AddressInput!) : AddressResponse
                deleteAddress(email: String!) : AddressResponse
            },
            type Address {
                street: String!
                city: String!
                state: String!
                zipcode: Int!
            }

            input AddressInput {
                street: String!
                city: String!
                state: String!
                zipcode: Int!
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
            getAddress: async (parent, {email}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError;

                const user = await findUser(email);
                if (!user) return userNotFoundError(email);

                const address = await findAddress(user._id);
                if (!address) return missingAddressError(email);

                return addressFoundSuccess(email, address);
            },
        },
        Mutation: {
            createAddress: async (parent, {email, address}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError;

                const user = await findUser(email);
                if (!user) return userNotFoundError(email);

                const hasAddress = await doesAddressExist(user._id);
                if (hasAddress) return existingAddressError(email);

                const newAddress = await createAddress(user._id, address)

                return addressCreatedSuccess(email, newAddress);
            },
            updateAddress: async (parent, {email, address: newAddress}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError;

                const user = await findUser(email);
                if (!user) return userNotFoundError(email);

                const address = await findAddress(user._id);
                if (!address) return missingAddressError(email);

                address.street = newAddress.street ? newAddress.street : address.street;
                address.city = newAddress.city ? newAddress.city : address.city;
                address.state = newAddress.state ? newAddress.state : address.state;
                address.zipcode = newAddress.zipcode ? newAddress.zipcode : address.zipcode;

                await updateAddress(user._id, address);

                return addressUpdatedSuccess(email, address);
            },
            deleteAddress: async (parent, {email}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError;

                const existingAddress = await findAddress(email);
                if (!existingAddress) return missingAddressError(email);

                await deleteAddress(email);

                return deleteAddressSuccess(email, existingAddress);
            }
        }
    }
});