const User = require('../database/models/user');
const jwt = require('jsonwebtoken');
require("dotenv").config(); 

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.cookieToken) return res.sendStatus(401);
    const refreshToken = cookies.cookieToken;
    console.log("---------------------------------------------------------------------------------")
    console.log("refreshToken:", refreshToken)
    console.log("---------------------------------------------------------------------------------")
    res.clearCookie('cookieToken', { httpOnly: true, sameSite: 'None', secure: true });

    const foundUser = await User.findOne({ refreshToken });

    // Detected refresh token reuse!
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                console.log("first forbidden ")
                if (err) return res.sendStatus(403); //Forbidden

                // Delete refresh tokens of hacked user

                const hackedUser = await User.findOne({ id: decoded.id });
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
            }
        )
        console.log("the second forbidden")
        return res.sendStatus(403); //Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET,
         async (err, decoded) => {
            // console.log("this is the decoded Id:", decoded.id)
            // console.log("this is the founded userId:", foundUser._id)
            console.log("verifying the refresh token ")
            console.log("this is the refreshTokensEcret:",process.env.JWT_REFRESH_TOKEN_SECRET)
            if (err) {
                // expired refresh token
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result =  await foundUser.save();
            }
            console.log("the third forbidden")
            console.log("this is the foundUser:", foundUser)
            console.log("this is the decoded:", decoded)
            if (err || foundUser._id.toHexString() !== decoded.id) return res.sendStatus(403);
            console.log('after the third forbidden  forbidden')
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
            const result =  await foundUser.save();
            console.log("-----------------------------------")
            console.log("this is the accessToken:", accessToken)
            console.log("-----------------------------------")
            // Creates Secure Cookie with refresh token
            res.cookie('cookieToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            return res.json({ accessToken  })
        }
    );
}

module.exports = { handleRefreshToken }