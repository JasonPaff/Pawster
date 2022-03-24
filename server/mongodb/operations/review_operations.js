const {isValidObjectId} = require("../../utils/database_utils");
const {Review} = require("../schemas/review_schema");

module.exports.findReview = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Review.findOne({
        userId: userId
    });
};

module.exports.findReviews = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Review.find({
        userId: userId
    });
};

module.exports.doesReviewExist = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    return Review.exists({
        userId: userId
    });
};

module.exports.createReview = async (userId, review) => {
    if (!isValidObjectId(userId)) return false;
    review.userId = userId;
    const newReview = await new Review(review);
    await newReview.save();
    return newReview;
};

module.exports.updateReview = async (userId, updatedReview) => {
    if (!isValidObjectId(userId)) return false;
    await Review.findOneAndUpdate({
        userId: userId
    }, updatedReview);
};

module.exports.deleteReview = async (userId) => {
    if (!isValidObjectId(userId)) return false;
    await Review.findOneAndRemove({
        userId: userId
    });
};