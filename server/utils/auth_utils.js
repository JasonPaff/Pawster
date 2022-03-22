const jwt = require('jsonwebtoken');

module.exports.authenticate = async function authenticate(context) {
    // get authorization header
    const auth_header = await context.req.headers['authorization'];

    console.log("header: " + auth_header);

    // no token attached
    if (!auth_header) return false;

    // parse token
    const token = auth_header.split('.')[1]

    console.log("token: " + token);

    // verify token
    try {
        const {email} = await jwt.verify(token, process.env.JWT_KEY, null, null);
        console.log("email: " + email);
    }
    catch (err) {
        console.log("error: " + err.message);
        return false
    }

    return true;
}

module.exports.createToken = async function createToken(email) {
    return jwt.sign({email: email}, process.env.JWT_KEY,{ expiresIn: 36000}, null);
}