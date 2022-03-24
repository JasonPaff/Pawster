module.exports.missingReviewError = (id) => {
    return {
        success: false,
        message: `no review for ${id} found`,
        review: null
    };
};

module.exports.missingReviewsError = (id) => {
    return {
        success: false,
        message: `no reviews for ${id} found`,
        reviews: null
    };
};

module.exports.existingReviewError = (id) => {
    return {
        success: false,
        message: `review for ${id} already exists, try updating instead`,
        review: null
    };
};