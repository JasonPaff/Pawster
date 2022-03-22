const {createModule, gql} = require('graphql-modules');
const {User, Address} = require('../../mongodb/models');
const {hashPassword, comparePasswordHashes} = require("../../utils/password_utils");
const {findUser, doesUserExist} = require("../../utils/database/user_utils");
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.userModule = createModule({
    id: 'user_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            type Query {
                getUser(email: String!): UserResponse
                validateLogin(email: String!, password: String!) : UserLoginResponse
            }

            type Mutation {
                createUser(email: String!, password: String!) : UserLoginResponse
                updateUserEmail(email: String!, newEmail: String!) : UserResponse
                updateUserPassword(email: String!, password: String!, newPassword: String!) : UserResponse
                deleteUser(email: String!) : UserResponse
            }

            type User {
                id: ID!
                email: String!
                password: String!
                dateCreated: Date!
            }

            type UserLoginResponse {
                success: Boolean
                message: String
                user: User
                token: String
            }
            
            type UserResponse {
                success: Boolean
                message: String
                user: User
            }
        `
    ],
    resolvers: {
        Query: {
            getUser: async (parent, {email}) => {
                // find the user
                const user = await findUser(email);
                if (!user) {
                    return {
                        success: false,
                        message: `no user found for ${email}`,
                        user: null
                    };
                }

                return {
                    success: true,
                    message: `${email} user data found`,
                    user: user
                }
            },
            validateLogin: async (parent, {email, password}) => {
                // find the user
                const user = await findUser(email);
                if (!user) {
                    return {
                        success: false,
                        message: `incorrect username/password`,
                        user: null
                    };
                }

                // confirm valid password
                const validPassword = await comparePasswordHashes(password, user.password);
                if (!validPassword) {
                    return {
                        success: false,
                        message: `incorrect username/password`,
                        user: null
                    };
                }

                // create token
                const token = jwt.sign({email: email}, process.ENV.JWT_KEY);

                return {
                    success: true,
                    message: `login successful for ${email}`,
                    user: user,
                    token: token
                };
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

                // save user to database
                const newUser = new User(user);
                await newUser.save();

                // create token
                const token = jwt.sign({email: user.email}, process.ENV.JWT_KEY);

                return {
                    success: true,
                    message: `new user created`,
                    user: newUser,
                    token: token
                };
            },
            updateUserPassword: async(parent, {email, password, newPassword}) => {
                // find the user
                const user = await findUser(email);
                if (!user) {
                    return {
                        success: false,
                        message: `no user account for ${email} found`,
                        user: null
                    };
                }

                // confirm valid password
                const validPassword = await comparePasswordHashes(password, user.password);
                if (!validPassword) {
                    return {
                        success: false,
                        message: `password did not match saved password for ${email}`,
                        user: null
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
                };
            },
            updateUserEmail: async (parent, {email, newEmail}) => {
                // find the user
                const user = await findUser(email);
                if (!user) {
                    return {
                        success: false,
                        message: `no user account for ${email} found`,
                        user: null
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
                };
            },
            deleteUser: async (parent, {email}) => {
                // find the user
                const user = await findUser(email);
                if (!user) {
                    return {
                        success: false,
                        message: `no user account for ${email} found`,
                        user: null
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
                };
            }
        }
    }
});