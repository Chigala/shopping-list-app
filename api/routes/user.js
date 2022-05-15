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
    failureRedirect: 'http://localhost:3000/login',
    successRedirect: 'http://localhost:3000/homepage'
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/homepage")
  }
)
router.get('/google/logout', (req, res) => {
  req.logout(); 
  console.log(`this is the logout req.user: ${req.user}`)
  res.json({ msg: 'you have logged out', user: req.user  })
})
router.get('/get-google-profile', (req, res) => {
  console.log(`this is the req user: ${req.user}`)
  if (req.user) {
    res.status(200).json({msg: "you have logged in",isLoggedIn: true,  user: req.user})
  }else{
    res.status(500).json({msg: "you are not authorized to login to this page, ",isLoggedIn: false,  user: req.user});
  }
})
module.exports = router
