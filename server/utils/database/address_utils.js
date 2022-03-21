const {Address} = require("../../mongodb/models");

// find an address
module.exports.findAddress = async function findAddress(email) {
    return Address.findOne({
        email: email
    });
}

// check for the existence of an address
module.exports.doesAddressExist = async function doesAddressExist(email) {
    return Address.exists({
        email: email
    });
}