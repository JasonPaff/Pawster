module.exports.userFoundSuccess = (user, email) => {
    return {
        success: true,
        message: `${email} user data found`,
        user: user
    };
};

module.exports.loginSuccess = (user, email, token) => {
    return {
        success: true,
        message: `login successful for ${email}`,
        user: user,
        token: token
    };
};

module.exports.createUserSuccess = (user, token) => {
    return {
        success: true,
        message: `new user created`,
        user: user,
        token: token
    };
};

module.exports.passwordUpdatedSuccess = (user, email) => {
    return {
        success: true,
        message: `password updated for ${email}`,
        user: user
    };
};

module.exports.emailUpdatedSuccess = (user, email, newEmail) => {
    return {
        success: true,
        message: `email address updated from ${email} to ${newEmail}`,
        user: user
    };
};

module.exports.accountDeleteSuccess = (user, email) => {
    return {
        success: true,
        message: `user account for ${email} deleted`,
        user: user
    };
};