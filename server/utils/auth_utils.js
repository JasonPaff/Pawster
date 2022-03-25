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

module.exports.decodeToken = async function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};