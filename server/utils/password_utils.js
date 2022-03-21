const bcrypt = require("bcrypt");

module.exports.comparePasswordHashes = async function comparePasswordHashes(newPassword, oldPasswordHash) {
    return bcrypt.compare(newPassword, oldPasswordHash);
}

module.exports.hashPassword = async function hashPassword(password) {
    return await bcrypt.hash(password, 5);
}