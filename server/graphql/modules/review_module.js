const {createModule, gql} = require('graphql-modules');
const {authenticate} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {missingAddressError} = require("../api_responses/address/address_error");
const {missingReviewError, missingReviewsError} = require("../api_responses/review/review_error");
const {findReview, createReview, deleteReview, updateReview, findReviews} = require("../../mongodb/operations/review_operations");
const {reviewFoundSuccess, reviewCreatedSuccess, reviewUpdatedSuccess, deleteReviewSuccess, reviewsFoundSuccess} = require("../api_responses/review/review_success");

module.exports.reviewModule = createModule({
    id: 'review_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getReview(userId: ID!) : ReviewResponse
                getReviews(userId: ID!) : ReviewsResponse
            },
            extend type Mutation {
                createReview(userId: ID!, review: ReviewInput!) : ReviewResponse
                updateReview(userId: ID!, review: ReviewInput!) : ReviewResponse
                deleteReview(userId: ID!) : ReviewResponse
            },
            type Review {
                userId: ID
                userIdReviewed: ID
                review: String
                stars: Float
                dateReviewed: Date                
            }

            input ReviewInput {
                userIdReviewed: ID
                review: String
                stars: Float
                dateReviewed: Date
            }

            type ReviewResponse {
                success: Boolean
                message: String
                review: Review
            }
            
            type ReviewsResponse {
                success: Boolean
                message: String
                reviews: [Review]
            }
        `
    ],
    resolvers: {
        Query: {
            getReview: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const review = await findReview(userId);
                if (!review) return missingReviewError(userId);

                return reviewFoundSuccess(userId, review);
            },
            getReviews: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const reviews = await findReviews(userId);
                if (!reviews) return missingReviewsError(userId);

                return reviewsFoundSuccess(userId, reviews);
            },
        },
        Mutation: {
            createReview: async (parent, {userId, review}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const newReview = await createReview(userId, review)

                return reviewCreatedSuccess(userId, newReview);
            },
            updateReview: async (parent, {userId, updatedReview}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const review = await findReview(userId);
                if (!review) return missingReviewError(userId);

                await updateReview(userId, review);

                return reviewUpdatedSuccess(userId, review);
            },
            deleteAddress: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const existingReview = await findReview(userId);
                if (!existingReview) return missingAddressError(userId);

                await deleteReview(userId);

                return deleteReviewSuccess(userId, existingReview);
            }
        }
    }
});