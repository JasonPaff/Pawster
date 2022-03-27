module.exports.addressFoundSuccess = (id, address) => {
    return {
        success: true,
        message: `address for ${id} found`,
        address: address
    };
};

module.exports.addressesFoundSuccess = (address) => {
    return {
        success: true,
        message: `addresses found`,
        addresses: addresses
    };
};

module.exports.addressUpdatedSuccess = (id, address) => {
    return {
        success: true,
        message: `address for ${id} updated`,
        address: address
    };
};

module.exports.addressCreatedSuccess = (id, address) => {
    return {
        success: true,
        message: `new address for ${id} created`,
        address: address
    };
};

module.exports.deleteAddressSuccess = (id, address) => {
    return {
        success: true,
        message: `address for ${id} deleted`,
        address: address
    };
};