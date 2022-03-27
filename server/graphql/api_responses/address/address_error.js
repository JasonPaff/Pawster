module.exports.missingAddressError = (id) => {
    return {
        success: false,
        message: `no address for ${id} found`,
        address: null
    };
};

module.exports.missingAddressesError = () => {
    return {
        success: false,
        message: `no addresses found`,
        addresses: null
    };
};

module.exports.existingAddressError = (id) => {
    return {
        success: false,
        message: `address for ${id} already exists, try updating instead`,
        address: null
    };
};