const {createModule, gql} = require('graphql-modules');
const {authenticate, decodeToken} = require("../../utils/auth_utils");
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
                getWalking : WalkingResponse
                getWalkingById(userId: ID!) : WalkingResponse
            }

            extend type Mutation {
                createWalking(walking: WalkingInput!) : WalkingResponse
                updateWalking(updatedWalking: WalkingInput!) : WalkingResponse
                deleteWalking : WalkingResponse
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
            getWalking: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const walking = await findWalking(userId);
                if (!walking) return walkingNotFoundError(userId);

                return walkingFoundSuccess(walking);
            },
            getWalkingById: async (parent, {userId}) => {
                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const walking = await findWalking(userId);
                if (!walking) return walkingNotFoundError(userId);

                return walkingFoundSuccess(walking);
            }
        },
        Mutation: {
            createWalking: async (parent, {walking}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingWalking = await doesWalkingExist(userId);
                if (existingWalking) return walkingAlreadyExistsError(userId);

                const newWalking = await createWalking(userId, walking);

                return walkingCreatedSuccess(newWalking);
            },
            updateWalking: async (parent, {updatedWalking}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingWalking = await doesWalkingExist(userId);
                if (!existingWalking) return walkingDoesNotExistError(userId);

                await updateWalking(userId, updatedWalking);

                return walkingUpdatedSuccess(updatedWalking);
            },
            deleteWalking: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

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