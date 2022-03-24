const {createModule, gql} = require('graphql-modules');
const {authenticate} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {findSitting, doesSittingExist, createSitting, updateSitting, deleteSitting} = require("../../mongodb/operations/sitting_operations");
const {sittingNotFoundError, sittingAlreadyExistsError, sittingDoesNotExistError} = require("../api_responses/sitting/sitting_error");
const {sittingCreatedSuccess, sittingUpdatedSuccess, sittingDeletedSuccess, sittingFoundSuccess} = require("../api_responses/sitting/sitting_success");

module.exports.sittingModule = createModule({
    id: 'sitting_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getSitting(userId: ID!) : SittingResponse
            }

            extend type Mutation {
                createSitting(userId: ID!, visit: SittingInput!) : SittingResponse
                updateSitting(userId: ID!, updatedSitting: SittingInput!) : SittingResponse
                deleteSitting(userId: ID!) : SittingResponse
            }

            type Sitting {
                additionalCatRate: Float
                additionalDogRate: Float
                baseRate: Float
                bathingRate: Float
                catRate: Float
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
            getSitting: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const sitting = await findSitting(userId);
                if (!sitting) return sittingNotFoundError(userId);

                return sittingFoundSuccess(sitting);
            }
        },
        Mutation: {
            createSitting: async (parent, {userId, sitting}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingSitting = await doesSittingExist(userId);
                if (existingSitting) return sittingAlreadyExistsError(userId);

                const newSitting = await createSitting(userId, sitting);

                return sittingCreatedSuccess(newSitting);
            },
            updateSitting: async (parent, {userId, updatedSitting}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingSitting = await doesSittingExist(userId);
                if (!existingSitting) return sittingDoesNotExistError(userId);

                const sitting = await updateSitting(userId, updatedSitting);

                return sittingUpdatedSuccess(sitting);
            },
            deleteSitting: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

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