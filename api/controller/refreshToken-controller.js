const User = require('../database/models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies
  console.log('----------------------------------------------------')
  console.log('this is the cookies:', cookies)
  console.log('----------------------------------------------------')
  if (!cookies?.cookieToken) return res.sendStatus(401)
  const refreshToken = cookies.cookieToken
  res.clearCookie('cookieToken', {
    httpOnly: true,
    sameSite: 'None',
    secure: true
  })

  const foundUser = await User.findOne({ refreshToken })

  // Detected refresh token reuse!
  if (!foundUser) {
    console.log('----------------------------------------------------')
    console.log("the user wasn't found:", foundUser)
    console.log('----------------------------------------------------')
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403) //Forbidden

        // Delete refresh tokens of hacked user

        const hackedUser = await User.findOne({ id: decoded.id })
        hackedUser.refreshToken = []
        const result = await hackedUser.save()
      }
    )
    return res.sendStatus(403) //Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    rt => rt !== refreshToken
  )

  const decodedData = jwt.decode(refreshToken)
  console.log('----------------------------------------------------')
  console.log('this is the decoded payload:', decodedData.id)
  console.log('----------------------------------------------------')
  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        // expired refresh token
        console.log('----------------------------------------------------')
        console.log('there was an error:', err)
        console.log('----------------------------------------------------')
        foundUser.refreshToken = [...newRefreshTokenArray]
        const result = await foundUser.save()
      }
      if (err || foundUser._id.toHexString() !== decoded.id)
        return res.sendStatus(403)
      // Refresh token was still valid
      const payload = {
        id: foundUser._id
      }
      const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      )

      const newRefreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: '15m' }
      )
      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
      const result = await foundUser.save()
  console.log('----------------------------------------------------')
      console.log("this is the saved user:", result.refreshToken)
  console.log('----------------------------------------------------')
      // Creates Secure Cookie with refresh token
      res.cookie('cookieToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000
      })

      return res.json({ accessToken: accessToken, user: result })
    }
  )
}

module.exports = { handleRefreshToken }
