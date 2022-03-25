const {createModule, gql} = require('graphql-modules');
const {jwtError} = require("../api_responses/auth/auth_error");
const {loginSuccess} = require("../api_responses/auth/auth_success");
const {authenticate, createToken, decodeToken} = require("../../utils/auth_utils");
const {deletePets} = require("../../mongodb/operations/pet_operations");
const {deleteAddress} = require("../../mongodb/operations/address_operations");
const {hashPassword, comparePasswordHashes} = require("../../utils/password_utils");
const {deleteAllUserPhotos} = require("../../mongodb/operations/user_photo_operations");
const {updateUser, createUser, deleteUser, findUserByEmail, findUserById, doesUserEmailExist} = require("../../mongodb/operations/user_operations");
const {invalidUsernamePasswordError, invalidPasswordError, userAlreadyExistsError, userIdNotFoundError, userEmailNotFoundError} = require("../api_responses/user/user_error");
const {createUserSuccess, passwordUpdatedSuccess, emailUpdatedSuccess, accountDeletedSuccess, userEmailFoundSuccess, userIdFoundSuccess} = require("../api_responses/user/user_success");

module.exports.userModule = createModule({
    id: 'user_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            type Query {
                getUserByEmail(email: String!): UserResponse
                getUserById(userId: ID!): UserResponse
                getUser : UserResponse
                validateUserLogin(email: String!, password: String!) : UserLoginResponse
            }

            type Mutation {
                createUser(user: UserInput!) : UserLoginResponse
                updateUserPassword(password: String!, newPassword: String!) : UserResponse
                updateUserEmail( email: String!, newEmail: String!) : UserResponse
                deleteUser : UserResponse
            }
            
            type User {
                id: ID
                email: String
                password: String
                firstName: String
                lastName: String
                dateCreated: Date
            }

            input UserInput {
                email: String!
                password: String!
                firstName: String!
                lastName: String!
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
            getUser: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                return userIdFoundSuccess(user);
            },
            getUserByEmail: async (parent, {email}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserByEmail(email);
                if (!user) return userEmailNotFoundError(email);

                return userEmailFoundSuccess(user);
            },
            getUserById: async (parent, {userId}, context) => {
                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                return userIdFoundSuccess(user);
            },
            validateUserLogin: async (parent, {email, password}) => {
                const user = await findUserByEmail(email);
                if (!user) return userEmailNotFoundError(email);

                const validPassword = await comparePasswordHashes(password, user.password);
                if (!validPassword) return invalidUsernamePasswordError();

                const token = await createToken(user._id);

                return loginSuccess(user, token);
            }
        },
        Mutation: {
            createUser: async (parent, {user}) => {
                const userAlreadyExists = await doesUserEmailExist(user.email);
                if (userAlreadyExists) return userAlreadyExistsError(user.email);

                user.password = await hashPassword(user.password);

                const newUser = await createUser(user);
                const token = await createToken(user.email);

                return createUserSuccess(newUser, token);
            },
            updateUserPassword: async(parent, {password, newPassword}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const validPassword = await comparePasswordHashes(password, user.password);
                if (!validPassword) return invalidPasswordError(userId);

                user.password = await hashPassword(newPassword);
                await updateUser(user);

                return passwordUpdatedSuccess(user);
            },
            updateUserEmail: async (parent, {email, newEmail}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingUser = await doesUserEmailExist(newEmail);
                if (existingUser) return userAlreadyExistsError(newEmail);

                user.email = newEmail;
                await updateUser(user);

                return emailUpdatedSuccess(user, email, newEmail);
            },
            deleteUser: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                // Todo: add more deletes as database table get built
                await deleteUser(userId);
                await deleteAddress(userId);
                await deletePets(userId);
                await deleteAllUserPhotos(userId);

                return accountDeletedSuccess(user);
            }
        }
    }
});