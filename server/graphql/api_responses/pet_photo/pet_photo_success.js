module.exports.petPhotoFoundSuccess = (id, photo) => {
    return {
        success: true,
        message: `photo with id ${id} found`,
        photo: photo
    };
};

module.exports.petPhotosFoundSuccess = (id, photos) => {
    return {
        success: true,
        message: `photos for id ${id} found`,
        photos: photos
    };
};

module.exports.petPhotoCreatedSuccess = (photo) => {
    return {
        success: true,
        message: `photo created`,
        photo: photo
    };
};

module.exports.petPhotoDeletedSuccess = (id, photo) => {
    return {
        success: true,
        message: `photo with id ${id} deleted`,
        photo: photo
    };
};

module.exports.petPhotosDeletedSuccess = (id, photos) => {
    return {
        success: true,
        message: `all photos for pet ${id} deleted`,
        photo: photos
    };
};