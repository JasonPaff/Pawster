const {createModule, gql} = require('graphql-modules');
const {authenticate} = require("../../utils/auth_utils");
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
                getDaycare(userId: ID!) : DaycareResponse
            }

            extend type Mutation {
                createDaycare(userId: ID!, daycare: DaycareInput!) : DaycareResponse
                updateDaycare(userId: ID!, updatedDaycare:DaycareInput!) : DaycareResponse
                deleteDaycare(userId: ID!) : DaycareResponse
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
                hourlyRate: Float
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
            getDaycare: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const daycare = await findDaycare(userId);
                if (!daycare) return daycareNotFoundError(userId);

                return daycareFoundSuccess(daycare);
            }
        },
        Mutation: {
            createDaycare: async (parent, {userId, daycare}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingDaycare = await doesDaycareExist(userId);
                if (existingDaycare) return daycareAlreadyExistsError(userId);

                const newDaycare = await createDaycare(userId, daycare);

                return daycareCreatedSuccess(newDaycare);
            },
            updateDaycare: async (parent, {userId, updatedDaycare}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingDaycare = await doesDaycareExist(userId);
                if (!existingDaycare) return daycareDoesNotExistError(userId);

                const daycare = await updateDaycare(userId, updatedDaycare);

                return daycareUpdatedSuccess(daycare);
            },
            deleteDaycare: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingDaycare = await doesDaycareExist(userId);
                if (!existingDaycare) return daycareDoesNotExistError(userId);

                await deleteDaycare(userId);

                return daycareDeletedSuccess(userId);
            }
        }
    }
});