const {User} = require("../../mongodb/models");

module.exports.findUser = async function findUser(email) {
    return User.findOne(
        {
            email: email
        }
    );
};