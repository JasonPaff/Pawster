const {User} = require("../../mongodb/models");

// find a user
module.exports.findUser = async function findUser(email) {
    return User.findOne({
        email: email
    });
};

// check for the existence of a user
module.exports.doesUserExist = async function doesUserExist(email) {
    return User.exists({
        email: email
    });
}