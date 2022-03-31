module.exports.userPhotoFoundSuccess = (id, photo) => {
    return {
        success: true,
        message: `photo with id ${id} found`,
        photo: photo
    };
};

module.exports.userPhotosFoundSuccess = (userId, photos) => {
    return {
        success: true,
        message: `photos for ${userId} found`,
        photos: photos
    };
};

module.exports.userPhotoAddedSuccess = (photo) => {
    return {
        success: true,
        message: `photo added`,
        photo: photo
    };
};

module.exports.userProfilePhotoFoundSuccess = (id, photo) => {
    return {
        success: true,
        message: `profile photo for id ${id} found`,
        photo: photo
    };
};

module.exports.userProfilePhotoUpdatedSuccess = (userId, photo) => {
    return {
        success: true,
        message: `profile photo updated for ${userId}`,
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

module.exports.userPhotosDeletedSuccess = (userId, photos) => {
    return {
        success: true,
        message: `all photos for ${userId} deleted`,
        photo: photos
    };
};