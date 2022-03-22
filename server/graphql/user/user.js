const {createModule, gql} = require('graphql-modules');
const {User, Address} = require('../../mongodb/models');
const {hashPassword, comparePasswordHashes} = require("../../utils/password_utils");
const {findUser, doesUserExist, updateUser, createUser, deleteUser} = require("../../utils/database/user_utils");
const {authenticate, createToken} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {userNotFoundError, invalidUsernamePasswordError, invalidPassword, userAlreadyExists} = require("../api_responses/user/user_error");
const {userFoundSuccess, loginSuccess, createUserSuccess,
       passwordUpdatedSuccess, emailUpdatedSuccess, accountDeleteSuccess
      } = require("../api_responses/user/user_success");
const {deleteAddress} = require("../../utils/database/address_utils");

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
            getUser: async (parent, {email}, context) => {
                // authenticate request
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError;

                // find the user
                const user = await findUser(email);
                if (!user) userNotFoundError(email);

                // user found
                return userFoundSuccess(user, email);
            },
            validateLogin: async (parent, {email, password}) => {
                // find the user
                const user = await findUser(email);
                if (!user) userNotFoundError(email);

                // confirm valid password
                const validPassword = await comparePasswordHashes(password, user.password);
                if (!validPassword) return invalidUsernamePasswordError;

                // create token
                const token = await createToken(email);

                // login successful
                return loginSuccess(user, email, token);
            }
        },
        Mutation: {
            createUser: async (parent, {user}) => {
                // check for existing user with the email
                const alreadyExists = await doesUserExist(user.email);
                if (alreadyExists) return userAlreadyExists(user.email);

                // hash password
                user.password = await hashPassword(user.password);

                // save user to database
                const newUser = await createUser(user);

                // create token
                const token = await createToken(user.email);

                // user creation successful
                return createUserSuccess(newUser, token);
            },
            updateUserPassword: async(parent, {email, password, newPassword}, context) => {
                // authenticate request
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError;

                // find the user
                const user = await findUser(email);
                if (!user) userNotFoundError(email);

                // confirm valid password
                const validPassword = await comparePasswordHashes(password, user.password);
                if (!validPassword) return invalidPassword(email);

                // update hashed password
                user.password = await hashPassword(newPassword);

                // update user in database
                await updateUser(user, email);

                // password update successful
                return passwordUpdatedSuccess(user, email);
            },
            updateUserEmail: async (parent, {email, newEmail}, context) => {
                // authenticate request
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError;

                // find the user
                const user = await findUser(email);
                if (!user) userNotFoundError(email);

                // check for new email already in use
                const existingUser = await doesUserExist(newEmail);
                if (existingUser) return userAlreadyExists(newEmail);

                // update email
                user.email = newEmail;

                // update user in database
                await updateUser(user, email);

                // email update successful
                return emailUpdatedSuccess(user, email, newEmail);
            },
            deleteUser: async (parent, {email}, context) => {
                // authenticate request
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError;

                // find the user
                const user = await findUser(email);
                if (!user) userNotFoundError(email);

                // delete user
                await deleteUser(email);

                // remove any addresses for the user
                await deleteAddress(user._id);

                // Todo: add more deletes as database table get built

                // account deletion successful
                return accountDeleteSuccess(user, email);
            }
        }
    }
});