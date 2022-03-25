const {createModule, gql} = require('graphql-modules');
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {visitNotFoundError, visitAlreadyExistsError, visitDoesNotExistError} = require("../api_responses/visit/visit_error");
const {findVisit, doesVisitExist, createVisit, updateVisit, deleteVisit} = require("../../mongodb/operations/visit_operations");
const {visitFoundSuccess, visitCreatedSuccess, visitUpdatedSuccess, visitDeletedSuccess} = require("../api_responses/visit/visit_success");

module.exports.visitModule = createModule({
    id: 'visit_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getVisit : VisitResponse
            }

            extend type Mutation {
                createVisit(visit: VisitInput!) : VisitResponse
                updateVisit(updatedVisit: VisitInput!) : VisitResponse
                deleteVisit : VisitResponse
            }

            type Visit {
                additionalCatRate: Float
                additionalDogRate: Float
                baseRate: Float
                bathingRate: Float
                catRate: Float
                holidayRate: Float
                hourlyRate: Float
                id: ID
                puppyRate: Float
                userId: ID
            }

            input VisitInput {
                additionalCatRate: Float
                additionalDogRate: Float
                baseRate: Float
                bathingRate: Float
                catRate: Float
                holidayRate: Float
                hourlyRate: Float
                puppyRate: Float
            }

            type VisitResponse {
                success: Boolean
                message: String
                visit: Visit
            }
        `
    ],
    resolvers: {
        Query: {
            getVisit: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const visit = await findVisit(userId);
                if (!visit) return visitNotFoundError(userId);

                return visitFoundSuccess(visit);
            }
        },
        Mutation: {
            createVisit: async (parent, {visit}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingVisit = await doesVisitExist(userId);
                if (existingVisit) return visitAlreadyExistsError(userId);

                const newWalking = await createVisit(userId, visit);

                return visitCreatedSuccess(newWalking);
            },
            updateVisit: async (parent, {updatedVisit}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingVisit = await doesVisitExist(userId);
                if (!existingVisit) return visitDoesNotExistError(userId);

                const visit = await updateVisit(userId, updatedVisit);

                return visitUpdatedSuccess(visit);
            },
            deleteVisit: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const existingVisit = await doesVisitExist(userId);
                if (!existingVisit) return visitDoesNotExistError(userId);

                await deleteVisit(userId);

                return visitDeletedSuccess(userId);
            }
        }
    }
});