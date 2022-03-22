module.exports.loginSuccess = (user, email, token) => {
    return {
        success: true,
        message: `login successful for ${email}`,
        user: user,
        token: token
    };
};