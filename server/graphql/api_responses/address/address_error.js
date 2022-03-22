module.exports.missingAddressError = (email) => {
    return {
        success: false,
        message: `no address for ${email} found`,
        address: null
    };
};

module.exports.existingAddressError = (email) => {
    return {
        success: false,
        message: `address for ${email} already exists, try updating instead`,
        address: null
    };
};