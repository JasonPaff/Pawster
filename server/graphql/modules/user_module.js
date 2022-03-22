const {createModule, gql} = require('graphql-modules');
const {hashPassword, comparePasswordHashes} = require("../../utils/password_utils");
const {findUser, doesUserExist, updateUser, createUser, deleteUser} = require("../../mongodb/operations/user_operations");
const {authenticate, createToken} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {userNotFoundError, invalidUsernamePasswordError, invalidPasswordError, userAlreadyExistsError} = require("../api_responses/user/user_error");
const {userFoundSuccess, createUserSuccess, passwordUpdatedSuccess, emailUpdatedSuccess, accountDeleteSuccess } = require("../api_responses/user/user_success");
const {deleteAddress} = require("../../mongodb/operations/address_operations");
const {loginSuccess} = require("../api_responses/auth/auth_success");

module.exports.userModule = createModule({
    id: 'user_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            type Query {
                getUser(email: String!): UserResponse
                validateUserLogin(email: String!, password: String!) : UserLoginResponse
            }

            type Mutation {
                createUser(email: String!, password: String!) : UserLoginResponse
                updateUserEmail(email: String!, newEmail: String!) : UserResponse
                updateUserPassword(email: String!, password: String!, newPassword: String!) : UserResponse
                deleteUser(email: String!) : UserResponse
            }

            type User {
                id: ID
                email: String
                password: String
                dateCreated: Date
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
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUser(email);
                if (!user) return userNotFoundError(email);

                return userFoundSuccess(user, email);
            },
            validateUserLogin: async (parent, {email, password}) => {
                const user = await findUser(email);
                if (!user) return userNotFoundError(email);

                const validPassword = await comparePasswordHashes(password, user.password);
                if (!validPassword) return invalidUsernamePasswordError();

                const token = await createToken(email);

                return loginSuccess(user, email, token);
            }
        },
        Mutation: {
            createUser: async (parent, {email, password}) => {
                const alreadyExists = await doesUserExist(email);
                if (alreadyExists) return userAlreadyExistsError(email);

                password = await hashPassword(password);

                const newUser = await createUser(email, password);
                const token = await createToken(email);

                return createUserSuccess(newUser, token);
            },
            updateUserPassword: async(parent, {email, password, newPassword}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUser(email);
                if (!user) return userNotFoundError(email);

                const validPassword = await comparePasswordHashes(password, user.password);
                if (!validPassword) return invalidPasswordError(email);

                user.password = await hashPassword(newPassword);
                await updateUser(user);

                return passwordUpdatedSuccess(user, email);
            },
            updateUserEmail: async (parent, {email, newEmail}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUser(email);
                if (!user) return userNotFoundError(email);

                const existingUser = await doesUserExist(newEmail);
                if (existingUser) return userAlreadyExistsError(newEmail);

                user.email = newEmail;
                await updateUser(user);

                return emailUpdatedSuccess(user, email, newEmail);
            },
            deleteUser: async (parent, {email}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUser(email);
                if (!user) return userNotFoundError(email);

                // Todo: add more deletes as database table get built
                await deleteUser(email);
                await deleteAddress(user._id);

                return accountDeleteSuccess(user, email);
            }
        }
    }
});