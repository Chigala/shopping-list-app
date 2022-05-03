const passport = require('passport')
const passportJwt = require('passport-jwt')
const User = require('../../database/models/user')
require('dotenv').config(); 
const jwtSecret = process.env.JWT_SECRET
const Strategy = passportJwt.Strategy

const cookieExtractor = (req, res, next) => {
  let jwt = null
  if (req.cookies && req.signedCookies) {
    jwt = req.cookies.cookieToken
  }
 
  return jwt

}
var params = {
secretOrKey: jwtSecret,
jwtFromRequest: cookieExtractor
}
const strategy = new Strategy(params, (payload, done) => { 
  User.findById(payload.id, (err, user) => {
    if (err) {
      return done(new Error('user not found in the DB'), null)
    } else if (payload.expire <= Date.now()) {
      return done(new Error('user has expired'), null)
    } else {
      return done(null, user)
    }
  })
})

passport.use(strategy)
