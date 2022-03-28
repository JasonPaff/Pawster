const {createModule, gql} = require('graphql-modules');
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {findDaycare, doesDaycareExist, createDaycare, updateDaycare, deleteDaycare} = require("../../mongodb/operations/daycare_operations");
const {daycareNotFoundError, daycareAlreadyExistsError, daycareDoesNotExistError} = require("../api_responses/daycare/daycare_error");
const {daycareFoundSuccess, daycareCreatedSuccess, daycareUpdatedSuccess, daycareDeletedSuccess} = require("../api_responses/daycare/daycare_success");

module.exports.daycareModule = createModule({
    id: 'daycare_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getDaycare : DaycareResponse
                getDaycareById(userId: ID!) : DaycareResponse
            }

            extend type Mutation {
                createDaycare(daycare: DaycareInput!) : DaycareResponse
                updateDaycare(updatedDaycare:DaycareInput!) : DaycareResponse
                deleteDaycare : DaycareResponse
            }

            type Daycare {
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

            input DaycareInput {
                additionalCatRate: Float
                additionalDogRate: Float
                baseRate: Float
                bathingRate: Float
                catRate: Float
                holidayRate: Float
                pickUpDropOffRate: Float
                puppyRate: Float
            }

            type DaycareResponse {
                success: Boolean
                message: String
                daycare: Daycare
            }
        `
    ],
    resolvers: {
        Query: {
            getDaycare: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const daycare = await findDaycare(userId);
                if (!daycare) return daycareNotFoundError(userId);

                return daycareFoundSuccess(userId, daycare);
            },
            getDaycareById: async (parent, {userId}) => {
                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const daycare = await findDaycare(userId);
                if (!daycare) return daycareNotFoundError(userId);

                return daycareFoundSuccess(userId, daycare);
            }
        },
        Mutation: {
            createDaycare: async (parent, {daycare}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingDaycare = await doesDaycareExist(userId);
                if (existingDaycare) return daycareAlreadyExistsError(userId);

                const newDaycare = await createDaycare(userId, daycare);

                return daycareCreatedSuccess(userId, newDaycare);
            },
            updateDaycare: async (parent, {updatedDaycare}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingDaycare = await doesDaycareExist(userId);
                if (!existingDaycare) return daycareDoesNotExistError(userId);

                await updateDaycare(userId, updatedDaycare);

                return daycareUpdatedSuccess(userId, updatedDaycare);
            },
            deleteDaycare: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingDaycare = await doesDaycareExist(userId);
                if (!existingDaycare) return daycareDoesNotExistError(userId);

                await deleteDaycare(userId);

                return daycareDeletedSuccess(userId, existingDaycare);
            }
        }
    }
});