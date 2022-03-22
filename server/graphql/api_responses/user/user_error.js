module.exports.userNotFoundError = (email) => {
    return {
        success: false,
        message: `no user found for ${email}`,
        user: null
    };
};

module.exports.invalidUsernamePasswordError = () => {
    return {
        success: false,
        message: `incorrect username/password`,
        user: null
    }
};

module.exports.invalidPasswordError = (email) => {
    return {
        success: false,
        message: `password did not match saved password for ${email}`,
        user: null
    };
};

module.exports.userAlreadyExistsError = (email) => {
    return {
        success: false,
        message: `account with email ${email} already exists`,
        user: null
    };
};