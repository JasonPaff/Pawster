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

module.exports.petProfilePhotoFoundSuccess = (id, photo) => {
    return {
        success: true,
        message: `profile photo for id ${id} found`,
        photo: photo
    };
};

module.exports.petPhotoAddedSuccess = (photo) => {
    return {
        success: true,
        message: `photo added`,
        photo: photo
    };
};

module.exports.petProfilePhotoUpdatedSuccess = (petId, photo) => {
    return {
        success: true,
        message: `profile photo updated for ${petId}`,
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