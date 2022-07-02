const { Router } = require('express')
const router = Router()
const authController = require('../controller/jwt-auth-controller')
const passport = require('passport')
require('dotenv').config()
const verifyJwt = require('../middlewares/verifyJwt')
const { handleRefreshToken } = require('../controller/refreshToken-controller')

router.post('/register', authController.register_user)
router.post('/login', authController.login_user)
router.get('/refresh', handleRefreshToken)
router.get('/profile',  authController.get_profile)
router.get('/logout', authController.logout)
router.post('/forgot-password', authController.forgot_password)
router.get('/forgot-password/:id/:token', authController.email_token_validator)
router.post('/change-password', authController.change_password)
router.post('/check-password', authController.check_password)
router.get(
  '/google/login',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  })
)
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL}/`,
    successRedirect: `${process.env.FRONTEND_URL}/loading`
  }),
)
router.get('/get-google-profile', authController.get_google_profile)
module.exports = router
