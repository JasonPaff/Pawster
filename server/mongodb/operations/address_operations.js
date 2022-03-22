const {Address} = require("../schemas/address_schema");

module.exports.findAddress = async (id) => {
    return Address.findOne({
        userId: id
    });
};

module.exports.doesAddressExist = async (id) => {
    return Address.exists({
        userId: id
    });
};

module.exports.deleteAddress = async (id) => {
    await Address.findOneAndRemove({
        userId: id
    });
};

module.exports.createAddress = async (id, address) => {
    address.userId = id;
    const newAddress = await new Address(address);
    await newAddress.save();
    return newAddress;
};

module.exports.updateAddress = async (id, address) => {
    await Address.findOneAndUpdate({
            id: id
        }, address
    );
};

module.exports.deleteAddress = async (email) => {
    await Address.findOneAndRemove({
        email: email
    });
};