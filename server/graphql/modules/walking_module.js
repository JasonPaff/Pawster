const {createModule, gql} = require('graphql-modules');
const {authenticate} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {walkingNotFoundError, walkingAlreadyExistsError, walkingDoesNotExistError} = require("../api_responses/walking/walking_error");
const {findWalking, doesWalkingExist, updateWalking, createWalking, deleteWalking} = require("../../mongodb/operations/walking_operations");
const {walkingFoundSuccess, walkingCreatedSuccess, walkingUpdatedSuccess, walkingDeletedSuccess} = require("../api_responses/walking/walking_success");

module.exports.walkingModule = createModule({
    id: 'walking_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getWalking(userId: ID!) : WalkingResponse
            }

            extend type Mutation {
                createWalking(userId: ID!, walking: WalkingInput!) : WalkingResponse
                updateWalking(userId: ID!, updatedWalking: WalkingInput!) : WalkingResponse
                deleteWalking(userId: ID!) : WalkingResponse
            }

            type Walking {
                additionalDogRate: Float
                baseRate: Float
                holidayRate: Float
                hourlyRate: Float
                id: ID
                puppyRate: Float
                userId: ID
            }

            input WalkingInput {
                additionalDogRate: Float
                baseRate: Float
                holidayRate: Float
                hourlyRate: Float
                puppyRate: Float
            }

            type WalkingResponse {
                success: Boolean
                message: String
                walking: Walking
            }
        `
    ],
    resolvers: {
        Query: {
            getWalking: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const walking = await findWalking(userId);
                if (!walking) return walkingNotFoundError(userId);

                return walkingFoundSuccess(walking);
            }
        },
        Mutation: {
            createWalking: async (parent, {userId, walking}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingWalking = await doesWalkingExist(userId);
                if (existingWalking) return walkingAlreadyExistsError(userId);

                const newWalking = await createWalking(userId, walking);

                return walkingCreatedSuccess(newWalking);
            },
            updateWalking: async (parent, {userId, updatedWalking}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingWalking = await doesWalkingExist(userId);
                if (!existingWalking) return walkingDoesNotExistError(userId);

                const walking = await updateWalking(userId, updatedWalking);

                return walkingUpdatedSuccess(walking);
            },
            deleteWalking: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingWalking = await doesWalkingExist(userId);
                if (!existingWalking) return walkingDoesNotExistError(userId);

                await deleteWalking(userId);

                return walkingDeletedSuccess(userId);
            }
        }
    }
});