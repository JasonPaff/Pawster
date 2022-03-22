const jwt = require('jsonwebtoken');

module.exports.authenticate = async function authenticate(context) {
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

module.exports.createToken = async function createToken(email) {
    return jwt.sign({email: email}, process.env.JWT_KEY,{ expiresIn: 36000}, null);
}