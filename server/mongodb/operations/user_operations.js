const {User} = require("../schemas/user_schema");

module.exports.findUsers = async () => {
    return User.find({});
};

module.exports.findUserById = async (userId) => {
    return User.findOne({
        _id: userId
    });
};

module.exports.findUserByEmail = async (email) => {
    return User.findOne({
        email: email
    });
};

module.exports.doesUserEmailExist = async (email) => {
    return User.exists({
        email: email
    });
};


module.exports.doesUserAccountExist = async (userId) => {
    return User.exists({
        _id: userId
    });
};

module.exports.updateUser = async (user) => {
    await User.findOneAndUpdate({
            _id: user.id
        }, user
    );
};

module.exports.createUser = async (user) => {
    const newUser = await new User(user);
    await newUser.save();
    return newUser;
};

module.exports.deleteUser = async (userId) => {
    await User.findOneAndRemove({
        _id: userId
    });
};