const User = require('../database/models/user')
require('dotenv').config()
const sendEmail = require('../services/nodemailer')
const Jwt = require('jsonwebtoken')
const Category = require('../database/models/category')
const randomWords = require('random-words')
const List = require('../database/models/list')
const opn = require('better-opn')

//register the user using passport-local-mongoose plugin
const register_user = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      res.status(200).json({
        msg: 'This user has already been successfully registered',
        color: 'warning'
      })
      return
    }
    User.register(
      new User({ email: req.body.email, username: req.body.username }),
      req.body.password,
      function (err, msg) {
        if (err) {
          res.status(500).json(err)

          return
        } else {
          Category.create([
            { name: 'food and vegetables', belongsTo: msg._id },
            { name: 'household and furniture', belongsTo: msg._id },
            { name: 'school stuffs', belongsTo: msg._id }
          ])
          const randomListName = randomWords({ exactly: 1, wordsPerString: 2 })
          List.create({
            name: randomListName[0],
            belongsTo: msg._id
          })
          res
            .status(200)
            .json({ msg: 'you have successfully registered', color: 'success' })
        }
      }
    )
  } catch (err) {
    console.log(err)
  }
}

//login the user using the passport-local-mongoose plugin
const login_user = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    const cookies = req.cookies
    if (!user) {
      return res.sendStatus(404)
    } else {
      user.authenticate(
        req.body.password,
        async (err, model, PasswordError) => {
          if (err) return console.log(err)
          if (PasswordError) {
            res.sendStatus(401)
          }

          if (model) {
            const payload = {
              id: model._id
            }
            const accessToken = Jwt.sign(
              payload,
              process.env.JWT_ACCESS_TOKEN_SECRET,
              { expiresIn: '30s' }
            )
            const newRefreshToken = Jwt.sign(
              payload,
              process.env.JWT_REFRESH_TOKEN_SECRET,
              { expiresIn: '15m' }
            )

            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            //when copying it in future don't try to overthink things, just copy it like that, the present you was smarter!
            let newRefreshTokenArray = !cookies?.cookieToken
              ? user.refreshToken
              : user.refreshToken.filter(rt => rt !== cookies.cookieToken)

            if (cookies?.cookieToken) {
              const refreshToken = cookies.cookieToken
              const foundToken = await User.findOne({ refreshToken })
              if (!foundToken) {
                newRefreshTokenArray = []
              }

              res.clearCookie('cookieToken', {
                httpOnly: true,
                sameSite: 'None',
                secure: true
              })
            }
            user.refreshToken = [...newRefreshTokenArray, newRefreshToken]
            const result = await user.save()

            res.cookie('cookieToken', newRefreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'None',
              maxAge: 24 * 60 * 60 * 1000
            })

            res.json({ accessToken, user })
          }
        }
      )
    }
  } catch (err) {
    console.log(err)
  }
}

//gets the user profile
const get_profile = (req, res, next) => {
  res.json({
    message: 'you made it to the secure route',
    user: req.user,
    isLoggedIn: true
    // token: req.query.jwttoken
  })
}
//check if the gmail password already exists
const check_password = async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ email: email })
  if (user?.googleid) {
    opn(`${process.env.BACKEND_URL}api/google/login`)
    res.status(200).json({ msg: 'Logging in to google', color: 'success' })
  } else {
    res.status(200).json({ msg: 'No Gmail present', color: 'warning' })
  }
}
//logout the user
const logout = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.cookieToken) return res.sendStatus(204) //No content
  const refreshToken = cookies.cookieToken

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken })
  if (!foundUser) {
    res.clearCookie('cookieToken', {
      httpOnly: true,
      sameSite: 'None',
      secure: true
    })
    return res.sendStatus(204)
  }

  // Delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    rt => rt !== refreshToken
  )
  const result = await foundUser.save()
  console.log(result)
  req.logout()
  res.clearCookie('cookieToken', {
    httpOnly: true,
    sameSite: 'None',
    secure: true
  })
  res.sendStatus(204)

  // if (req.cookies['cookieToken']) {
  //   res.clearCookie('cookieToken', { domain: 'localhost:3000', path: '/' })
  //   res.status(200).json({ msg: 'you have been logged out', isLoggedIn: false })
  // } else {
  //   req.logout
  //   res.status(200).json({ msg: 'you a not logged in' })
  // }
}

//forgot_password controller it sends the user an email with a token
const forgot_password = async (req, res) => {
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
    const token = Jwt.sign(payload, secret, { expiresIn: '15m' })
    const link = `${process.env.BACKEND_URL}/api/forgot-password/${userId}/${token}`
    sendEmail(link, email)
    console.log('the new function has been called')
    res.status(200).json({ msg: token, userid: userId })
  } else {
    res.status(200).json('Please input an email')
  }
}

//validates the token that was attached to the message sent to the email
const email_token_validator = async (req, res) => {
  const id = req.params.id

  const token = req.params.token

  try {
    const user = await User.findById(id)
    const secret = user.password + process.env.JWT_SECRET
    Jwt.verify(token, secret)
    // res.status(200).json('the user has a valid token')
    res.redirect(`${process.env.FRONTEND_URL}/change-password/${id}`)
  } catch (err) {
    console.log(err)
    res.status(200).redirect(`${process.env.FRONTEND_URL}/login`)
  }
}

//change password controller
const change_password = async (req, res) => {
  const { password, userId } = req.body
  try {
    const user = await User.findById(userId)
    if (user) {
      user.setPassword(password, function () {
        user.save()
        res.status(200).json({ msg: 'Password has been changed ' })
      })
    } else {
      console.log("this user doesn't exist")
      res.json('the user is not in the database')
    }
  } catch (err) {
    res.status(200).json("the user doesn't exist")
  }
}

//get google get_profile
const get_google_profile = async (req, res, next) => {
  console.log(`this is the req user: ${req.user}`)
  if (req.user) {
    try {
      const cookies = req.cookies
      const user = req.user
      const foundUser = await User.findById(user._id)
      const payload = {
        id: user._id
      }
      const accessToken = Jwt.sign(
        payload,
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      )
      const newRefreshToken = Jwt.sign(
        payload,
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {
          expiresIn: '15m'
        }
      )
      /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
      //when copying it in future don't try to overthink things, just copy it like that, the present you was smarter!
      let newRefreshTokenArray = !cookies?.cookieToken
        ? user.refreshToken
        : user.refreshToken.filter(rt => rt !== cookies.cookieToken)

      if (cookies?.cookieToken) {
        const refreshToken = cookies.cookieToken
        const foundToken = await User.findOne({ refreshToken })
        if (!foundToken) {
          newRefreshTokenArray = []
        }

        res.clearCookie('cookieToken', {
          httpOnly: true,
          sameSite: 'None',
          secure: true
        })
      }
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
      const result = await foundUser.save()
      // console.log('this is the result: ', result)

      res.cookie('cookieToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000
      })
      res.json({ accessToken,"user": result })
    } catch (err) {
      console.log(err)
    }
  } else {
    res.sendStatus(401)
  }
}

module.exports = {
  register_user,
  login_user,
  forgot_password,
  email_token_validator,
  change_password,
  get_profile,
  logout,
  check_password,
  get_google_profile
}
