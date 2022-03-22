module.exports.addressFoundSuccess = (email, address) => {
    return {
        success: true,
        message: `address for ${email} found`,
        address: address
    };
};

module.exports.addressUpdatedSuccess = (email, address) => {
    return {
        success: true,
        message: `new address for ${email} created`,
        address: address
    };
};

module.exports.addressCreatedSuccess = (email, address) => {
    return {
        success: true,
        message: `new address for ${email} created`,
        address: address
    };
};

module.exports.deleteAddressSuccess = (email, address) => {
    return {
        success: true,
        message: `address for ${email} deleted`,
        address: address
    };
}