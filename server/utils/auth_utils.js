const jwt = require('jsonwebtoken');

module.exports.authenticate = async (context) => {
    // disabled auth for now, remove to enable
    return true

    // get authorization header
    const token = await context.req.headers['authorization'];

    // no token attached
    if (!token) return false;

    // verify token
    try { await jwt.verify(token, process.env.JWT_KEY, null, null); }
    catch (err) { return false }

    return true;
}

module.exports.createToken = async (userId) => {
    return jwt.sign({userId: userId}, process.env.JWT_KEY,{ expiresIn: 36000}, null);
}

module.exports.decodeToken = async (context) => {
    // get authorization header
    const token = await context.req.headers['authorization'];

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.userId;
    } catch (e) {
        return null;
    }
};