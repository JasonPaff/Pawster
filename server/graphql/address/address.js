const {createModule, gql} = require('graphql-modules');
const {Address} = require("../../mongodb/models");
const {findAddress, doesAddressExist} = require("../../utils/database/address_utils");
const {findUser} = require("../../utils/database/user_utils");
const {authenticate} = require("../../utils/auth_utils");

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
                if (!authenticated) {
                    return {
                        success: false,
                        message: `invalid or missing jwt`,
                        user: null
                    };
                }

                // try to find the user
                const user = await findUser(email);

                // no user found
                if (!user) {
                    return {
                        success: false,
                        message: `no user account for ${email} found`,
                        address: null
                    };
                }

                // check for address
                const address = findAddress(user._id);

                // no address found
                if (!address) {
                    return {
                        success: false,
                        message: `no address for ${email} found`,
                        address: null
                    };
                }

                // address found
                return {
                    success: true,
                    message: `address for ${email} found`,
                    address: address
                };
            },
        },
        Mutation: {
            createAddress: async (parent, {email, address}, context) => {
                // authenticate request
                const authenticated = await authenticate(context);
                if (!authenticated) {
                    return {
                        success: false,
                        message: `invalid or missing jwt`,
                        user: null
                    };
                }

                // find matching user.
                const user = await findUser(email);
                if (!user) {
                    return {
                        success: false,
                        message: `no user account for ${email} found`,
                        address: null
                    };
                }

                // try to find an existing address for the user
                const hasAddress = await doesAddressExist(user._id);
                if (hasAddress) {
                    return {
                        success: false,
                        message: `address for ${email} already exists, try updating instead`,
                        address: null
                    };
                }

                // save address
                address.userId = user._id;
                const newAddress = new Address(address);
                await newAddress.save();

                return {
                    success: true,
                    message: `new address for ${email} created`,
                    address: newAddress
                };
            },
            updateAddress: async (parent, {email, address}, context) => {
                // authenticate request
                const authenticated = await authenticate(context);
                if (!authenticated) {
                    return {
                        success: false,
                        message: `invalid or missing jwt`,
                        user: null
                    };
                }

                // find matching user.
                const user = await findUser(email);
                if (!user) {
                    return {
                        success: false,
                        message: `no user account for ${email} found`,
                        address: null
                    };
                }

                // try to fine an address
                const existingAddress = await findAddress(user._id);

                // no address found
                if (!existingAddress) {
                    return {
                        success: false,
                        message: `no address for ${email} found`,
                        address: null
                    };
                }

                // build new address
                existingAddress.street = address.street ? address.street : existingAddress.street;
                existingAddress.city = address.city ? address.city : existingAddress.city;
                existingAddress.state = address.state ? address.state : existingAddress.state;
                existingAddress.zipcode = address.zipcode ? address.zipcode : existingAddress.zipcode;

                // update address
                await Address.findOneAndUpdate({
                        id: user._id
                    }, existingAddress
                );

                return {
                    success: true,
                    message: `address for ${email} updated`,
                    address: existingAddress
                };
            },
            deleteAddress: async (parent, {email}, context) => {
                // authenticate request
                const authenticated = await authenticate(context);
                if (!authenticated) {
                    return {
                        success: false,
                        message: `invalid or missing jwt`,
                        user: null
                    };
                }

                // find an address
                const existingAddress = await findAddress(email);

                // no address found
                if (!existingAddress) {
                    return {
                        success: false,
                        message: `no address for ${email} found`,
                        address: null
                    };
                }

                // delete address
                await Address.findOneAndRemove({
                        email: email
                    }
                );

                return {
                    success: true,
                    message: `address for ${email} deleted`,
                    address: existingAddress
                };
            }
        }
    }
});