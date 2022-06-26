const jwt = require('jsonwebtoken');
require("dotenv").config()

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log("this is the token: ", authHeader)
    jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.id;
            next();
        }
    );
}

module.exports = verifyJWT