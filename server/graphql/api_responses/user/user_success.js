module.exports.userEmailFoundSuccess = (user) => {
    return {
        success: true,
        message: `${user.email} user data found`,
        user: user
    };
};

module.exports.userIdFoundSuccess = (user) => {
    return {
        success: true,
        message: `user id ${user.id} data found`,
        user: user
    };
};

module.exports.usersFoundSuccess = (users) => {
    return {
        success: true,
        message: `users data found`,
        users: users
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

module.exports.passwordUpdatedSuccess = (user) => {
    return {
        success: true,
        message: `password updated for ${user.email}`,
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

module.exports.accountDeletedSuccess = (user) => {
    return {
        success: true,
        message: `user account for ${user.email} deleted`,
        user: user
    };
};