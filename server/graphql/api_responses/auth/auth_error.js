module.exports.jwtError = () => {
    return {
        success: false,
        message: `invalid or missing jwt`,
        user: null
    }
};