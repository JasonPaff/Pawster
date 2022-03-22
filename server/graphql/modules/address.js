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
                // authenticate request
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError;

                // try to find the user
                const user = await findUser(email);
                if (!user) userNotFoundError(email);

                // check for address
                const address = findAddress(user._id);

                // no address found
                if (!address) return missingAddressError(email);

                // address found
                return addressFoundSuccess(email, address);
            },
        },
        Mutation: {
            createAddress: async (parent, {email, address}, context) => {
                // authenticate request
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError;

                // find matching user.
                const user = await findUser(email);
                if (!user) userNotFoundError(email);

                // try to find an existing address for the user
                const hasAddress = await doesAddressExist(user._id);
                if (hasAddress) return existingAddressError(email);

                // save address to database
                const newAddress = await createAddress(user._id, address)

                // address creation successful
                return addressCreatedSuccess(email, newAddress);
            },
            updateAddress: async (parent, {email, address}, context) => {
                // authenticate request
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError;

                // find matching user.
                const user = await findUser(email);
                if (!user) userNotFoundError(email);

                // try to fine an address
                const existingAddress = await findAddress(user._id);

                // no address found
                if (!existingAddress) return missingAddressError(email);

                // build new address
                existingAddress.street = address.street ? address.street : existingAddress.street;
                existingAddress.city = address.city ? address.city : existingAddress.city;
                existingAddress.state = address.state ? address.state : existingAddress.state;
                existingAddress.zipcode = address.zipcode ? address.zipcode : existingAddress.zipcode;

                // update address in database
                await updateAddress(user._id, address);

                // update address successful
                return addressUpdatedSuccess(email, existingAddress);
            },
            deleteAddress: async (parent, {email}, context) => {
                // authenticate request
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError;

                // find an address
                const existingAddress = await findAddress(email);

                // no address found
                if (!existingAddress) return missingAddressError(email);

                // delete address
                await deleteAddress(email);

                // address deletion successful
                return deleteAddressSuccess(email, existingAddress);
            }
        }
    }
});