const {createModule, gql} = require('graphql-modules');
const {jwtError} = require("../api_responses/auth/auth_error");
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {userIdNotFoundError} = require("../api_responses/user/user_error");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {missingReviewError, missingReviewsError} = require("../api_responses/review/review_error");
const {findReview, createReview, deleteReview, updateReview, findReviews, findReviewed} = require("../../mongodb/operations/review_operations");
const {reviewFoundSuccess, reviewCreatedSuccess, reviewUpdatedSuccess, deleteReviewSuccess, reviewsFoundSuccess} = require("../api_responses/review/review_success");

module.exports.reviewModule = createModule({
    id: 'review_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getReview(reviewId: ID!) : ReviewResponse
                getReviews : ReviewsResponse
                getReviewed: ReviewsResponse
                getReviewsById(userId: ID!) : ReviewsResponse
                getReviewedById(userId: ID!) : ReviewsResponse
            },
            extend type Mutation {
                createReview(review: ReviewInput!) : ReviewResponse
                updateReview(updatedReview: ReviewInput!) : ReviewResponse
                deleteReview(reviewId: ID!) : ReviewResponse
            },
            type Review {
                dateReviewed: Date
                id: ID
                review: String
                stars: Float
                userId: ID
                userIdReviewed: ID
            }

            input ReviewInput {
                userIdReviewed: ID!
                review: String!
                stars: Float!
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
            getReview: async (parent, {reviewId}) => {
                const review = await findReview(reviewId);
                if (!review) return missingReviewError(reviewId);

                return reviewFoundSuccess(reviewId, review);
            },
            getReviews: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const reviews = await findReviews(userId);
                if (!reviews) return missingReviewsError(userId);

                return reviewsFoundSuccess(userId, reviews);
            },
            getReviewed: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const reviews = await findReviewed(userId);
                if (!reviews) return missingReviewsError(userId);

                return reviewsFoundSuccess(userId, reviews);
            },
            getReviewsById: async (parent, {userId}) => {
                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const reviews = await findReviews(userId);
                if (!reviews) return missingReviewsError(userId);

                return reviewsFoundSuccess(userId, reviews);
            },
            getReviewedById: async (parent, {userId}) => {
                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const reviews = await findReviewed(userId);
                if (!reviews) return missingReviewsError(userId);

                return reviewsFoundSuccess(userId, reviews);
            },
        },
        Mutation: {
            createReview: async (parent, {review}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const newReview = await createReview(userId, review)

                return reviewCreatedSuccess(userId, newReview);
            },
            updateReview: async (parent, {reviewId, updatedReview}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                await updateReview(userId, updatedReview);

                return reviewUpdatedSuccess(userId, updatedReview);
            },
            deleteReview: async (parent, {reviewId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const existingReview = await findReview(reviewId);
                if (!existingReview) return missingReviewError(reviewId);

                await deleteReview(reviewId);

                return deleteReviewSuccess(userId, existingReview);
            }
        }
    }
});