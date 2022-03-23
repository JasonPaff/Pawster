module.exports.userPhotoFoundSuccess = (id, photo) => {
    return {
        success: true,
        message: `photo with id ${id} found`,
        photo: photo
    };
};

module.exports.userPhotosFoundSuccess = (email, photos) => {
    return {
        success: true,
        message: `photos for ${email} found`,
        photos: photos
    };
};

module.exports.userPhotoCreatedSuccess = (photo) => {
    return {
        success: true,
        message: `photo created`,
        photo: photo
    };
};

module.exports.userPhotoDeletedSuccess = (id, photo) => {
    return {
        success: true,
        message: `photo with id ${id} deleted`,
        photo: photo
    };
};

module.exports.userPhotosDeletedSuccess = (email, photos) => {
    return {
        success: true,
        message: `all photos for ${email} deleted`,
        photo: photos
    };
};