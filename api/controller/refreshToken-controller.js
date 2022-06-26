const User = require('../database/models/user');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    console.log("this is the cookie", cookies);
    if (!cookies?.cookieToken) return res.sendStatus(401);
    const refreshToken = cookies.cookieToken;
    res.clearCookie('cookieToken', { httpOnly: true, sameSite: 'None', secure: true });

    const foundUser = await User.findOne({ refreshToken });
    console.log("this is the foundUser", foundUser)

    // Detected refresh token reuse!
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); //Forbidden

                // Delete refresh tokens of hacked user

                const hackedUser = await User.findOne({ id: decoded.id });
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
            }
        )
        return res.sendStatus(403); //Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    console.log("this is the newRefreshTokenArray:", newRefreshTokenArray)

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            console.log("this is the decoded Id:", decoded.id)
            console.log("this is the founded userId:", foundUser._id)
            if (err) {
                // expired refresh token
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result = await foundUser.save();
            }
            if (err || foundUser._id.toHexString() !== decoded.id) return res.sendStatus(403);

            // Refresh token was still valid
            const payload = {
                id: decoded.id,
            }
            const accessToken = jwt.sign(
                payload,
                process.env.JWT_ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );

            const newRefreshToken = jwt.sign(
               payload,
                process.env.JWT_REFRESH_TOKEN_SECRET,
                { expiresIn: '1m' }
            );
            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();

            // Creates Secure Cookie with refresh token
            res.cookie('cookieToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            res.json({ accessToken  })
        }
    );
}

module.exports = { handleRefreshToken }