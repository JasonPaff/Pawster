module.exports.loginSuccess = (user, token) => {
    return {
        success: true,
        message: `login successful for ${user.email}`,
        user: user,
        token: token
    };
};