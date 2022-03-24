const {createModule, gql} = require('graphql-modules');
const {authenticate} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {doesBoardingExist, createBoarding, updateBoarding, deleteBoarding, findBoarding} = require("../../mongodb/operations/boarding_operations");
const {boardingNotFoundError, boardingAlreadyExistsError, boardingDoesNotExistError} = require("../api_responses/boarding/boarding_error");
const {boardingFoundSuccess, boardingCreatedSuccess, boardingUpdatedSuccess, boardingDeletedSuccess} = require("../api_responses/boarding/boarding_success");

module.exports.boardingModule = createModule({
    id: 'boarding_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getBoarding(userId: ID!) : BoardingResponse
            }

            extend type Mutation {
                createBoarding(userId: ID!, boarding: BoardingInput!) : BoardingResponse
                updateBoarding(userId: ID!, updatedBoarding: BoardingInput!) : BoardingResponse
                deleteBoarding(userId: ID!) : BoardingResponse
            }

            type Boarding {
                additionalPetRate: Float
                bathingGroomingRate:Float
                dropOffRate: Float
                holidayRate:Float
                hourlyRate: Float
                id: ID
                pickupRate: Float
                userId: ID
            }

            input BoardingInput {
                additionalPetRate: Float
                bathingGroomingRate:Float
                dropOffRate: Float
                holidayRate:Float
                hourlyRate: Float
                pickupRate: Float
                userId: ID!
            }

            type BoardingResponse {
                success: Boolean
                message: String
                boarding: Boarding
            }
        `
    ],
    resolvers: {
        Query: {
            getBoarding: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const boarding = await findBoarding(userId);
                if (!boarding) return boardingNotFoundError(userId);

                return boardingFoundSuccess(boarding);
            }
        },
        Mutation: {
            createBoarding: async (parent, {userId, boarding}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingHost = await doesBoardingExist(userId);
                if (existingHost) return boardingAlreadyExistsError(userId);

                const newBoarding = await createBoarding(userId, boarding);

                return boardingCreatedSuccess(newBoarding);
            },
            updateBoarding: async (parent, {userId, updatedBoarding}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingBoarding = await doesBoardingExist(userId);
                if (!existingBoarding) return boardingDoesNotExistError(userId);

                const boarding = await updateBoarding(userId, updatedBoarding);

                return boardingUpdatedSuccess(boarding);
            },
            deleteBoarding: async (parent, {userId}, context) => {=======

                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingBoarding = await doesBoardingExist(userId);
                if (!existingBoarding) return boardingDoesNotExistError(userId);

                await deleteBoarding(userId);

                return boardingDeletedSuccess(userId);
            }
        }
    }
});