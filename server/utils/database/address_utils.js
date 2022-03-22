const {Address} = require("../../mongodb/models");

// find an address
module.exports.findAddress = async function findAddress(id) {
    return Address.findOne({
        userId: id
    });
}

// check for the existence of an address
module.exports.doesAddressExist = async function doesAddressExist(id) {
    return Address.exists({
        userId: id
    });
}