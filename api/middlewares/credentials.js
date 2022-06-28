const allowedOrigins = require('../config/white-list');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    console.log("this is the origin:",origin)
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials