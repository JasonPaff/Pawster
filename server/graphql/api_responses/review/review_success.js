module.exports.reviewFoundSuccess = (id, review) => {
    return {
        success: true,
        message: `review for ${id} found`,
        review: review
    };
};

module.exports.reviewsFoundSuccess = (id, reviews) => {
    return {
        success: true,
        message: `reviews for ${id} found`,
        reviews: reviews
    };
};

module.exports.reviewUpdatedSuccess = (id, review) => {
    return {
        success: true,
        message: `review for ${id} updated`,
        review: review
    };
};

module.exports.reviewCreatedSuccess = (id, review) => {
    return {
        success: true,
        message: `new address for ${id} created`,
        review: review
    };
};

module.exports.deleteReviewSuccess = (id, review) => {
    return {
        success: true,
        message: `review for ${id} deleted`,
        review: review
    };
};