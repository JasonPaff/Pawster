const {createModule, gql} = require('graphql-modules');
const {User, Address} = require('../../mongodb/models');
const {hashPassword, comparePasswordHashes} = require("../../utils/password_utils");
const {findUser, doesUserExist} = require("../../utils/database/user_utils");

module.exports.userModule = createModule({
    id: 'user_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            type Query {
                getUser(email: String!): UserResponse!
            }

            type Mutation {
                createUser(user: UserInput) : UserResponse
                updateUserEmail(email: String, newEmail: String) : UserResponse
                updateUserPassword(email: String, password: String, newPassword: String) : UserResponse
                deleteUser(email: String) : UserResponse
            }

            type User {
                id: ID!
                email: String!
                password: String!
                dateCreated: Date!
            }

            type UserResponse {
                success: Boolean
                message: String
                user: User
            }

            input UserInput {
                email: String!
                password: String!
            }
        `
    ],
    resolvers: {
        Query: {
            getUser: async (parent, {email}) => {
                const user = await findUser(email);

                if (!user) {
                    return {
                        success: false,
                        message: `no user found for ${email}`,
                        user: null
                    }
                }

                return {
                    success: true,
                    message: `${email} user data found`,
                    user: user
                }
            }
        },
        Mutation: {
            createUser: async (parent, {user}) => {
                const alreadyExists = await doesUserExist(user.email);
                if (alreadyExists) {
                    return {
                        success: false,
                        message: 'account with that email already exists',
                        user: null
                    };
                }

                // hash password
                user.password = await hashPassword(user.password);

                const newUser = new User(user);
                await newUser.save();

                return {
                    success: true,
                    message: `new user created`,
                    user: newUser
                };
            },
            updateUserPassword: async(parent, {email, password, newPassword}) => {
                // find the user
                const user = await findUser(email);
                if (!user) {
                    return {
                        success: false,
                        message: `no user account for ${email} found`,
                        address: null
                    };
                }

                // confirm valid password
                const validPassword = await comparePasswordHashes(password, user.password);
                if (!validPassword) {
                    return {
                        success: false,
                        message: `password did not match saved password for ${email}`,
                        address: null
                    };
                }

                // update hashed password
                user.password = await hashPassword(newPassword);

                // save update
                await User.findOneAndUpdate({
                        email: email
                    }, user
                );

                return {
                    success: true,
                    message: `password updated for ${email}`,
                    user: user
                }
            },
            updateUserEmail: async (parent, {email, newEmail}) => {
                // find the user
                const user = await findUser(email);
                if (!user) {
                    return {
                        success: false,
                        message: `no user account for ${email} found`,
                        address: null
                    };
                }

                // check for new email already in use
                const existingUser = await doesUserExist(newEmail);
                if (existingUser) {
                    return {
                        success: false,
                        message: `account with email ${newEmail} already exists`,
                        user: null
                    };
                }

                // update email
                user.email = newEmail;

                // save update
                await User.findOneAndUpdate({
                        email: email
                    }, user
                );

                return {
                    success: true,
                    message: `email address updated from ${email} to ${newEmail}`,
                    user: user
                }
            },
            deleteUser: async (parent, {email}) => {
                // find the user
                const user = await findUser(email);
                if (!user) {
                    return {
                        success: false,
                        message: `no user account for ${email} found`,
                        address: null
                    };
                }

                // delete user
                await User.findOneAndRemove({
                    email: email
                });

                // remove any addresses for the user
                await Address.findOneAndRemove({
                   userId: user._id
                });

                // Todo: add more deletes as database table get built

                return {
                    success: true,
                    message: `user account for ${email} deleted`,
                    user: user
                }
            }
        }
    }
});