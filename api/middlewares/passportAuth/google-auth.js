const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../../database/models/user')
require('dotenv').config()
const Category = require('../../database/models/category')
const randomWords = require('random-words')
const List = require('../../database/models/list')

var params = {
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/api/google/callback`,
  passcallbackURL: true
}

var Strategy = new GoogleStrategy(
  params,
  async (req, accessToken, refreshToken, profile, done) => {
    User.findOne({
      email: profile.emails[0].value
    }).then(currentUser => {
      if (currentUser) {
        if (currentUser.googleid) {
          done(null, currentUser)
          return
        }
        currentUser.googleid = profile.id
        currentUser.save()
        done(null, currentUser)
      } else {
        new User({
          username: profile.displayName,
          googleid: profile.id,
          email: profile.emails[0].value
        })
          .save()
          .then(user => {
            done(null, user)
            Category.create([
              { name: 'food and vegetables', belongsTo: user._id },
              { name: 'household and furniture', belongsTo: user._id },
              { name: 'school stuffs', belongsTo: user._id }
            ])
            const randomListName = randomWords({
              exactly: 1,
              wordsPerString: 2
            })
            List.create({
              name: randomListName[0],
              belongsTo: user._id
            })
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
    User.findOne({ id: id }).then(user => {
      done(null, user)
    })
  } else {
    console.log('wrong id format')
  }
})
