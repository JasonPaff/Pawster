const jwt = require('jsonwebtoken');

module.exports.authenticate = async (context) => {
    const token = await context.req.headers['authorization'];

    if (!token) return false;

    try { await jwt.verify(token, process.env.JWT_KEY, null, null); }
    catch (err) { return false }

    return true;
}

module.exports.createToken = async (userId) => {
    return jwt.sign({userId: userId}, process.env.JWT_KEY,{ expiresIn: 36000}, null);
}

module.exports.decodeToken = async (context) => {
    const token = await context.req.headers['authorization'];

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.userId;
    } catch (e) {
        return null;
    }
};