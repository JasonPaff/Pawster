module.exports.userPhotoNotFoundError = (id) => {
    return {
        success: false,
        message: `photo with id ${id} not found`,
        photo: null
    };
};

module.exports.userPhotosNotFoundError = (id) => {
    return {
        success: false,
        message: `photos for id ${id} not found`,
        photo: null
    };
};

module.exports.userProfilePhotoNotFoundError = (id) => {
    return {
        success: false,
        message: `profile photo for id ${id} not found`,
        photo: null
    };
};