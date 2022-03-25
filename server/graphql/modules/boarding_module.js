const {createModule, gql} = require('graphql-modules');
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {
    doesBoardingExist,
    createBoarding,
    updateBoarding,
    deleteBoarding,
    findBoarding
} = require("../../mongodb/operations/boarding_operations");
const {
    boardingNotFoundError,
    boardingAlreadyExistsError,
    boardingDoesNotExistError
} = require("../api_responses/boarding/boarding_error");
const {
    boardingFoundSuccess,
    boardingCreatedSuccess,
    boardingUpdatedSuccess,
    boardingDeletedSuccess
} = require("../api_responses/boarding/boarding_success");

module.exports.boardingModule = createModule({
    id: 'boarding_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getBoarding : BoardingResponse
                getBoardingById(userId: ID!) : BoardingResponse
            }

            extend type Mutation {
                createBoarding(boarding: BoardingInput!) : BoardingResponse
                updateBoarding(updatedBoarding: BoardingInput!) : BoardingResponse
                deleteBoarding : BoardingResponse
            }

            type Boarding {
                additionalCatRate: Float
                additionalDogRate: Float
                baseRate: Float
                bathingRate: Float
                catRate: Float
                dailyRate: Float
                extendedCareRate: Float
                holidayRate: Float
                id: ID
                pickUpDropOffRate: Float
                userId: ID
            }

            input BoardingInput {
                additionalCatRate: Float
                additionalDogRate: Float
                baseRate: Float
                bathingRate: Float
                catRate: Float
                dailyRate: Float
                extendedCareRate: Float
                holidayRate: Float
                pickUpDropOffRate: Float
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
            getBoarding: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const boarding = await findBoarding(userId);
                if (!boarding) return boardingNotFoundError(userId);

                return boardingFoundSuccess(userId, boarding);
            },
            getBoardingById: async (parent, {userId}) => {
                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const boarding = await findBoarding(userId);
                if (!boarding) return boardingNotFoundError(userId);

                return boardingFoundSuccess(userId, boarding);
            }
        },
        Mutation: {
            createBoarding: async (parent, {boarding}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingBoarding = await doesBoardingExist(userId);
                if (existingBoarding) return boardingAlreadyExistsError(userId);

                const newBoarding = await createBoarding(userId, boarding);

                return boardingCreatedSuccess(userId, newBoarding);
            },
            updateBoarding: async (parent, {updatedBoarding}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingBoarding = await doesBoardingExist(userId);
                if (!existingBoarding) return boardingDoesNotExistError(userId);

                await updateBoarding(userId, updatedBoarding);

                return boardingUpdatedSuccess(userId, updatedBoarding);
            },
            deleteBoarding: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

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