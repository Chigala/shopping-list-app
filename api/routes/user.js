const { Router } = require('express')
const router = Router()
const authController = require('../controller/jwt-auth-controller')
const passport = require('passport')
const User = require('../database/models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config(); 
const sendEmail = require("../services/nodemailer"); 

router.post('/register', authController.register_user)
router.post('/login', authController.login_user)
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.json({
      message: 'you made it to the secure route',
      user: true,
      token: req.query.jwttoken
    })
  }
)
router.get('/logout', (req, res) => {
  if (req.cookies['cookieToken']) {
    res.clearCookie('cookieToken', { domain: 'localhost:3000', path: '/' })
    res.status(200).json({ msg: 'you have been logged out', isLoggedIn: false })
  } else {
    res.status(200).json({ msg: 'you a not logged in' })
  }
})

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body
  if (email) {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(200).json({ msg: 'the user name is not found' })
      return 
    }
    const userId = user.id
    const password = user.password
    const secret = password + process.env.JWT_SECRET
    const payload = {
      id: userId
    }
    const token = jwt.sign(payload, secret, { expiresIn: '15m' })
    const link = `http://localhost:5000/api/forgot-password/${userId}/${token}`
    sendEmail(link);
    console.log('the new function has been called')
    res.status(200).json({ msg: token, userid: userId })
  } else {
    res.status(200).json("Please input an email");
  }
})
router.get('/forgot-password/:id/:token', async (req, res) => {
  const id = req.params.id

  const token = req.params.token

  try {
    const user = await User.findById(id)
    const secret = user.password + process.env.JWT_SECRET
    jwt.verify(token,secret)
    // res.status(200).json('the user has a valid token')
    res.redirect(`http://localhost:3000/change-password/${id}`)
  } catch (err) {
    console.log(err)
    res.status(200).redirect("http://localhost:3000/login")
  }
})
router.post("/change-password", async(req,res)=>{
  const {password, userId} = req.body;
  try{
    const user = await User.findById(userId); 
    if(user){
      user.setPassword(password,function(){
        user.save(); 
        res.status(200).json({msg:"the password has been changed"})
      })

    }else{
      console.log("this user doesn't exist"); 
      res.json("the user is not in the database")
    }
  }
  catch(err){
    res.status(200).json("the user doesn't exist")
  }
  
})
module.exports = router
