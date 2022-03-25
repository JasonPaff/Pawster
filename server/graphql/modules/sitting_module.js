const {createModule, gql} = require('graphql-modules');
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {sittingNotFoundError, sittingAlreadyExistsError, sittingDoesNotExistError} = require("../api_responses/sitting/sitting_error");
const {findSitting, doesSittingExist, createSitting, updateSitting, deleteSitting} = require("../../mongodb/operations/sitting_operations");
const {sittingCreatedSuccess, sittingUpdatedSuccess, sittingDeletedSuccess, sittingFoundSuccess} = require("../api_responses/sitting/sitting_success");

module.exports.sittingModule = createModule({
    id: 'sitting_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getSitting : SittingResponse
                getSittingById(userId: ID!) : SittingResponse
            }

            extend type Mutation {
                createSitting(sitting: SittingInput!) : SittingResponse
                updateSitting(updatedSitting: SittingInput!) : SittingResponse
                deleteSitting : SittingResponse
            }

            type Sitting {
                additionalCatRate: Float
                additionalDogRate: Float
                baseRate: Float
                bathingRate: Float
                catRate: Float
                extendedCareRate: Float
                holidayRate: Float
                id: ID
                pickUpDropOffRate: Float
                puppyRate: Float
                userId: ID
            }

            input SittingInput {
                additionalCatRate: Float
                additionalDogRate: Float
                baseRate: Float
                bathingRate: Float
                catRate: Float
                holidayRate: Float
                hourlyRate: Float
                puppyRate: Float
            }

            type SittingResponse {
                success: Boolean
                message: String
                sitting: Sitting
            }
        `
    ],
    resolvers: {
        Query: {
            getSitting: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const sitting = await findSitting(userId);
                if (!sitting) return sittingNotFoundError(userId);

                return sittingFoundSuccess(sitting);
            },
            getSittingById: async (parent, {userId}) => {
                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const sitting = await findSitting(userId);
                if (!sitting) return sittingNotFoundError(userId);

                return sittingFoundSuccess(sitting);
            }
        },
        Mutation: {
            createSitting: async (parent, {sitting}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingSitting = await doesSittingExist(userId);
                if (existingSitting) return sittingAlreadyExistsError(userId);

                const newSitting = await createSitting(userId, sitting);

                return sittingCreatedSuccess(newSitting);
            },
            updateSitting: async (parent, {updatedSitting}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingSitting = await doesSittingExist(userId);
                if (!existingSitting) return sittingDoesNotExistError(userId);

                await updateSitting(userId, updatedSitting);

                return sittingUpdatedSuccess(updatedSitting);
            },
            deleteSitting: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingSitting = await doesSittingExist(userId);
                if (!existingSitting) return sittingDoesNotExistError(userId);

                await deleteSitting(userId);

                return sittingDeletedSuccess(userId);
            }
        }
    }
});