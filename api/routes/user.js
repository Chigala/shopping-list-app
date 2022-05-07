const { Router } = require('express')
const router = Router()
const authController = require('../controller/jwt-auth-controller')
const passport = require('passport')
require('dotenv').config()

router.post('/register', authController.register_user)
router.post('/login', authController.login_user)
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  authController.get_profile
)
router.get('/logout', authController.logout)
router.post('/forgot-password', authController.forgot_password)
router.get('/forgot-password/:id/:token', authController.email_token_validator)
router.post('/change-password', authController.change_password)

router.get(
  '/google/login',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  })
)
router.get(
  '/google/callback',
  passport.authenticate('google', {
  successRedirect: "http://localhost:3000/"
  })
)
router.get(
  "/google/logout", (req,res) => {
    req.logOut; 
    res.json({msg: "you have logged out", isLoggedIn: false})
  }
)
router.get(
  "/get-google-profile", (req,res) => {
    res.json({msg: "you have successfully logged in to this account", isLoggedIn:true})
  }
)
module.exports = router
