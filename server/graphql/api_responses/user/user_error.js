module.exports.userNotFoundError = (email) => {
    return {
        success: false,
        message: `no user found for ${email}`,
        user: null
    };
};

module.exports.invalidUsernamePasswordError = {
    success: false,
    message: `incorrect username/password`,
    user: null
};

module.exports.invalidPassword = (email) => {
    return {
        success: false,
        message: `password did not match saved password for ${email}`,
        user: null
    };
};

module.exports.userAlreadyExists = (email) => {
    return {
        success: false,
        message: `account with email ${email} already exists`,
        user: null
    };
};