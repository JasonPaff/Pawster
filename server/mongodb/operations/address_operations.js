const {Address} = require("../schemas/address_schema");
const {isValidObjectId} = require("../../utils/database_utils");

module.exports.findAddress = async (id) => {
    if (!isValidObjectId(id)) return false;
    return Address.findOne({
        userId: id
    });
};

module.exports.findAddresses = async () => {
    return Address.find({});
};

module.exports.doesAddressExist = async (id) => {
    if (!isValidObjectId(id)) return false;
    return Address.exists({
        userId: id
    });
};

module.exports.createAddress = async (id, address) => {
    if (!isValidObjectId(id)) return false;
    address.userId = id;
    const newAddress = await new Address(address);
    await newAddress.save();
    return newAddress;
};

module.exports.updateAddress = async (id, address) => {
    if (!isValidObjectId(id)) return false;
    await Address.findOneAndUpdate({
            userId: id
        }, address
    );
};

module.exports.deleteAddress = async (id) => {
    if (!isValidObjectId(id)) return false;
    await Address.findOneAndRemove({
        userId: id
    });
};