module.exports.petPhotoNotFoundError = (id) => {
    return {
        success: false,
        message: `photo with id ${id} not found`,
        photo: null
    };
};

module.exports.petPhotosNotFoundError = (id) => {
    return {
        success: false,
        message: `photos for id ${id} not found`,
        photo: null
    };
};