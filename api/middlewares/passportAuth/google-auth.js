const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../../database/models/user')
require('dotenv').config()


var params = {
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/api/google/callback',
  passcallbackURL: true
}

var Strategy = new GoogleStrategy(
  params,
  async (req, accessToken, refreshToken, profile, done) => {
        User.findOne({
      email: profile.emails[0].value
    }).then(currentUser => {
      if (currentUser) {
      if(currentUser.googleid){
          done(null, currentUser)
          return
      }
      currentUser.googleid = profile.id; 
      currentUser.save(); 
      done(null, currentUser); 
      }
     else {
        new User({
          username: profile.displayName,
          googleid: profile.id,
          email: profile.emails[0].value,
        })
          .save()
          .then(user => {
            done(null, user)
          })
      }
    })
  }
)
passport.use(Strategy)

passport.serializeUser((user, done) => {
  done(null, user.id)
  console.log(`this is the serialized user: ${user}`)
})
passport.deserializeUser((id, done) => {
  console.log(`this is the id:${id}`)
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
  User.findOne({id:id}).then(user => {
    done(null, user)
  })
}else{
    console.log("wrong id format")
}
})