const {User} = require("../models");

module.exports.findUser = async (email) => {
    return User.findOne({
        email: email
    });
};

module.exports.doesUserExist = async (email) => {
    return User.exists({
        email: email
    });
};

module.exports.updateUser = async (user, email) => {
    await User.findOneAndUpdate({
            email: email
        }, user
    );
};

module.exports.createUser = async (email, password) => {
    const user = {
        email: email,
        password: password
    }
    const newUser = new User(user);
    await newUser.save();
    return newUser;
};

module.exports.deleteUser = async (email) => {
    await User.findOneAndRemove({
        email: email
    });
};