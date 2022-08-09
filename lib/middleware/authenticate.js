const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];

        if (!cookie) throw new Error('You must be signed in to continue');

        req.user = jwt.verify(cookie, process.env.JWT_SECRET);
        next();
    } catch (error) {
        error.status = 401;
        next(error);
    }
};
