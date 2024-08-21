const jwt = require('jsonwebtoken');

module.exports.generateToken = (payload) => {
    const secret = process.env.JWT_SECRET;

    // Ensure the payload is an object
    if (typeof payload === 'string') {
        payload = { data: payload };
    }

    return jwt.sign(payload, secret, { expiresIn: '1h' });
};
