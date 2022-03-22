const bcrypt = require("bcrypt");

module.exports.comparePasswordHashes = async function comparePasswordHashes(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}

module.exports.hashPassword = async function hashPassword(password) {
    return await bcrypt.hash(password, 5);
}